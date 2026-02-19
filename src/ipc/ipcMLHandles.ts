import { ipcMain } from 'electron'
import {
    trainMLModel,
    calculateRiskScore,
    getModelInfo,
    setActiveModel,
    deleteModel,
} from '../backend/services/mlService'
import { ipcMLChannels } from './ipcChannels'
import { MLModelType, MLAlgorithm } from '../backend/types/ml'
import { PatientDto } from './dtos/PatientDto'

ipcMain.handle(
    ipcMLChannels.trainModel,
    async (event, args: [MLModelType, MLAlgorithm]) => {
        const [modelType, algorithm] = args
        return await trainMLModel(modelType, algorithm)
    }
)

ipcMain.handle(
    ipcMLChannels.calculateRiskScore,
    async (event, args: [PatientDto, MLModelType, MLAlgorithm?]) => {
        const [patient, modelType, algorithm] = args
        return await calculateRiskScore(patient, modelType, algorithm)
    }
)

ipcMain.handle(
    ipcMLChannels.getModelInfo,
    async (event, modelType?: string) => {
        return await getModelInfo(modelType)
    }
)

ipcMain.handle(ipcMLChannels.setActiveModel, async (event, id: number) => {
    return await setActiveModel(id)
})

ipcMain.handle(ipcMLChannels.deleteModel, async (event, id: number) => {
    return await deleteModel(id)
})
