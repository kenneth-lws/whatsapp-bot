// automate async error handling, must before all express functions' execution
import 'express-async-errors'

import express from 'express'

const rootRouter = express.Router()

export default rootRouter
