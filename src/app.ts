import express, { NextFunction, Request, Response } from 'express'
import sampleRtr from './routes/sample.route'
import { API_NAME_VERSION, ROUTES } from './utils/constants'
import { customMdlwr } from './utils/middlewares'

// constants
const PORT = process.env.EXPRESS_PORT || 5001

// the app
const app = express()

// middlewares
app.use(express.json())

// Example => use this custom middleware - for all the requests
app.use(customMdlwr)

// the routes
app.use(`${API_NAME_VERSION}${ROUTES.SAMPLE}`, sampleRtr)

// listen
app.listen(PORT, () => {
  console.log(`Express TS server listening at port ${PORT}`)
})
