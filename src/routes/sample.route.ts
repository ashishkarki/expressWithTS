import express, { NextFunction, Request, Response } from 'express'

import { API_NAME_VERSION } from '../utils/constants'
import { customMdlewrWithCurry } from '../utils/middlewares'

// the router
const sampleRtr = express.Router()

// the routes
sampleRtr.get(
  `/`,
  customMdlewrWithCurry({ curriedParam: 'a locals object param' }),
  (req: Request, res: Response) => {
    return res.send(
      `Hello express ts \n with custom middleware param: ${req.body['custom-param']} \n and custom middleware
      res.locals param: ${res.locals.curriedParam}`
    )
  }
)

sampleRtr.get(
  `/:idParam/:nameParam`,
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

sampleRtr.post(`/`, (req: Request, res: Response) => {
  return res.status(201).json({
    message: 'Posted data',
    postedData: req.body,
  })
})

sampleRtr.all(`/all`, (_, res: Response) => {
  return res.status(200).json({
    message: 'All data',
  })
})

// some error handling
async function throwAnError() {
  throw new Error(`${API_NAME_VERSION}: an Error`)
}

// its a good idea to wrap async code in try/catch block
sampleRtr.get(`/error`, async (req, res) => {
  try {
    await throwAnError()
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `We threw a dramatic error: ${error.message}`,
    })
  }
})

// export default
export default sampleRtr
