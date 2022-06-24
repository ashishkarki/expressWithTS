import express, { NextFunction, Request, Response } from 'express'
import { API_NAME_VERSION } from './utils/constants'

// constants
const PORT = process.env.EXPRESS_PORT || 5001

// the app
const app = express()

// middlewares
app.use(express.json())
//// also custom middleware
const customMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.body['custom-param'] = 'this is a param added by custom middleware'

  next()
}
// use this custom middleware
app.use(customMiddleware)

// the routes
app.get(`${API_NAME_VERSION}`, (req: Request, res: Response) => {
  return res.send(
    `Hello express ts \n with custom middleware param: ${req.body['custom-param']}`
  )
})

app.get(
  `${API_NAME_VERSION}/:idParam/:nameParam`,
  (req: Request, res: Response, next: NextFunction) => {
    req.params['another-param'] =
      'this param is specific only to this get request'

    next()
  },
  (req: Request, res: Response) => {
    return res.status(200).json({
      message: 'parameterized request',
      params: {
        id: req.params.idParam,
        name: req.params.nameParam,
        anotherParam: req.params['another-param'],
      },
    })
  }
)

app.post(`${API_NAME_VERSION}`, (req: Request, res: Response) => {
  return res.status(201).json({
    message: 'Posted data',
    postedData: req.body,
  })
})

app.all(`${API_NAME_VERSION}/all`, (_, res: Response) => {
  return res.status(200).json({
    message: 'All data',
  })
})

// listen
app.listen(PORT, () => {
  console.log(`Express TS server listening at port ${PORT}`)
})
