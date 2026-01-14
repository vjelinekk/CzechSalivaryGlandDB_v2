import { FormType } from '../constants'
import { toIntBool, toNum, toStr } from './utils'
import { PatientEntity } from '../db-entities/PatientEntity'
import { MalignantPatientEntity } from '../db-entities/MalignantPatientEntity'
import { BenignPatientEntity } from '../db-entities/BenignPatientEntity'
import { MalignantParotidSpecificEntity } from '../db-entities/MalignantParotidSpecificEntity'
import { MalignantSubmandibularSpecificEntity } from '../db-entities/MalignantSubmandibularSpecificEntity'
import { AttachmentEntity } from '../db-entities/AttachmentEntity'
import { BiopsyResultEntity } from '../db-entities/BiopsyResultEntity'
import { PatientStagingEntity } from '../db-entities/PatientStagingEntity'
import { ParotidMalignantPatientDomainEntity } from '../domain/entities/ParotidMalignantPatientDomainEntity'
import { SubmandibularMalignantPatientDomainEntity } from '../domain/entities/SubmandibularMalignantPatientDomainEntity'
import { SubmandibularBenignPatientDomainEntity } from '../domain/entities/SubmandibularBenignPatientDomainEntity'
import { PatientDomainEntity } from '../domain/entities/PatientDomainEntity'
import { HistologyTypeMapper } from './HistologyTypeMapper'
import { HistologySubtypeMapper } from './HistologySubtypeMapper'
import { HistopathologyEntity } from '../db-entities/HistopathologyEntity'

export class PatientMapper {
    static toPersistence(
        patient: PatientDomainEntity,
        editionId = 1
    ): {
        base: PatientEntity
        malignant?: MalignantPatientEntity
        benign?: BenignPatientEntity
        malignantParotid?: MalignantParotidSpecificEntity
        malignantSubmandibular?: MalignantSubmandibularSpecificEntity
        coreBiopsyResult?: BiopsyResultEntity
        openBiopsyResult?: BiopsyResultEntity
        histopathologyResult?: HistopathologyEntity
        patientStaging?: PatientStagingEntity
        attachments: AttachmentEntity[]
    } {
        const formType = patient.form_type as FormType
        const { tumorType, tumorLocation } =
            this.determineTypeAndLocation(formType)

        const base = this.mapBaseEntity(patient, tumorType, tumorLocation)
        const malignant = this.mapMalignantEntity(patient, tumorType)
        const benign = this.mapBenignEntity(patient, tumorType)
        const malignantParotid = this.mapMalignantParotidEntity(
            patient,
            tumorType,
            tumorLocation
        )
        const malignantSubmandibular = this.mapMalignantSubmandibularEntity(
            patient,
            tumorType,
            tumorLocation
        )
        const coreBiopsyResult = this.mapBiopsyResultEntity(patient, 'core')
        const openBiopsyResult = this.mapBiopsyResultEntity(patient, 'open')
        const histopathologyResult = this.mapHistopathologyEntity(patient)
        const patientStaging = this.mapPatientStagingEntity(
            patient,
            tumorType,
            editionId
        )
        const attachments = this.mapAttachments(patient)

        return {
            base,
            malignant,
            benign,
            malignantParotid,
            malignantSubmandibular,
            coreBiopsyResult,
            openBiopsyResult,
            histopathologyResult,
            patientStaging,
            attachments,
        }
    }

    private static determineTypeAndLocation(formType: FormType): {
        tumorType: 'malignant' | 'benign'
        tumorLocation: 'submandibular' | 'sublingual' | 'parotid'
    } {
        let tumorType: 'malignant' | 'benign' = 'malignant'
        let tumorLocation: 'submandibular' | 'sublingual' | 'parotid' =
            'parotid'

        switch (formType) {
            case FormType.submandibularMalignant:
                tumorType = 'malignant'
                tumorLocation = 'submandibular'
                break
            case FormType.sublingualMalignant:
                tumorType = 'malignant'
                tumorLocation = 'sublingual'
                break
            case FormType.parotidMalignant:
                tumorType = 'malignant'
                tumorLocation = 'parotid'
                break
            case FormType.submandibularBenign:
                tumorType = 'benign'
                tumorLocation = 'submandibular'
                break
            case FormType.parotidBenign:
                tumorType = 'benign'
                tumorLocation = 'parotid'
                break
        }
        return { tumorType, tumorLocation }
    }

    private static mapBaseEntity(
        patient: PatientDomainEntity,
        tumorType: 'malignant' | 'benign',
        tumorLocation: 'submandibular' | 'sublingual' | 'parotid'
    ): PatientEntity {
        return {
            id: patient.id,
            tumor_type: tumorType,
            tumor_location: tumorLocation,
            name: toStr(patient.jmeno),
            surname: toStr(patient.prijmeni),
            internal_patient_id: toStr(patient.id_pacient),
            personal_identification_number: toStr(patient.rodne_cislo),
            age_at_diagnosis: toNum(patient.vek_pri_diagnoze),
            gender: patient.pohlavi as 'male' | 'female',
            region: toStr(patient.kraj),
            other_malignancy_in_personal_history: toStr(
                patient.jine_nadorove_onemocneni_v_oa
            ),
            specification_of_site_of_other_carcinoma: toStr(
                patient.specifikace_mista_vyskytu_jineho_karcinomu
            ),
            other_major_salivary_gland_disease_in_personal_history: toStr(
                patient.jine_onemocneni_velkych_slinnych_zlaz_v_oa
            ),
            disease_specification: toStr(patient.specifikace_onemocneni),
            smokes: toIntBool(patient.koureni),
            cigarettes_per_day: toNum(patient.pocet_cigaret_denne),
            smoking_duration: toNum(patient.jak_dlouho_kouri),
            pack_years: toNum(patient.pocet_balickoroku),
            alcohol_abuse: toIntBool(patient.abusus_alkoholu),
            diagnosis_year: toStr(patient.rok_diagnozy),
            side_of_lesion: toStr(patient.strana_nalezu),
            diagnosis_methods: toStr(patient.diagnosticke_metody),
            fnab: toIntBool(patient.fnab),
            fnab_result: toStr(patient.vysledek_fnab),
            date_of_treatment_initiation: toStr(patient.datum_zahajeni_lecby),
            therapy_type: toStr(patient.typ_terapie),
            extent_of_surgical_treatment: toStr(
                patient.rozsah_chirurgicke_lecby
            ),
            date_of_first_post_treatment_follow_up: toStr(
                patient.datum_prvni_kontroly_po_lecbe
            ),
            persistence: toIntBool(patient.perzistence),
            date_of_persistence: toStr(patient.datum_prokazani_perzistence),
            recidive: toIntBool(patient.recidiva),
            date_of_recidive: toStr(patient.datum_prokazani_recidivy),
            is_alive:
                patient.stav === null ? null : patient.stav === 'Zije' ? 1 : 0,
            death_date: toStr(patient.datum_umrti),
            last_follow_up: toStr(patient.posledni_kontrola),
            next_follow_up: toStr(patient.planovana_kontrola),
            notes: toStr(patient.poznamky),
        }
    }

    private static mapMalignantEntity(
        patient: PatientDomainEntity,
        tumorType: string
    ): MalignantPatientEntity | undefined {
        if (tumorType !== 'malignant') return undefined

        const p = patient as ParotidMalignantPatientDomainEntity
        return {
            id_patient: patient.id,
            block_neck_dissection: toIntBool(p.blokova_krcni_disekce),
            side_of_neck_dissection: toStr(p.strana_blokove_krcni_disekce),
            type_of_nd: toStr(p.typ_nd),
            extent_of_nd: toStr(p.rozsah_nd),
            adjuvant_therapy: toStr(p.adjuvantni_terapie),
            type_of_non_surgical_therapy: toStr(p.typ_nechirurgicke_terapie),
        }
    }

    private static mapBenignEntity(
        patient: PatientDomainEntity,
        tumorType: string
    ): BenignPatientEntity | undefined {
        if (tumorType !== 'benign') return undefined

        const p = patient as SubmandibularBenignPatientDomainEntity
        return {
            id_patient: patient.id,
            preoperative_house_brackmann_grade_of_facial_nerve_function: toStr(
                p.funkce_n_vii_dle_h_b_predoperacne
            ),
            postoperative_house_brackmann_grade_of_facial_nerve_function: toStr(
                p.funkce_n_vii_dle_h_b_pooperacne
            ),
            postoperative_complications: toStr(p.pooperacni_komplikace),
            other_postoperative_complications: toStr(
                p.jine_pooperacni_komplikace
            ),
            further_follow_up_recommended: toStr(p.doporuceno_dalsi_sledovani),
        }
    }

    private static mapMalignantParotidEntity(
        patient: PatientDomainEntity,
        tumorType: string,
        tumorLocation: string
    ): MalignantParotidSpecificEntity | undefined {
        if (tumorType !== 'malignant' || tumorLocation !== 'parotid')
            return undefined

        const p = patient as ParotidMalignantPatientDomainEntity
        return {
            id_malignant_patient: patient.id,
            preoperative_house_brackmann_grade_of_facial_nerve_function: toStr(
                p.funkce_n_vii_dle_h_b_predoperacne
            ),
            postoperative_house_brackmann_grade_of_facial_nerve_function: toStr(
                p.funkce_n_vii_dle_h_b_pooperacne
            ),
            postoperative_complications: toStr(p.pooperacni_komplikace),
            other_postoperative_complications: toStr(
                p.jine_pooperacni_komplikace
            ),
        }
    }

    private static mapMalignantSubmandibularEntity(
        patient: PatientDomainEntity,
        tumorType: string,
        tumorLocation: string
    ): MalignantSubmandibularSpecificEntity | undefined {
        if (tumorType !== 'malignant' || tumorLocation !== 'submandibular')
            return undefined

        const p = patient as SubmandibularMalignantPatientDomainEntity
        return {
            id_malignant_patient: patient.id,
            preoperative_house_brackmann_grade_of_facial_nerve_function: toStr(
                p.funkce_n_vii_dle_h_b_predoperacne
            ),
            postoperative_house_brackmann_grade_of_facial_nerve_function: toStr(
                p.funkce_n_vii_dle_h_b_pooperacne
            ),
        }
    }

    private static mapAttachments(
        patient: PatientDomainEntity
    ): AttachmentEntity[] {
        void patient // Placeholder to avoid unused parameter error
        const attachments: AttachmentEntity[] = []

        return attachments
    }

    private static getHistologyTypeAndSubtype(
        patient: PatientDomainEntity,
        histologyKey: string
    ): {
        histologyTypeId: number | undefined
        histologySubtypeId: number | undefined
    } {
        const histologyTypeId = HistologyTypeMapper.mapKeyToId(histologyKey)
        if (!histologyTypeId) {
            return { histologyTypeId: undefined, histologySubtypeId: undefined }
        }

        const histologySubtypeField =
            HistologySubtypeMapper.mapHistologyTypeToSubtypeKey(histologyTypeId)
        const histologySubtypeValue = patient[histologySubtypeField] as string
        const histologySubtypeId =
            HistologySubtypeMapper.mapSubtypeKeyToHistologyType(
                histologyTypeId,
                histologySubtypeValue
            )

        return { histologyTypeId, histologySubtypeId }
    }

    private static mapBiopsyResultEntity(
        patient: PatientDomainEntity,
        type: 'core' | 'open'
    ): BiopsyResultEntity | undefined {
        const biopsyResultField =
            type === 'core' ? 'core_vysledek' : 'otevrena_vysledek'
        const biopsyResult = patient[biopsyResultField] as string | undefined
        if (!biopsyResult) {
            return undefined
        }

        const { histologyTypeId, histologySubtypeId } =
            this.getHistologyTypeAndSubtype(patient, biopsyResult)
        if (!histologyTypeId) {
            return undefined
        }

        return {
            id_patient: patient.id,
            id_histology_type: histologyTypeId,
            id_histology_subtype: histologySubtypeId,
            biopsy_type: type,
        }
    }

    private static mapHistopathologyEntity(
        patient: PatientDomainEntity
    ): HistopathologyEntity {
        const histopathologyResult = patient.histopatologie_vysledek
        if (!histopathologyResult) {
            return undefined
        }

        const { histologyTypeId, histologySubtypeId } =
            this.getHistologyTypeAndSubtype(patient, histopathologyResult)
        if (!histologyTypeId) {
            return undefined
        }

        return {
            id_patient: patient.id,
            id_histology_type: histologyTypeId,
            id_histology_subtype: histologySubtypeId,
            ene_result: patient.extranodalni_sireni_vysledek_histopatologie as
                | 'ENEma (>2 mm)'
                | 'ENEmi (≤2 mm)',
            extranodal_extension: toIntBool(
                patient.extranodalni_sireni_histopatologie
            ),
            lymphovascular_invasion: toIntBool(
                patient.lymfovaskularni_invaze_histopatologie
            ),
            note: '',
            number_of_metastatic_lymph_nodes: toNum(
                patient.pocet_lymfatickych_uzlin_s_metastazou_histopatologie
            ),
            perineural_invasion: toIntBool(
                patient.perineuralni_invaze_histopatologie
            ),
            proven_distant_metastasis: toIntBool(
                patient.prokazane_vzdalene_metastazy_histopatologie
            ),
            resection_margin: patient.okraj_resekce_histopatologie as
                | 'R0'
                | 'R1',
            site_of_distant_metastasis: toStr(
                patient.misto_vyskytu_vzdalene_metastazy_histopatologie
            ),
            tumor_size: toNum(patient.velikost_nadoru_histopatologie),
            tumor_size_not_determined_reason: toStr(
                patient.velikost_nadoru_neurcena_histopatologie
            ),
        }
    }

    private static mapPatientStagingEntity(
        patient: PatientDomainEntity,
        tumorType: string,
        editionId: number
    ): PatientStagingEntity | undefined {
        // TNM staging is only applicable for malignant tumors
        if (tumorType !== 'malignant') return undefined

        const p = patient as ParotidMalignantPatientDomainEntity

        // Get clinical staging IDs directly from patient data
        const clinicalTId = toNum(p.t_klasifikace_klinicka_id)
        const clinicalNId = toNum(p.n_klasifikace_klinicka_id)
        const clinicalMId = toNum(p.m_klasifikace_klinicka_id)
        const clinicalGradeId = toNum(p.tnm_klasifikace_klinicka_id)

        // Get pathological staging IDs directly from patient data
        const pathologicalTId = toNum(p.t_klasifikace_patologicka_id)
        const pathologicalNId = toNum(p.n_klasifikace_patologicka_id)
        const pathologicalMId = toNum(p.m_klasifikace_patologicka_id)
        const pathologicalGradeId = toNum(p.tnm_klasifikace_patologicka_id)

        // Check if any staging data exists
        const hasClinicalStaging = clinicalTId || clinicalNId || clinicalMId
        const hasPathologicalStaging =
            pathologicalTId || pathologicalNId || pathologicalMId

        if (!hasClinicalStaging && !hasPathologicalStaging) {
            return undefined
        }

        return {
            id_patient: patient.id,
            id_edition: editionId,
            clinical_t_id: clinicalTId,
            clinical_n_id: clinicalNId,
            clinical_m_id: clinicalMId,
            clinical_grade_id: clinicalGradeId,
            pathological_t_id: pathologicalTId,
            pathological_n_id: pathologicalNId,
            pathological_m_id: pathologicalMId,
            pathological_grade_id: pathologicalGradeId,
        }
    }
}
