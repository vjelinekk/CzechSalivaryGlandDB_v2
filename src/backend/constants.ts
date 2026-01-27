export enum TableNames {
    submandibularMalignant = 'form_podcelistni',
    sublingualMalignant = 'form_podjazykove',
    parotidMalignant = 'form_priusni',
    submandibularBenign = 'form_submandibular_benign',
    parotidBenign = 'form_parotid_benign',
    study = 'study',
    isInStudy = 'is_in_study',
    password = 'password',
}

export enum FormType {
    submandibularMalignant = 1,
    sublingualMalignant = 2,
    parotidMalignant = 3,
    submandibularBenign = 4,
    parotidBenign = 5,
}

// New ERA model table names
export enum NewTableNames {
    patient = 'patient',
    malignantPatient = 'malignant_patient',
    benignPatient = 'benign_patient',
    malignantParotidSpecific = 'malignant_parotid_specific',
    malignantSubmandibularSpecific = 'malignant_submandibular_specific',
    biopsyResult = 'biopsy_result',
    histopathology = 'histopathology',
    patientStaging = 'patient_staging',
    attachment = 'attachment',
    isInStudy = 'is_in_study',
    study = 'study',
    tnmEdition = 'tnm_edition',
    tnmValueDefinition = 'tnm_value_definition',
    histologyType = 'histology_type',
    histologySubtype = 'histology_subtype',
}
