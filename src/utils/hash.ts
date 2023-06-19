import crypto from 'crypto'

const DefaultIterations = 10


export const hash = (password: string, salt: string): string => {
    return crypto.pbkdf2Sync(password, salt, DefaultIterations, 16, 'sha256').toString('hex')
}
