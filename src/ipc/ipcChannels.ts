export enum ipcAPISaveChannels {
    savePatient = 'savePatient',
    saveStudy = 'saveStudy',
}

export enum ipcAPIInsertChannels {
    insertPatientToStudy = 'insertPatientToStudy',
}

export enum ipcAPIUpdateChannels {
    updatePatientsStudies = 'updatePatientsStudies',
}

export enum ipcAPIDeleteChannels {
    deletePatient = 'deletePatient',
    deleteStudy = 'deleteStudy',
    deletePatientFromStudy = 'deletePatientFromStudy',
}

export enum ipcAPIGetChannels {
    getAllPatients = 'getAllPatients',
    getPatientsByType = 'getPatientsByType',
    getPatientsInStudy = 'getPatientsInStudy',
    getStudies = 'getStudies',
    getStudiesByFormType = 'getStudiesByFormType',
    getStudiesByPatientId = 'getStudiesByPatientId',
    getFilteredPatients = 'getFilteredPatients',
    getKaplanMeierData = 'getKaplanMeierData',
    searchPatientsByNameSurnameRC = 'searchPatientsByNameSurnameRC',
    getPlannedPatientsBetweenDates = 'getPlannedPatientsBetweenDates',
    getChiSquareData = 'getChiSquareData',
    getTTestData = 'getTTestData',
}

export enum ipcExportChannels {
    export = 'export',
    exportAnonymized = 'exportAnonymized',
}

export enum ipcImportChannels {
    import = 'import',
}

export enum ipcFSChannels {
    save = 'save',
    getFileIcon = 'getFileIcon',
    open = 'open',
    getFileName = 'getFileName',
    loadJson = 'loadJson',
    getPublicProductionReadyPath = 'getPublicProductionReadyPath',
}

export enum ipcEncryptionChannels {
    setEncryptionKey = 'setEncryptionKey',
    isPasswordSet = 'isPasswordSet',
    isEncryptionEnabled = 'isEncryptionEnabled',
    insertPasswordRow = 'insertPasswordRow',
    insertPassword = 'insertPassword',
    insertUsingEncryption = 'insertUsingEncryption',
    validatePassword = 'validatePassword',
    generateEncryptionKey = 'generateEncryptionKey',
}

export enum ipcBackUpChannels {
    backUp = 'backUp',
    loadBackUp = 'loadBackUp',
}
