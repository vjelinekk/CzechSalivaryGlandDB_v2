import * as path from 'path';
import * as fs from 'fs';
import { getAllPatients } from '../repositories/patientRepository';
import { PatientDto } from '../../ipc/dtos/PatientDto';
import { 
    executePythonML, 
    getModelsDirectory, 
} from '../utils/mlManager';
import { 
    MLTrainInputData,
    MLPredictInputData,
    MLInfoInputData,
    MLTrainResult,
    MLSurvivalPredictionResult,
    MLRecurrencePredictionResult,
    MLModelInfoResult,
    MLModelType,
    MLAlgorithm,
    MLPatient
} from '../types/ml';
import { MLTrainingResultDto } from '../../ipc/dtos/MLTrainingResultDto';
import { MLPredictionResultDto } from '../../ipc/dtos/MLPredictionResultDto';
import { MLModelInfoDto } from '../../ipc/dtos/MLModelInfoDto';
import { FormType } from '../constants';
import { HistologyTypeMapper } from '../mappers/HistologyTypeMapper';
import { toNum } from '../mappers/utils';

const malignantFormTypes = [
    FormType.submandibularMalignant,
    FormType.sublingualMalignant,
    FormType.parotidMalignant
];

/**
 * CRITICAL: Maps and sanitizes patient data for the ML engine.
 * Only includes fields required for feature extraction and time calculations.
 */
const sanitizePatientForML = (patient: PatientDto): MLPatient => {
    return {
        age_at_diagnosis: toNum(patient.vek_pri_diagnoze) ?? undefined,
        therapy_type: patient.typ_terapie,
        id_histology_type: HistologyTypeMapper.mapKeyToId(patient.histopatologie_vysledek as string),
        clinical_m_id: toNum(patient.m_klasifikace_klinicka_id),
        pathological_m_id: toNum(patient.m_klasifikace_patologicka_id),
        clinical_n_id: toNum(patient.n_klasifikace_klinicka_id),
        pathological_n_id: toNum(patient.n_klasifikace_patologicka_id),
        is_alive: patient.stav === 'Žije',
        diagnosis_year: patient.rok_diagnozy ? patient.rok_diagnozy.substring(0, 4) : undefined,
        death_date: patient.datum_umrti,
        last_follow_up: patient.posledni_kontrola,
        recidive: patient.recidiva === 'Ano',
        date_of_first_post_treatment_follow_up: patient.datum_prvni_kontroly_po_lecbe,
        date_of_recidive: patient.datum_prokazani_recidivy,
    };
};

/**
 * Trains a new ML model using malignant patients.
 */
export const trainMLModel = async (
    modelType: MLModelType,
    algorithm: MLAlgorithm
): Promise<MLTrainingResultDto> => {
    // 1. Fetch all patients
    const allPatients = await getAllPatients();

    // 2. FILTER: Keep only malignant patients
    const malignantPatients = allPatients.filter(p => 
        p.form_type !== undefined && malignantFormTypes.includes(p.form_type as FormType)
    );

    if (malignantPatients.length < 50) { // minimum for training in Python engine
        throw new Error(`Insufficient data for training. At least 50 malignant patients are required, but found only ${malignantPatients.length}.`);
    }

    // 3. Sanitize data
    const sanitizedPatients = malignantPatients.map(sanitizePatientForML);

    // 4. Prepare model path with timestamp and algorithm
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const modelName = `${modelType}_${algorithm}_${timestamp}.joblib`;
    const modelPath = path.join(getModelsDirectory(), modelName);

    // 5. Execute Python ML engine
    const input: MLTrainInputData = {
        mode: 'train',
        model_type: modelType,
        algorithm: algorithm,
        model_path: modelPath,
        data: {
            patients: sanitizedPatients
        }
    };

    const output = await executePythonML(input);
    return output.result as MLTrainResult;
};

/**
 * Calculates risk score for a single patient using the latest available model.
 */
export const calculateRiskScore = async (
    patient: PatientDto,
    modelType: MLModelType,
    algorithm?: MLAlgorithm
): Promise<MLPredictionResultDto> => {
    // Verify patient is malignant
    if (patient.form_type === undefined || !malignantFormTypes.includes(patient.form_type as FormType)) {
        throw new Error('Risk scoring is only available for malignant patients.');
    }

    // 1. Find the latest model
    const modelsDir = getModelsDirectory();
    if (!fs.existsSync(modelsDir)) {
        throw new Error('Models directory not found. Please train a model first.');
    }
    
    const files = fs.readdirSync(modelsDir);
    
    // Filter by type and optionally algorithm
    let modelFiles = files.filter(f => f.startsWith(modelType) && f.endsWith('.joblib'));
    if (algorithm) {
        modelFiles = modelFiles.filter(f => f.includes(`_${algorithm}_`));
    }
    
    if (modelFiles.length === 0) {
        throw new Error(`No trained model found for ${modelType}${algorithm ? ` with algorithm ${algorithm}` : ''}.`);
    }
    
    // Sort by name (timestamp is included and ISO-8601-ish, so alphanumeric sort works)
    modelFiles.sort().reverse();
    const latestModel = modelFiles[0];
    const modelPath = path.join(modelsDir, latestModel);

    // 2. Sanitize patient data
    const sanitizedPatient = sanitizePatientForML(patient);

    // 3. Execute prediction
    const input: MLPredictInputData = {
        mode: 'predict',
        model_path: modelPath,
        data: {
            patient: sanitizedPatient
        }
    };

    const output = await executePythonML(input);
    return output.result as MLSurvivalPredictionResult | MLRecurrencePredictionResult;
};

/**
 * Retrieves information about all trained models.
 */
export const getModelInfo = async (
    modelType?: string
): Promise<MLModelInfoDto[]> => {
    const modelsDir = getModelsDirectory();
    if (!fs.existsSync(modelsDir)) return [];
    
    const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.joblib'));

    // Process models in parallel to speed up
    const infoPromises = files.map(async (file) => {
        const modelPath = path.join(modelsDir, file);
        
        // Infer model type from filename
        let type: MLModelType;
        if (file.startsWith('overall_survival')) type = 'overall_survival';
        else if (file.startsWith('recurrence')) type = 'recurrence';
        else return null; // Skip unknown files
        
        if (modelType && type !== modelType) return null;

        try {
            const input: MLInfoInputData = {
                mode: 'info',
                model_path: modelPath
            };
            const output = await executePythonML(input);
            const infoResult = output.result as MLModelInfoResult;
            return {
                model_metadata: infoResult.model_metadata,
                model_path: modelPath,
                model_type: type
            } as MLModelInfoDto;
        } catch (e) {
            console.error(`Failed to get info for model ${file}:`, e);
            return null;
        }
    });

    const resolvedResults = await Promise.all(infoPromises);
    return resolvedResults.filter((r): r is MLModelInfoDto => r !== null);
};
