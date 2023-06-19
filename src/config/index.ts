import * as fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'
import { Config } from '../types/config'

const filePath = path.dirname(require?.main?.filename || '')
const lastIndexOfSrc = filePath.lastIndexOf('src')
let appDir = filePath
if (lastIndexOfSrc > -1) {
    appDir = filePath.slice(0, lastIndexOfSrc)
}

const getEnvVariableFromFile = (envPath: string): Config => {
    let config = {}
    if (envPath.length > 0 && fs.existsSync(envPath)) {
        try {
            const fileBuffer = fs.readFileSync(envPath)
            config = dotenv.parse(fileBuffer)
        } catch (e) {
            // ignore
        }
    }
    return config
}

const getEnvVariableFromFileWithMemo = (() => {
    const cache: Record<string, Config> = {}
    return (envPath: string): Config => {
        if (!cache[envPath]) {
            cache[envPath] = getEnvVariableFromFile(envPath)
        }
        return cache[envPath]
    }
})()

export const getEnvConfig = (envPath = path.join(appDir, './.env')): Config => {
    const config = getEnvVariableFromFileWithMemo(envPath)
    return Object.freeze({
        ...config,
        ...process.env,
    })
}
