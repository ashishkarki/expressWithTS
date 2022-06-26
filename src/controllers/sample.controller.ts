import { Request, Response } from 'express'
import { API_NAME_VERSION } from '../utils/constants'

export default class SampleController {
  static getRootRequest = (req: Request, res: Response) => {
    return res.send(
      `Hello express ts \n with custom middleware param: ${req.body['custom-param']} \n and custom middleware
      res.locals param: ${res.locals.curriedParam}`
    )
  }

  static getParameterizedRequest = (req: Request, res: Response) => {
    return res.status(200).json({
      message: 'parameterized request',
      params: {
        id: req.params.idParam,
        name: req.params.nameParam,
        anotherParam: req.params['anotherParam'],
      },
    })
  }

  static postRequest = (req: Request, res: Response) => {
    return res.status(201).json({
      message: 'Posted data',
      postedData: req.body,
    })
  }

  static getAllRequest = (_: Request, res: Response) => {
    return res.status(200).json({
      message: 'All data',
    })
  }

  static throwAnError = async (req: Request, res: Response) => {
    try {
      await this.throwAnErrorHelper()
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: `We threw a dramatic error: ${error.message}`,
      })
    }
  }

  private static throwAnErrorHelper = async () => {
    throw new Error(`${API_NAME_VERSION}: an Error`)
  }
}
