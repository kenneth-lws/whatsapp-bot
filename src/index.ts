import 'source-map-support/register'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { init as mongoInit, stop as mongoStop } from './services/mongodb'
import { Server } from 'http'
import { getEnvConfig } from './config'

// automate async error handling, must before all express functions' execution
import 'express-async-errors'
import rootRouter from './routes'

const DEFAULT_PORT = 3501
const port = Number(getEnvConfig().PORT) || DEFAULT_PORT
const isDebugMode = getEnvConfig().DEBUG_MODE === 'true'
const app = express()
let server: Server

/* ------------------------ Setup express middleware ------------------------ */
app.use(express.json())
app.use(
    express.urlencoded({
        extended: false,
    }),
)

if (isDebugMode) {
    app.use(
        morgan('dev', {
            skip: (req) => req.url.includes('/health-check'),
        }),
    )
}

app.use('/api', rootRouter)

app.use(cookieParser())
/* -------------------------------------------------------------------------- */

const applicationBootstrap = async () => {
    await Promise.all([mongoInit()])
}

const start = async () => {
    try {
        await applicationBootstrap()
        server = app.listen(port, () => {
            console.log('server started', { port })
        })
    } catch (error) {
        console.error('Fail to init server', error)
        throw error
    }
}

const stop = async () => {
    console.log('Received kill signal, shutting down gracefully')
    try {
        await Promise.race([
            new Promise<void>((resolve, reject) => {
                server.close((err) => (err ? reject(err) : resolve()))
            }).then(() => {
                return Promise.all([mongoStop()])
            }),
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    reject(new Error('Could not close connections in time, forcefully shutting down'))
                }, 10000),
            ),
        ])
        console.log('server down successfully')
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

/* ---------------------------- graceful shutdown --------------------------- */

process.on('SIGINT', stop)
process.on('SIGTERM', stop)

/* -------------------------------------------------------------------------- */
start().catch(() => {
    process.abort()
})
