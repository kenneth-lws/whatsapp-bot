import express, { Response, Router } from 'express'
const healthCheck = (
    condition = async () => {
        return Promise.resolve(true)
    },
): Router => {
    const healthCheckRouter = express.Router()

    healthCheckRouter.get('/health-check', async (_, res: Response) => {
        if (await condition()) {
            res.status(200).send({
                status: 'OK',
            })
        } else {
            res.status(500).send({
                status: 'FAIL',
            })
        }
    })

    return healthCheckRouter
}

export default healthCheck
