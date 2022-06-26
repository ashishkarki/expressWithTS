import express, { NextFunction, Request, Response } from 'express'
import { SampleController } from '../controllers'

import { API_NAME_VERSION } from '../utils/constants'
import { customMdlewrWithCurry } from '../utils/middlewares'

// the router
const sampleRtr = express.Router()

// the routes
sampleRtr
  .route(`/`)
  .get(
    customMdlewrWithCurry({ curriedParam: 'a locals object param' }),
    SampleController.getRootRequest
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
  SampleController.getParameterizedRequest
)

sampleRtr.post(`/`, SampleController.postRequest)

sampleRtr.all(`/all`, SampleController.getAllRequest)

// some error handling
async function throwAnError() {
  throw new Error(`${API_NAME_VERSION}: an Error`)
}

// its a good idea to wrap async code in try/catch block
sampleRtr.get(`/error`, SampleController.throwAnError)

// export default
export default sampleRtr
