export enum FormType {
    submandibularMalignant = 1,
    sublingualMalignant = 2,
    parotidMalignant = 3,
    submandibularBenign = 4,
    parotidBenign = 5,
}

export enum TableNames {
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
