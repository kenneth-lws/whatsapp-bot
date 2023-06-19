import { getEnvConfig } from '../../config'
import { connect, disconnect } from 'mongoose'

const connectUrl = getEnvConfig().MONGO_URL || 'mongodb://localhost:27017'

export const init = async () => {
    try {
        await connect(connectUrl as string)
        console.log('connect to mongoDB success')
        return
    } catch (err) {
        console.log('fail to connect mongoDB', { url: connectUrl, err })
        throw err
    }
}

export const stop = async () => {
    await disconnect()
    console.log('mongoDB disconnected')
}
