import { Router as routeFactory } from "express"
import HttpStatus from "http-status"
import { EsvBibleApi } from "../services/esv-bible-api"

export function bibleRouter(app) {
  const router = routeFactory()
  const { config, log } = app

  const esv = new EsvBibleApi({ config, log })

  router.get("/", (req, res) => res.status(HttpStatus.OK).send({
    service: {
      meta: {
        url: "api.yexley.net/bible"
      }
    }
  }))

  router.get("/:reference", async (req, res) => {
    const { reference } = req.params
    const passage = await esv.getPassage(reference)

    return res.status(HttpStatus.OK).send(passage)
  })

  return router
}
