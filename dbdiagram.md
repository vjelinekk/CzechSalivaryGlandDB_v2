Enum tumor_type {
    malignant
    benign
}

Enum tumor_location {
    submandibular
    sublingual
    parotid
}

Table study {
    id int [pk, not null]
    study_name text [not null]
    study_type int [not null]
}

Table is_in_study {
    id_study int [ref: > study.id]
    id_patient int [ref: > patient.id]

    indexes {
    (id_study, id_patient) [pk] // Composite PK
    }
}

Table password {
    id int [pk, not null]
    password text
    encryption_enabled boolean
}

Enum gender {
    male
    female
}

Table patient {
    id int [pk, not null]
    tumor_type tumor_type
    name string
    surname string
    internal_patient_id string
    personal_identification_number string
    age_at_diagnosis int
    gender gender
    region string
    other_malignancy_in_personal_history string
    specification_of_site_of_other_carcinoma string
    other_major_salivary_gland_disease_in_personal_history string
    disease_specification string
    smokes bool
    cigarettes_per_day int
    smoking_duration float
    pack_years float
    alcohol_abuse bool
    tumor_location tumor_location
    diagnosis_year date
    side_of_lesion string
    diagnosis_methods string
    fnab bool
    fnab_result string
    date_of_treatment_initiation date
    therapy_type string
    extent_of_surgical_treatment string
    date_of_first_post_treatment_follow_up date
    persistence bool
    date_of_persistence date
    recidive bool
    date_of_recidive date
    is_alive bool
    death_date date
    last_follow_up date
    next_follow_up date
    notes string
}

Table histology_type {
    id int [pk, not null]
    tumor_type tumor_type
    translation_key string [unique]
}

Table histology_subtype {
    id int [pk, not null]
    id_histology_type int [not null, ref: > histology_type.id]
    translation_key string [unique]
}

Enum biopsy_type {
    core
    open
}

Table biopsy_result {
    id int [pk, not null]
    id_patient int [not null, ref: > patient.id]
    id_histology_type int [not null, ref: > histology_type.id]
    id_histology_subtype int [null, ref: > histology_subtype.id]
    biopsy_type biopsy_type
    note string [null]

    indexes {
        (id_patient, biopsy_type) [unique]
    }
}

Enum resection_margin {
    R0
    R1
}

Enum ene_result {
    ENEma
    ENEmi
}

Table histopathology {
    id_patient int [pk, not null, ref: - patient.id]
    id_histology_type int [not null, ref: > histology_type.id]
    id_histology_subtype int [null, ref: > histology_subtype.id]
    tumor_size int
    tumor_size_not_determined_reason string
    resection_margin resection_margin
    lymphovascular_invasion bool
    perineural_invasion bool
    number_of_metastatic_lymph_nodes int
    extranodal_extension bool
    ene_result ene_result
    proven_distant_metastasis bool
    site_of_distant_metastasis string
    note string [null]
}

Table malignant_patient {
    id_patient int [pk, not null, ref: - patient.id]
    block_neck_dissection bool
    side_of_neck_dissection string
    type_of_nd string
    extent_of_nd string
    adjuvant_therapy string
    type_of_non_surgical_therapy string
}

Table malignant_parotid_specific {
    id_malignant_patient int [pk, not null, ref: - malignant_patient.id_patient]
    preoperative_house_brackmann_grade_of_facial_nerve_function string
    postoperative_house_brackmann_grade_of_facial_nerve_function string
    postoperative_complications string
    other_postoperative_complications string
}

Table malignant_submandibular_specific {
    id_malignant_patient int [pk, not null, ref: - malignant_patient.id_patient]
    preoperative_house_brackmann_grade_of_facial_nerve_function string
    postoperative_house_brackmann_grade_of_facial_nerve_function string
}

Table benign_patient {
    id_patient int [pk, not null, ref: - patient.id]
    preoperative_house_brackmann_grade_of_facial_nerve_function string
    postoperative_house_brackmann_grade_of_facial_nerve_function string
    postoperative_complications string
    other_postoperative_complications string
    further_follow_up_recommended string
}

// 1. The Rulebook (Handles the "Change in Classification")
Table tnm_edition {
    id int [pk]
    name string // "AJCC 8th Edition"
    active_from date // 2017-01-01
    is_active boolean // Is this the current default?
}

// 2. The Possible Values (Handles "New T Values")
Enum tnm_category_type {
    T // Tumor
    N // Node
    M // Metastasis
    G // Stage Group (Stage I, II, etc.)
}

Table tnm_value_definition {
    id int [pk]
    edition_id int [not null, ref: > tnm_edition.id] // Link to specific version

    category tnm_category_type // Is this a T, N, or M value?

    code string // "T1", "T2a", "N0"
    description string // "Tumor <= 2cm", "Metastasis ipsilateral single"

    // Optional: Order for sorting in dropdowns (T1 comes before T2)
    sort_order int
}

// 3. The Patient's Specific Staging
Table patient_staging {
    id int [pk]
    id_patient int [not null, ref: > patient.id]

    // We record which edition was used for this patient
    id_edition int [not null, ref: > tnm_edition.id]

    // Clinical Staging (cTNM)
    clinical_t_id int [ref: > tnm_value_definition.id]
    clinical_n_id int [ref: > tnm_value_definition.id]
    clinical_m_id int [ref: > tnm_value_definition.id]
    clinical_grade string

    // Pathological Staging (pTNM)
    patalogical_t_id int [ref: > tnm_value_definition.id]
    patalogical_n_id int [ref: > tnm_value_definition.id]
    patalogical_m_id int [ref: > tnm_value_definition.id]
    patalogical_grade string
}

Table attachment {
    id int [pk]
    id_patient int [not null, ref: > patient.id]
    file_path string
}