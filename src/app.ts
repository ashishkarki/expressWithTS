import express, { NextFunction, Request, Response } from 'express'
import { API_NAME_VERSION } from './utils/constants'

// constants
const PORT = process.env.EXPRESS_PORT || 5001

// the app
const app = express()

// middlewares
app.use(express.json())
//// also custom middleware
const customMdlwr = (req: Request, res: Response, next: NextFunction) => {
  req.body['custom-param'] = 'this is a param added by custom middleware'

  next()
}
// use this custom middleware
app.use(customMdlwr)

// another custom middleware with currying property
const customMdlewrWithCurry =
  ({ curriedParam }: { curriedParam: string }) =>
  (req: Request, res: Response, next: NextFunction) => {
    // adding params to locals object of the response
    res.locals.curriedParam = curriedParam

    next()
  }

// the routes
app.get(
  `${API_NAME_VERSION}`,
  customMdlewrWithCurry({ curriedParam: 'a locals object param' }),
  (req: Request, res: Response) => {
    return res.send(
      `Hello express ts \n with custom middleware param: ${req.body['custom-param']} \n and custom middleware
      res.locals param: ${res.locals.curriedParam}`
    )
  }
)

app.get(
  `${API_NAME_VERSION}/:idParam/:nameParam`,
  (
    req: Request<
      { anotherParam: string; idParam: string; nameParam: string },
      {},
      {},
      {},
      {}
    >,
    res: Response,
    next: NextFunction
  ) => {
    req.params.anotherParam = 'this param is specific only to this get request'

    next()
  },
  (req: Request, res: Response) => {
    return res.status(200).json({
      message: 'parameterized request',
      params: {
        id: req.params.idParam,
        name: req.params.nameParam,
        anotherParam: req.params['anotherParam'],
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

// some error handling
async function throwAnError() {
  throw new Error(`${API_NAME_VERSION}: an Error`)
}

// its a good idea to wrap async code in try/catch block
app.get(`${API_NAME_VERSION}/error`, async (req, res) => {
  try {
    await throwAnError()
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `We threw a dramatic error: ${error.message}`,
    })
  }
})

// listen
app.listen(PORT, () => {
  console.log(`Express TS server listening at port ${PORT}`)
})
