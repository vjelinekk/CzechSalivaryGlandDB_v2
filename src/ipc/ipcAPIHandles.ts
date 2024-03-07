import { ipcMain } from 'electron'
import { insertFormPriusni } from '../backend/priusniManager'
import { ipcAPIInsertChannels } from './ipcChannels'

ipcMain.handle(ipcAPIInsertChannels.insertPriusni, async (event, args) => {
    const [data] = args
    insertFormPriusni(data)
})
