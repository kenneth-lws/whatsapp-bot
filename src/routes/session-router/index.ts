import express, { Router, Request, Response } from 'express'
import { body } from 'express-validator'

// automate async error handling, must before all express functions' execution
import 'express-async-errors'

const sessionRouter: Router = express.Router()

/*
    Login
 */
sessionRouter.post('/', body('username').notEmpty(), (req: Request, res: Response) => {
    // business login implementation
    res.send('OK')
})

export default sessionRouter
