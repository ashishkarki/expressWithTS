import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { sampleRtr } from './routes'
import { API_NAME_VERSION, ROUTES } from './utils/constants'
import { customMdlwr } from './utils/middlewares'

// constants
const PORT = process.env.EXPRESS_PORT || 5001

// the app
const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

// put all the routes that don't use custom middlewares here

// Example => use this custom middleware - for all the requests
app.use(customMdlwr)

// the routes
app.use(`${API_NAME_VERSION}${ROUTES.SAMPLE}`, sampleRtr)

// listen
app.listen(PORT, () => {
  console.log(`Express TS server listening at port ${PORT}`)
})
