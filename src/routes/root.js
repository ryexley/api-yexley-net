import { Router as routeFactory } from "express"
import HttpStatus from "http-status"

export function rootRouter(/* app */) {
  const router = routeFactory()

  router.get("/", (req, res) => res.status(HttpStatus.OK).send({
    data: null,
    errors: [],
    meta: {
      name: "api.yexley.net",
      description: "yexley.net programmable api",
      type: "json",
      owner: "Bob Yexley",
      contact: "bob@yexley.net",
      web: "https://bob.yexley.net"
    }
  }))

  return router
}
