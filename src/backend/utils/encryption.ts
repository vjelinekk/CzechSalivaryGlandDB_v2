import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

const algorithm = 'aes-256-cbc'
let encryptionKey: string

export const setEncryptionKey = (key: string) => {
    encryptionKey = key
}

export const generateEncryptionKey = (): string => {
    return crypto.randomBytes(32).toString('hex')
}

export const encrypt = (text: string): { encrypted: string; iv: Buffer } => {
    if (encryptionKey === '') {
        return { encrypted: text, iv: Buffer.from('') }
    }

    try {
        const iv = crypto.randomBytes(16)
        const cipher = crypto.createCipheriv(
            algorithm,
            Buffer.from(encryptionKey, 'hex'),
            iv
        )
        let encrypted = cipher.update(text)
        encrypted = Buffer.concat([encrypted, cipher.final()])
        return { encrypted: encrypted.toString('hex'), iv }
    } catch (error) {
        console.log(error)
    }
}

export const decrypt = (text: string, iv: Buffer): string => {
    if (encryptionKey === '') {
        return text
    }

    try {
        const encryptedText = Buffer.from(text, 'hex')
        const decipher = crypto.createDecipheriv(
            algorithm,
            Buffer.from(encryptionKey, 'hex'),
            iv
        )
        let decrypted = decipher.update(encryptedText)
        decrypted = Buffer.concat([decrypted, decipher.final()])
        return decrypted.toString()
    } catch (error) {
        console.log(error)
    }
}
