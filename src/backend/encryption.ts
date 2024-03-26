import crypto from 'crypto'
import 'dotenv/config'

const algorithm = 'aes-256-cbc'
const encryptionKey = process.env.ENCRYPTION_KEY

export const encrypt = (text: string): { encrypted: string; iv: Buffer } => {
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
