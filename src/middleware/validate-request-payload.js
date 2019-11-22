import joi from "@hapi/joi"

export function validateRequestPayload(schema) {
  return (req, res, next) => {
    // TODO: validate the request payload with the given schema here

    return next()
  }
}
