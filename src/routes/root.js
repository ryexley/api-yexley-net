import { Router as routeFactory } from "express"
import HttpStatus from "http-status"
import packageConfig from "../../package.json"

export function rootRouter(/* app */) {
  const router = routeFactory()
  const {
    name,
    version: serviceVersion,
    description,
    author
  } = packageConfig

  router.get("/", (req, res) => res.status(HttpStatus.OK).send({
    service: {
      meta: {
        name,
        version: serviceVersion,
        description,
        author,
        type: "json"
      }
    }
  }))

  return router
}
