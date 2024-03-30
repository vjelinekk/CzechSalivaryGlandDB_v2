import { ipcMain } from 'electron'
import { generateEncryptionKey, setEncryptionKey } from '../backend/encryption'
import {
    insertPassword,
    insertPasswordRow,
    insertUsingEncryption,
    isEncryptionEnabled,
    isPasswordSet,
    validatePassword,
} from '../backend/passwordManager'
import { ipcEncryptionChannels } from './ipcChannels'

ipcMain.handle(ipcEncryptionChannels.setEncryptionKey, async (event, key) => {
    setEncryptionKey(key)
})

ipcMain.handle(ipcEncryptionChannels.isPasswordSet, async () => {
    return isPasswordSet()
})

ipcMain.handle(
    ipcEncryptionChannels.insertPassword,
    async (event, password) => {
        // Insert the password into the database
        await insertPassword(password)
    }
)

ipcMain.handle(
    ipcEncryptionChannels.validatePassword,
    async (event, password) => {
        // Validate the password
        return validatePassword(password)
    }
)

ipcMain.handle(ipcEncryptionChannels.generateEncryptionKey, async () => {
    // Generate a new encryption key
    return generateEncryptionKey()
})

ipcMain.handle(ipcEncryptionChannels.isEncryptionEnabled, async () => {
    // Check if encryption is enabled
    return isEncryptionEnabled()
})

ipcMain.handle(
    ipcEncryptionChannels.insertUsingEncryption,
    async (event, enabled) => {
        // Insert the using encryption value into the database
        await insertUsingEncryption(enabled)
    }
)

ipcMain.handle(ipcEncryptionChannels.insertPasswordRow, async (event, args) => {
    const [password, usingEncryption] = args
    // Insert the password row into the database
    await insertPasswordRow(password, usingEncryption)
})
