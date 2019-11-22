import HttpStatus from "http-status"
import { isNotEmpty } from "../util"

export function validateRequestPayload(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (isNotEmpty(error)) {
      const errors = error.details.map(err => err.message)

      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(errors)
    }

    return next()
  }
}
