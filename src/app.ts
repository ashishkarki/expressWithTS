import express from 'express'
import { sampleRtr } from './routes'

import { API_NAME_VERSION, ROUTES } from './utils/constants'
import { customMdlwr } from './utils/middlewares'

// constants
const PORT = process.env.EXPRESS_PORT || 5001

// the app
const app = express()

// middlewares
app.use(express.json())

// put all the routes that don't use middlewares here before

// Example => use this custom middleware - for all the requests
app.use(customMdlwr)

// the routes
app.use(`${API_NAME_VERSION}${ROUTES.SAMPLE}`, sampleRtr)

// listen
app.listen(PORT, () => {
  console.log(`Express TS server listening at port ${PORT}`)
})
