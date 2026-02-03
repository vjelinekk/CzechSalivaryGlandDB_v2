# ML Risk Scoring Implementation Plan

## Overview
Implement Python-based machine learning risk scoring for CSGDB using a sidecar pattern. The system will train survival analysis models and calculate risk scores for individual patients.

## Architecture

### Data Flow
```
Frontend (ML UI)
  ↓ window.ml.calculateRiskScore(patient, modelType)
Preload (contextBridge)
  ↓ ipcRenderer.invoke
IPC Handler (ipcMLHandles.ts)
  ↓
ML Service (mlService.ts)
  ↓ 1. Load patients from DB (getAllPatients)
  ↓ 2. Sanitize PII (remove jmeno, prijmeni, rodne_cislo)
ML Manager (mlManager.ts)
  ↓ 3. Spawn Python process
  ↓ 4. Send JSON via stdin
Python Binary (ml_engine.py)
  ↓ 5. Load model from .joblib
  ↓ 6. Extract features
  ↓ 7. Calculate survival curve: predict_survival_function(X)
  ↓ 8. Risk Score = 1.0 - SurvivalProbability(1825 days)
  ↓ 9. Return JSON via stdout
ML Manager (mlManager.ts)
  ↓ 10. Parse JSON response
ML Service (mlService.ts)
  ↓ 11. Return MLPredictionResult
IPC Handler → Preload → Frontend
  ↓ 12. Display risk card with score 0-1

Model Files (userData/.csgdb/models/*.joblib)
```

## Phase 1: Python ML Engine - Detailed Architecture

### File Structure
```
python_ml_engine/
├── types/                 # Type definitions (TypedDict, Protocol, etc.)
│   ├── __init__.py       # Export all types
│   ├── input_types.py    # MLInput, TrainInput, PredictInput, InfoInput
│   ├── output_types.py   # MLOutput, TrainResult, PredictResult
│   └── model_types.py    # ModelMetadata, FeatureImportance
├── ml_engine.py           # Main entry point, CLI interface, stdin/stdout handling
├── feature_extractor.py   # Feature extraction and preprocessing
├── survival_model.py      # Model training and prediction logic
├── requirements.txt       # Python dependencies
└── build.sh              # PyInstaller build script
```

**IMPORTANT: Type Safety**
- **Use type hints everywhere**: All functions, methods, and variables should have type annotations
- **Use TypedDict** for JSON structures (input/output via stdin/stdout)
- **Use Protocol** for duck typing where needed
- **No `Any` types** unless absolutely necessary (use `dict[str, ...]` instead)
- **Strict mode**: Code should pass `mypy --strict` type checking

---

### File: `python_ml_engine/ml_engine.py` (~150 lines)

**Responsibility**: CLI entry point, input/output handling, orchestration

**Structure:**
```python
#!/usr/bin/env python3
"""
ML Engine for CSGDB - Survival Analysis Risk Scoring
Reads JSON from stdin, performs ML operations, writes JSON to stdout
"""

import sys
import json
from datetime import datetime
from feature_extractor import FeatureExtractor
from survival_model import SurvivalModel

def main():
    """Main entry point - reads stdin, routes to appropriate handler"""
    try:
        # 1. Read JSON from stdin
        input_data = json.load(sys.stdin)

        # 2. Validate input structure
        mode = input_data.get('mode')
        model_type = input_data.get('model_type')
        algorithm = input_data.get('algorithm')
        model_path = input_data.get('model_path')

        # 3. Route to appropriate handler
        if mode == 'train':
            result = handle_train(input_data)
        elif mode == 'predict':
            result = handle_predict(input_data)
        elif mode == 'info':
            result = handle_info(input_data)
        else:
            raise ValueError(f"Invalid mode: {mode}")

        # 4. Write success response to stdout
        output = {
            "success": True,
            "mode": mode,
            "result": result,
            "error": None
        }
        json.dump(output, sys.stdout)
        sys.exit(0)

    except Exception as e:
        # 5. Write error response to stdout
        output = {
            "success": False,
            "error": str(e)
        }
        json.dump(output, sys.stdout)
        sys.exit(1)

def handle_train(input_data):
    """Train a survival model and save to disk"""
    patients = input_data['data']['patients']
    algorithm = input_data['algorithm']
    model_path = input_data['model_path']

    # Extract features
    extractor = FeatureExtractor()
    X, y_event, y_time, feature_names = extractor.fit_transform(patients)

    # Train model
    model = SurvivalModel(algorithm=algorithm)
    model.fit(X, y_event, y_time)

    # Get performance metrics
    c_index = model.get_c_index(X, y_event, y_time)

    # Save model with metadata
    metadata = {
        'c_index': c_index,
        'n_samples': len(patients),
        'n_events': int(sum(y_event)),
        'training_date': datetime.now().isoformat(),
        'algorithm': algorithm,
        'feature_names': feature_names
    }
    model.save(model_path, metadata, extractor)

    return metadata

def handle_predict(input_data):
    """Predict risk score for a single patient"""
    patient = input_data['data']['patient']
    model_path = input_data['model_path']

    # Load model and extractor
    model, extractor, metadata = SurvivalModel.load(model_path)

    # Extract features for single patient
    X = extractor.transform([patient])

    # Calculate risk score and survival probabilities
    result = model.predict_risk(X)

    # Get top risk factors
    importance = model.get_feature_importance()
    top_factors = [
        {"feature": feature_names[i], "importance": float(imp)}
        for i, imp in enumerate(importance)
    ][:3]  # Top 3

    result['top_risk_factors'] = top_factors
    return result

def handle_info(input_data):
    """Get model metadata without prediction"""
    model_path = input_data['model_path']
    _, _, metadata = SurvivalModel.load(model_path)
    return {'model_metadata': metadata}

if __name__ == '__main__':
    main()
```

**Key Responsibilities:**
- ✓ Parse JSON from stdin
- ✓ Validate input structure
- ✓ Route to train/predict/info handlers
- ✓ Error handling (try/catch all operations)
- ✓ Write JSON to stdout
- ✓ Exit with appropriate code (0=success, 1=error)

---

### File: `python_ml_engine/feature_extractor.py` (~250 lines)

**Responsibility**: Convert patient JSON to ML-ready feature matrix

**Structure:**
```python
"""
Feature extraction and preprocessing for CSGDB patient data
"""

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
import joblib

class FeatureExtractor:
    """Extracts and preprocesses clinical features from patient records"""

    def __init__(self):
        self.feature_names = []
        self.numeric_features = []
        self.categorical_features = []
        self.imputer_numeric = None
        self.imputer_categorical = None
        self.encoder = None
        self.scaler = None

    def fit_transform(self, patients):
        """
        Fit extractors on training data and transform to feature matrix

        Returns:
            X: numpy array (n_patients, n_features)
            y_event: numpy array (n_patients,) - 1=event occurred, 0=censored
            y_time: numpy array (n_patients,) - time in days
            feature_names: list of feature names
        """
        # 1. Convert to DataFrame
        df = pd.DataFrame(patients)

        # 2. Define feature columns
        self._define_features()

        # 3. Extract numeric features
        X_numeric = self._extract_numeric(df, fit=True)

        # 4. Extract categorical features (one-hot encoded)
        X_categorical = self._extract_categorical(df, fit=True)

        # 5. Combine features
        X = np.hstack([X_numeric, X_categorical])

        # 6. Extract target variables (event, time)
        y_event, y_time = self._extract_targets(df)

        return X, y_event, y_time, self.feature_names

    def transform(self, patients):
        """Transform new data using fitted extractors"""
        df = pd.DataFrame(patients)
        X_numeric = self._extract_numeric(df, fit=False)
        X_categorical = self._extract_categorical(df, fit=False)
        X = np.hstack([X_numeric, X_categorical])
        return X

    def _define_features(self):
        """Define which columns are numeric vs categorical"""
        self.numeric_features = [
            'vek_pri_diagnoze',  # age_at_diagnosis
            'velikost_nadoru_histopatologie',  # tumor_size
            'pack_years',
            'cigarettes_per_day',
            'pocet_metastatickych_lymfatickych_uzlin',  # number_of_metastatic_lymph_nodes
        ]

        self.categorical_features = [
            'pohlavi',  # gender
            'region',
            'lokalizace_nadoru',  # tumor_location
            'histology_type_id',
            'histology_subtype_id',
            'therapy_type',
            'rozsah_chirurgicke_lecby',  # extent_of_surgical_treatment
            'adjuvantni_terapie',  # adjuvant_therapy
            'resection_margin',  # R0/R1
            'clinical_t_id',
            'clinical_n_id',
            'clinical_m_id',
            'pathological_t_id',
            'pathological_n_id',
            'pathological_m_id',
        ]

        # Binary features (treated as numeric 0/1)
        self.binary_features = [
            'other_malignancy_in_personal_history',
            'smokes',
            'alcohol_abuse',
            'lymphovascular_invasion',
            'perineural_invasion',
            'extranodal_extension',
        ]

    def _extract_numeric(self, df, fit=False):
        """Extract and preprocess numeric features"""
        # Get numeric columns
        numeric_cols = self.numeric_features + self.binary_features
        X_numeric = df[numeric_cols].values

        # Handle missing values via median imputation
        if fit:
            self.imputer_numeric = SimpleImputer(strategy='median')
            X_numeric = self.imputer_numeric.fit_transform(X_numeric)

            # Standardize (z-score normalization)
            self.scaler = StandardScaler()
            X_numeric = self.scaler.fit_transform(X_numeric)
        else:
            X_numeric = self.imputer_numeric.transform(X_numeric)
            X_numeric = self.scaler.transform(X_numeric)

        return X_numeric

    def _extract_categorical(self, df, fit=False):
        """Extract and one-hot encode categorical features"""
        X_categorical = df[self.categorical_features].values

        # Handle missing values via most frequent
        if fit:
            self.imputer_categorical = SimpleImputer(strategy='most_frequent')
            X_categorical = self.imputer_categorical.fit_transform(X_categorical)

            # One-hot encode
            self.encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
            X_categorical = self.encoder.fit_transform(X_categorical)

            # Build feature names
            self._build_feature_names()
        else:
            X_categorical = self.imputer_categorical.transform(X_categorical)
            X_categorical = self.encoder.transform(X_categorical)

        return X_categorical

    def _extract_targets(self, df):
        """
        Extract survival target variables

        For overall_survival:
            event: 1 if dead, 0 if alive
            time: days from diagnosis to death or last_follow_up

        For recurrence:
            event: 1 if recurred, 0 if no recurrence
            time: days from first_post_treatment_follow_up to recurrence or last_follow_up
        """
        # This logic depends on model_type
        # For now, assume overall_survival
        y_event = (~df['is_alive'].astype(bool)).astype(int).values

        # Calculate time in days
        # Simplified - actual implementation needs date parsing
        y_time = np.random.randint(30, 3650, size=len(df))  # Placeholder

        return y_event, y_time

    def _build_feature_names(self):
        """Build human-readable feature names"""
        numeric_names = self.numeric_features + self.binary_features
        categorical_names = self.encoder.get_feature_names_out(self.categorical_features)
        self.feature_names = list(numeric_names) + list(categorical_names)
```

**Key Responsibilities:**
- ✓ Define which features are numeric vs categorical
- ✓ Handle missing values (median for numeric, mode for categorical)
- ✓ Standardize numeric features (z-score)
- ✓ One-hot encode categorical features
- ✓ Extract target variables (event, time)
- ✓ Build feature names for interpretability
- ✓ Fit/transform pattern (scikit-learn compatible)

---

### File: `python_ml_engine/survival_model.py` (~200 lines)

**Responsibility**: Model training, prediction, and persistence

**Structure:**
```python
"""
Survival analysis models using scikit-survival
"""

import numpy as np
import joblib
from sksurv.ensemble import RandomSurvivalForest
from sksurv.linear_model import CoxPHSurvivalAnalysis
from sksurv.metrics import concordance_index_censored

class SurvivalModel:
    """Wrapper for survival analysis models"""

    def __init__(self, algorithm='rsf'):
        """
        Initialize model

        Args:
            algorithm: 'rsf' (Random Survival Forest) or 'coxph' (Cox Proportional Hazards)
        """
        self.algorithm = algorithm

        if algorithm == 'rsf':
            self.model = RandomSurvivalForest(
                n_estimators=100,
                min_samples_split=10,
                min_samples_leaf=5,
                max_depth=5,
                random_state=42,
                n_jobs=-1
            )
        elif algorithm == 'coxph':
            self.model = CoxPHSurvivalAnalysis(
                alpha=0.1,  # L2 regularization
                ties='efron',
                n_iter=100
            )
        else:
            raise ValueError(f"Unknown algorithm: {algorithm}")

    def fit(self, X, y_event, y_time):
        """
        Train the survival model

        Args:
            X: Feature matrix (n_patients, n_features)
            y_event: Event indicator (1=event, 0=censored)
            y_time: Time to event or censoring
        """
        # Create structured array for scikit-survival
        y = np.array(
            [(bool(event), time) for event, time in zip(y_event, y_time)],
            dtype=[('event', bool), ('time', float)]
        )

        # Fit model
        self.model.fit(X, y)

    def predict_risk(self, X):
        """
        Predict risk score for patient(s)

        Returns:
            dict with risk_score and survival probabilities
        """
        # Get survival function
        survival_funcs = self.model.predict_survival_function(X)

        # Times: 1 year (365d), 3 years (1095d), 5 years (1825d)
        surv_prob_1y = survival_funcs[0](365)
        surv_prob_3y = survival_funcs[0](1095)
        surv_prob_5y = survival_funcs[0](1825)

        # Risk score = 1 - 5-year survival probability
        risk_score = 1.0 - surv_prob_5y

        return {
            'risk_score': float(risk_score),
            'survival_probability_1year': float(surv_prob_1y),
            'survival_probability_3year': float(surv_prob_3y),
            'survival_probability_5year': float(surv_prob_5y)
        }

    def get_c_index(self, X, y_event, y_time):
        """Calculate concordance index (model performance)"""
        y = np.array(
            [(bool(event), time) for event, time in zip(y_event, y_time)],
            dtype=[('event', bool), ('time', float)]
        )

        # Get risk scores
        if self.algorithm == 'rsf':
            risk_scores = self.model.predict(X)
        else:  # coxph
            risk_scores = self.model.predict(X)

        # Calculate C-index
        c_index = concordance_index_censored(
            y['event'], y['time'], risk_scores
        )[0]

        return float(c_index)

    def get_feature_importance(self):
        """Get feature importance scores"""
        if self.algorithm == 'rsf':
            # Random forest has feature_importances_
            return self.model.feature_importances_
        elif self.algorithm == 'coxph':
            # Cox PH uses absolute coefficient values
            return np.abs(self.model.coef_)
        else:
            return np.array([])

    def save(self, model_path, metadata, extractor):
        """
        Save model, metadata, and feature extractor

        Saves as a dictionary with:
            - model: trained model object
            - metadata: training info (c_index, n_samples, etc.)
            - extractor: fitted FeatureExtractor
        """
        save_dict = {
            'model': self.model,
            'algorithm': self.algorithm,
            'metadata': metadata,
            'extractor': extractor
        }
        joblib.dump(save_dict, model_path)

    @staticmethod
    def load(model_path):
        """
        Load model from disk

        Returns:
            (SurvivalModel, FeatureExtractor, metadata)
        """
        save_dict = joblib.load(model_path)

        # Reconstruct SurvivalModel
        survival_model = SurvivalModel(algorithm=save_dict['algorithm'])
        survival_model.model = save_dict['model']

        return survival_model, save_dict['extractor'], save_dict['metadata']
```

**Key Responsibilities:**
- ✓ Support both RSF and CoxPH algorithms
- ✓ Fit models on training data
- ✓ Predict survival functions
- ✓ Calculate risk score: 1.0 - SurvivalProbability(1825)
- ✓ Calculate C-index for performance
- ✓ Get feature importance (tree-based for RSF, coefficients for CoxPH)
- ✓ Save/load models with metadata and extractor

---

**Core Components:**

1. **FeatureExtractor Class**
    - Extracts clinical features from patient JSON (NO PII)
    - Handles missing values via median/mode imputation
    - One-hot encoding for categorical features
    - Features include:
        - Demographics: age_at_diagnosis, gender, region
        - Medical history: smoking (pack_years, cigarettes_per_day), alcohol_abuse, other_malignancy
        - Tumor: tumor_size, tumor_location, histology_type_id, histology_subtype_id
        - Pathology: lymphovascular_invasion, perineural_invasion, extranodal_extension, number_of_metastatic_lymph_nodes, resection_margin
        - Treatment: therapy_type, extent_of_surgical_treatment, adjuvant_therapy
        - TNM: clinical/pathological T/N/M/Grade IDs

2. **SurvivalModel Class**
    - Supports TWO model types:
        - **Random Survival Forest** (`RandomSurvivalForest` from scikit-survival)
            - Non-parametric, ensemble method
            - Handles non-linear relationships automatically
            - Feature importance via tree-based importance
        - **Cox Proportional Hazards** (`CoxPHSurvivalAnalysis` from scikit-survival)
            - Semi-parametric, assumes proportional hazards
            - Interpretable coefficients (hazard ratios)
            - Feature importance via absolute coefficient values
    - Constructor accepts `algorithm` parameter: `'rsf'` or `'coxph'`
    - `train(X, y_event, y_time, algorithm)` - trains and saves to .joblib
    - **Risk Score Calculation (SAME for BOTH algorithms)**:
        - Both RSF and CoxPH support `model.predict_survival_function(X)`
        - Use `model.predict_survival_function(X)` to get survival curve
        - Calculate survival probability at T = 1825 days (5 years)
        - **Final Score: Risk = 1.0 - SurvivalProbability(1825)**
        - Returns value between 0-1 (0 = low risk, 1 = high risk)
    - `predict_survival_function(X, times)` - survival probabilities at 1/3/5 years
    - `get_feature_importance()` - top risk factors (RSF: feature importance, CoxPH: coefficient magnitudes)
    - `get_c_index()` - model performance metric (concordance index for model accuracy)

3. **Command-line Interface**
    - `--train`: Read patients JSON from stdin, train model, save to specified path
    - `--predict`: Read patient JSON from stdin, load model, return risk score
    - `--info`: Return model metadata (C-index, training date, sample size)

**Input Format (JSON on stdin):**
```json
{
  "mode": "train" | "predict" | "info",
  "model_type": "overall_survival" | "recurrence",
  "algorithm": "rsf" | "coxph",
  "model_path": "/path/to/model.joblib",
  "data": {
    "patients": [...],  // for train
    "patient": {...}    // for predict
  }
}
```

**Output Format (JSON on stdout):**
```json
{
  "success": true,
  "mode": "train",
  "result": {
    // FOR TRAIN MODE:
    "c_index": 0.78,           // Concordance index (model accuracy metric)
    "n_samples": 234,          // Total patients in training set
    "n_events": 89,            // Total events (deaths/recurrences)
    "training_date": "2026-02-01T10:30:00",

    // FOR PREDICT MODE:
    "risk_score": 0.65,        // CALCULATED AS: 1.0 - SurvivalProbability(1825 days)
    "survival_probability_1year": 0.85,   // P(T > 365 days)
    "survival_probability_3year": 0.67,   // P(T > 1095 days)
    "survival_probability_5year": 0.52,   // P(T > 1825 days)
    "top_risk_factors": [
      {"feature": "pathological_n_id", "importance": 0.24}
    ]
  },
  "error": null
}
```

**Risk Score Calculation Details:**
```python
# In Python engine (ml_engine.py)
def calculate_risk_score(model, patient_features):
    """
    Works for BOTH Random Survival Forest AND Cox Proportional Hazards
    Both models support predict_survival_function() in scikit-survival
    """
    # Get survival function for patient
    # RSF: Uses ensemble of survival trees
    # CoxPH: Uses proportional hazards assumption
    survival_funcs = model.predict_survival_function(patient_features)

    # Times: 1 year (365d), 3 years (1095d), 5 years (1825d)
    times = [365, 1095, 1825]

    # Get survival probabilities at each time point
    # survival_funcs[0] is a StepFunction for the first (and only) patient
    surv_prob_1y = survival_funcs[0](365)
    surv_prob_3y = survival_funcs[0](1095)
    surv_prob_5y = survival_funcs[0](1825)

    # Risk score = 1 - 5-year survival probability
    # SAME FORMULA for both RSF and CoxPH
    risk_score = 1.0 - surv_prob_5y

    return {
        "risk_score": risk_score,           # 0-1 scale
        "survival_probability_1year": surv_prob_1y,
        "survival_probability_3year": surv_prob_3y,
        "survival_probability_5year": surv_prob_5y
    }
```

**Dependencies:**
- scikit-survival==0.22.2
- scikit-learn==1.3.2
- numpy==1.24.3
- pandas==2.1.4
- joblib==1.3.2

## Phase 2: Backend Services

### File: `src/backend/utils/mlManager.ts` (NEW)

Low-level Python process management:

```typescript
// Resolve Python binary path (handles dev vs production)
export const getPythonBinaryPath = (): string => {
    let base = app.getAppPath()
    if (app.isPackaged) {
        base = base.replace(`${path.sep}app.asar`, '')
        return platform-specific path to ml_engine/ml_engine[.exe]
    } else {
        return path to python_ml_engine/ml_engine.py
    }
}

// Get models directory (userData/.csgdb/models/)
export const getModelsDirectory = (): string => {
    return path.join(app.getPath('userData'), '.csgdb', 'models')
}

// Spawn Python and communicate via stdin/stdout
export const executePythonML = async (
    inputData: MLInputData
): Promise<MLOutputData> => {
    // Spawn process
    // Send JSON to stdin
    // Collect stdout/stderr
    // Parse JSON output
    // Handle errors
}
```

### File: `src/backend/services/mlService.ts` (NEW)

High-level ML business logic:

```typescript
// CRITICAL: Remove PII before sending to Python
const sanitizePatientForML = (patient: PatientDto) => {
    const sanitized = { ...patient }
    delete sanitized.jmeno
    delete sanitized.prijmeni
    delete sanitized.rodne_cislo
    delete sanitized.id_pacient
    delete sanitized.attachments
    delete sanitized.poznamky
    return sanitized
}

// Train model on all/filtered patients
export const trainMLModel = async (
    modelType: 'overall_survival' | 'recurrence',
    algorithm: 'rsf' | 'coxph',
    filterCriteria?: Record<string, unknown>
): Promise<MLTrainingResult> => {
    // 1. Fetch patients via getAllPatients()
    // 2. FILTER: Keep only malignant patients (tumor_type === 'malignant')
    // 3. Apply additional filters if specified
    // 4. Sanitize patient data (remove PII)
    // 5. Prepare input with model path (includes algorithm in filename)
    // 6. Execute Python via mlManager
    // 7. Return results with C-index
}

// Calculate risk score for single patient
export const calculateRiskScore = async (
    patient: PatientDto,
    modelType: 'overall_survival' | 'recurrence',
    algorithm?: 'rsf' | 'coxph'  // Optional: defaults to latest model
): Promise<MLPredictionResult> => {
    // 1. Find latest model for this type (and algorithm if specified)
    // 2. Validate: Only score malignant patients (return error if benign)
    // 3. Sanitize patient data (remove PII)
    // 4. Execute Python via mlManager.executePythonML()
    // 5. Python calculates: Risk = 1.0 - SurvivalProbability(1825 days)
    // 6. Return risk score (0-1) + survival probabilities (1/3/5 year)
}

// Get metadata for all trained models
export const getModelInfo = async (
    modelType?: string
): Promise<MLModelInfo[]> => {
    // Read models directory
    // Query each model for metadata via Python
}
```

## Phase 3: IPC Layer

### File: `src/ipc/ipcChannels.ts` (MODIFY)

Add new enum:
```typescript
export enum ipcMLChannels {
    trainModel = 'trainModel',
    calculateRiskScore = 'calculateRiskScore',
    getModelInfo = 'getModelInfo',
}
```

### File: `src/ipc/ipcMLHandles.ts` (NEW)

```typescript
import { ipcMain } from 'electron'
import { trainMLModel, calculateRiskScore, getModelInfo } from '../backend/services/mlService'
import { ipcMLChannels } from './ipcChannels'

ipcMain.handle(ipcMLChannels.trainModel, async (event, args) => {
    const [modelType, algorithm, filterCriteria] = args
    return await trainMLModel(modelType, algorithm, filterCriteria)
})

ipcMain.handle(ipcMLChannels.calculateRiskScore, async (event, args) => {
    const [patient, modelType, algorithm] = args
    return await calculateRiskScore(patient, modelType, algorithm)
})

ipcMain.handle(ipcMLChannels.getModelInfo, async (event, modelType) => {
    return await getModelInfo(modelType)
})
```

### File: `src/ipc/ipcHandles.ts` (MODIFY)

Add import:
```typescript
import './ipcMLHandles'
```

### File: `src/preload.ts` (MODIFY)

Expose ML API:
```typescript
contextBridge.exposeInMainWorld('ml', {
    trainModel: (modelType, algorithm, filterCriteria?) =>
        ipcRenderer.invoke(ipcMLChannels.trainModel, [modelType, algorithm, filterCriteria]),
    calculateRiskScore: (patient, modelType, algorithm?) =>
        ipcRenderer.invoke(ipcMLChannels.calculateRiskScore, [patient, modelType, algorithm]),
    getModelInfo: (modelType?) =>
        ipcRenderer.invoke(ipcMLChannels.getModelInfo, modelType),
})
```

### DTOs (NEW)

Create in `src/ipc/dtos/`:
- `MLTrainingResultDto.ts` - training results with C-index
- `MLPredictionResultDto.ts` - risk score + survival probabilities
- `MLModelInfoDto.ts` - model metadata

## Phase 4: Frontend Components

### Statistics Tab Structure
Following existing pattern in `src/frontend/components/statistics/`:
- Create subdirectory: `ml-risk-scoring/`
- Main component: `ml-risk-scoring.tsx`
- Sub-components:
    - `model-training-tab.tsx` - UI for training models with algorithm selector (RSF/CoxPH radio buttons)
    - `model-info-tab.tsx` - Display model metadata with algorithm type

**Model Training UI:**
- Model type selector: "Overall Survival" or "Recurrence"
- Algorithm selector: "Random Survival Forest" or "Cox Proportional Hazards"
- Train button
- Display results: C-index, sample size, events, training date

### Patient Detail Integration
- Create: `src/frontend/components/patient-risk-card.tsx`
- **Only shown for malignant patients** (hide for benign)
- Display risk score with color coding (green/yellow/red)
- Show 1/3/5-year survival probabilities
- List top 3 risk factors with importance bars
- Auto-calculate on patient view (if model exists)
- Use latest available model (RSF or CoxPH, whichever is newer)

## Phase 5: Packaging & Distribution

### PyInstaller Build

**File: `python_ml_engine/build.sh`**
```bash
pip install -r requirements.txt pyinstaller
pyinstaller --onefile --name ml_engine ml_engine.py
```

Creates standalone executable in `dist/ml_engine[.exe]`

### Forge Configuration

**File: `forge.config.ts` (MODIFY)**
```typescript
packagerConfig: {
    asar: true,
    extraResource: [
        'db.sqlite',
        'ml_engine'  // Directory with platform-specific binaries
    ],
}
```

**Directory structure:**
```
ml_engine/
├── ml_engine          (macOS/Linux)
├── ml_engine.exe      (Windows)
```

### Development Mode
- Use `python3 python_ml_engine/ml_engine.py` directly
- No binary needed during development
- Binary only required for packaged builds

## Security Considerations

### PII Protection (CRITICAL)
- **NEVER** send to Python:
    - `jmeno` (name)
    - `prijmeni` (surname)
    - `rodne_cislo` (personal ID number)
    - `id_pacient` (internal ID)
- Sanitization happens in `mlService.ts` before Python execution
- All clinical features are safe (not PII)

### Model Storage
- Location: `app.getPath('userData')/.csgdb/models/`
- Models contain NO patient data (only learned parameters)
- Survives app updates
- User-specific (multi-user systems)

## Testing Strategy

### Python Unit Tests
- `test_feature_extraction.py` - test feature extraction, missing value handling
- `test_model_training.py` - test training with mock data
- `test_model_prediction.py` - test prediction with saved models

### TypeScript Integration Tests
- Test PII sanitization in `mlService.test.ts`
- Test Python process spawn in `mlManager.test.ts`
- Mock `executePythonML` to avoid Python dependency in tests

### End-to-End Testing
1. Train model with ≥50 patients
2. Verify model file created in userData
3. Calculate risk score for test patient
4. Verify risk score between 0-1
5. Verify survival probabilities
6. Test error handling (missing model, invalid data)

## Implementation Checklist (With Claude's Help: ~5-7 Days)

**Day 1-2: Python Engine (~500 lines)**
- [x] Implement `ml_engine.py` with stdin/stdout interface
- [x] Implement `FeatureExtractor` class with feature mapping
- [x] Implement `SurvivalModel` class (both RSF and CoxPH)
- [x] Add model persistence with metadata
- [x] Test with mock data via stdin/stdout
- [x] Create `requirements.txt`
- **Estimated**: 4-6 hours with Claude generating boilerplate

**Day 3: Backend Services**
- [ ] Create `mlManager.ts` - Python process management (~150 lines)
- [ ] Create `mlService.ts` - ML business logic (~200 lines)
- [ ] Implement PII sanitization (critical!)
- [ ] Test Python spawning in development mode
- **Estimated**: 3-4 hours (follows existing patterns)

**Day 4: IPC Layer (~100 lines total)**
- [ ] Add `ipcMLChannels` enum (3 channels)
- [ ] Create `ipcMLHandles.ts` (3 handlers)
- [ ] Expose `window.ml` in preload
- [ ] Create 3 DTO files
- [ ] Update `src/ipc/ipcHandles.ts`
- [ ] Update `src/ipc/index.d.ts`
- **Estimated**: 2-3 hours (very straightforward)

**Day 5: Frontend Components**
- [ ] Create `ml-risk-scoring/` directory structure
- [ ] Implement `model-training-tab.tsx` (~200 lines)
- [ ] Implement `model-info-tab.tsx` (~100 lines)
- [ ] Implement `patient-risk-card.tsx` (~150 lines)
- [ ] Add to statistics navigation
- [ ] Add Czech translations
- **Estimated**: 4-5 hours (template from existing components)

**Day 6: Integration & Initial Testing**
- [ ] Create PyInstaller `build.sh` script
- [ ] Build Python binary for your platform
- [ ] Update `forge.config.ts` with extraResource
- [ ] End-to-end test: Train model with real data
- [ ] End-to-end test: Calculate risk score
- [ ] Fix integration bugs
- **Estimated**: 3-4 hours

**Day 7: Final Testing & Documentation**
- [ ] Security audit (verify PII sanitization with logging)
- [ ] Test both RSF and CoxPH algorithms
- [ ] Test with malignant patients only
- [ ] Test error handling (missing model, insufficient data)
- [ ] Update CLAUDE.md documentation
- [ ] Package app and verify binary inclusion
- **Estimated**: 2-3 hours

**Total Estimated Time: 20-30 hours of focused work over 5-7 days**

## Verification & Testing

### End-to-End Verification Steps

**1. Python Engine Verification**
```bash
cd python_ml_engine
python3 ml_engine.py < test_input.json
# Expected: JSON output with success: true
```

**2. Model Training Verification**
- Open CSGDB application
- Navigate to Statistics → ML Risk Scoring
- Select "Overall Survival" + "Random Survival Forest"
- Click "Train Model"
- Verify:
    - Training completes without errors
    - C-index displayed (should be 0.5-0.9 range)
    - Model file created in `~/Library/Application Support/csgdb/.csgdb/models/overall_survival_rsf_[timestamp].joblib` (macOS)
    - Sample size shows only malignant patients
    - Events count > 0

**3. Risk Score Calculation Verification**
- Open a malignant patient detail view
- Verify risk card appears automatically
- Check:
    - Risk score between 0-1 (displayed as 0-100%)
    - **Verify calculation**: Risk = 1.0 - 5-year survival probability
    - Example: If 5-year survival = 0.65, risk should be 0.35 (35%)
    - Color coding matches risk level (low=green, moderate=yellow, high=red)
    - 1/3/5-year survival probabilities are between 0-1
    - Survival probabilities decrease over time (1yr ≥ 3yr ≥ 5yr)
    - Top 3 risk factors displayed with bars
    - No PII visible in any logs

**4. Benign Patient Verification**
- Open a benign patient detail view
- Verify risk card does NOT appear
- Verify no errors in console

**5. Model Comparison Verification**
- Train both RSF and CoxPH models for same outcome
- Compare C-index values
- Verify both models can predict on same patient
- Verify model info tab shows both models with correct algorithm labels

**6. Error Handling Verification**
- Try to train with insufficient data (< 50 patients or < 30 events)
    - Expected: Error message displayed to user
- Try to calculate risk score before training model
    - Expected: "No model available" error
- Test with patient having missing values
    - Expected: Prediction succeeds (Python handles missing values)

**7. Security Verification**
- Enable Node.js console logging for Python stdin
- Train a model and verify logged JSON does NOT contain:
    - `jmeno` (name)
    - `prijmeni` (surname)
    - `rodne_cislo` (personal ID)
    - `id_pacient` (patient ID)
- ✓ All clinical features should be present

**8. Packaging Verification**
- Run `npm run package`
- Verify `ml_engine/` folder included in packaged app resources
- Test model training in packaged app (not development mode)
- Verify models persist after app restart

## Critical Files to Create/Modify

**NEW Files:**
1. `python_ml_engine/ml_engine.py` - Core ML engine (~500 lines)
2. `src/backend/utils/mlManager.ts` - Python process management
3. `src/backend/services/mlService.ts` - ML business logic
4. `src/ipc/ipcMLHandles.ts` - IPC handlers
5. `src/ipc/dtos/ML*.ts` - 3 DTO files
6. `src/frontend/components/statistics/ml-risk-scoring/*.tsx` - UI components
7. `src/frontend/components/patient-risk-card.tsx` - Patient detail widget
8. `python_ml_engine/build.sh` - PyInstaller script
9. `python_ml_engine/requirements.txt` - Python dependencies

**MODIFY Files:**
1. `src/ipc/ipcChannels.ts` - Add `ipcMLChannels` enum
2. `src/ipc/ipcHandles.ts` - Import ML handlers
3. `src/preload.ts` - Expose `window.ml` namespace
4. `forge.config.ts` - Add `ml_engine` to `extraResource`
5. `src/ipc/index.d.ts` - Add `ml` to Window interface

## Key Design Decisions (User Clarified)

### ✓ Model Scope
**Decision**: One unified model with gland type as feature
- Single model trains on all malignant patients (parotid, submandibular, sublingual combined)
- `tumor_location` included as categorical feature (one-hot encoded)
- Maximizes training data, simpler model management
- Model files: `overall_survival_[algorithm].joblib`, `recurrence_[algorithm].joblib`

### ✓ Patient Selection
**Decision**: Exclude benign patients (malignant-only models)
- Training filters: `WHERE tumor_type = 'malignant'`
- Benign patients excluded from both survival and recurrence models
- Cleaner predictions specific to malignant tumor outcomes
- Filter applied in `mlService.ts` before training

### ✓ ML Algorithms
**Decision**: Support both Random Survival Forest AND Cox Proportional Hazards
- Users choose algorithm during training
- Random Survival Forest: Non-parametric, handles non-linear relationships, feature importance
- Cox Proportional Hazards: Traditional medical research method, interpretable hazard ratios
- Model naming: `overall_survival_rsf_2026-02-01.joblib` or `overall_survival_coxph_2026-02-01.joblib`
- Python engine needs conditional logic for algorithm selection

### ✓ UI Placement
**Decision**: Patient detail view + ML Risk Scoring statistics tab
- ✓ New ML Risk Scoring statistics tab (training UI, model info)
- ✓ Patient detail view (risk card widget)
- ✗ Patient list table column (avoided for performance)
- ✗ Study analysis view (not needed initially)

### ✓ Risk Score Calculation
**Decision**: Risk = 1.0 - SurvivalProbability(1825 days)
- Use `model.predict_survival_function(X)` to get survival curve
- Calculate probability at T = 1825 days (5 years)
- Risk score always between 0-1 (0 = low risk, 1 = high risk)
- Also return 1/3/5-year survival probabilities for UI display
- C-index returned during training to display model accuracy
