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
    searchPatientsByNameSurnameRC = 'searchPatientsByNameSurnameRC',
}

export enum ipcExportChannels {
    export = 'export',
    exportAnonymized = 'exportAnonymized',
}

export enum ipcFSChannels {
    save = 'save',
    getFileIcon = 'getFileIcon',
    open = 'open',
}
