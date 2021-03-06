import { NextFunction, Request, Response } from 'express'

//// also custom middleware
export const customMdlwr = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body['custom-param'] = 'Param added by Common, Custom middleware'

  next()
}

// another custom middleware with currying property
export const customMdlewrWithCurry =
  ({ curriedParam }: { curriedParam: string }) =>
  (req: Request, res: Response, next: NextFunction) => {
    // adding params to locals object of the response
    res.locals.curriedParam = curriedParam

    next()
  }
