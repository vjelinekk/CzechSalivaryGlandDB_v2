import { getRow, insertRow } from './basicOperations'
import { TableNames } from './constants'
import crypto from 'crypto'
import { PasswordType } from './types'

/**
 * Password will always be just one on the first row with id 1
 */
const passwordId = 1

/**
 * Function that hashes the password
 * @param password password to hash
 * @returns hashed password
 */
const hashPassword = (password: string) => {
    const hashedPassword = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex')
    return hashedPassword
}

export const insertPasswordRow = async (
    password: string,
    usingEncryption: boolean
) => {
    const hashedPassword = hashPassword(password)
    await insertRow(TableNames.password, {
        password: hashedPassword,
        using_encryption: usingEncryption ? 1 : 0,
    })
}

/**
 * Function that inserts the password into the database
 * @param password password to insert
 */
export const insertPassword = async (password: string) => {
    // Check if the password is already set
    const isSet = await isPasswordSet()
    if (isSet) {
        // Password is already set
        return
    }

    // Hash the password
    const hashedPassword = hashPassword(password)

    // Insert the hashed password into the database
    await insertRow(TableNames.password, { password: hashedPassword })
}

/**
 * Function that inserts if the encryption is enabled into the database
 * @param enabled boolean that determines if the encryption is enabled
 */
export const insertUsingEncryption = async (enabled: boolean) => {
    const enabledNumber = enabled ? 1 : 0

    await insertRow(TableNames.password, { using_encryption: enabledNumber })
}

/**
 * Function that validates the password
 * @param passwordToValidate password to validate
 * @returns true if the passwords match, false otherwise
 */
export const validatePassword = async (passwordToValidate: string) => {
    // Hash the password to validate
    const hashedPasswordToValidate = hashPassword(passwordToValidate)

    // Get the hashed password from the database
    const { password } = await getRow(TableNames.password, passwordId)

    // Compare the hashed passwords
    if (hashedPasswordToValidate === password) {
        // Passwords match
        return true
    } else {
        // Passwords don't match
        return false
    }
}

/**
 * Function that checks if the password is set
 * @returns true if the password is set, false otherwise
 */
export const isPasswordSet = async () => {
    // Get the password from the database
    const row: PasswordType = await getRow(TableNames.password, passwordId)

    if (row === undefined || row.password === undefined) {
        return null
    }

    // Check if the password is set
    if (row.password) {
        return true
    } else {
        return false
    }
}

/**
 * Function that checks if encryption is enabled
 * @returns true if encryption is enabled, false otherwise and null if encryption is not set
 */
export const isEncryptionEnabled = async () => {
    // Get the password from the database
    const row: PasswordType = await getRow(TableNames.password, passwordId)

    if (row === undefined || row.using_encryption === undefined) {
        return null
    }

    // Check if encryption is enabled
    if (row.using_encryption) {
        return true
    } else {
        return false
    }
}
