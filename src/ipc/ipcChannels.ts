export enum ipcAPISaveChannels {
    savePatient = 'savePatient',
    saveStudy = 'saveStudy',
}

export enum ipcAPIInsertChannels {
    insertPatientToStudy = 'insertPatientToStudy',
}

export enum ipcAPIDeleteChannels {
    deletePatient = 'deletePatient',
}

export enum ipcAPIGetChannels {
    getAllPatients = 'getAllPatients',
    getPatientsByType = 'getPatientsByType',
    getPatientsInStudy = 'getPatientsInStudy',
    getStudies = 'getStudies',
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
