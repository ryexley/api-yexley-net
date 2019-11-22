import { Router as routeFactory } from "express"
import HttpStatus from "http-status"
import { validateRequestPayload } from "../middleware/validate-request-payload"
import { bibleReferenceSchema } from "../schemas/bible"

export function bibleRouter(app) {
  const router = routeFactory()
  const { services: { esv }, db, log } = app

  router.get("/", (req, res) => res.status(HttpStatus.OK).send({
    service: {
      meta: {
        url: "api.yexley.net/bible"
      }
    }
  }))

  router.post("/references", [validateRequestPayload(bibleReferenceSchema)], async (req, res) => {
    return res.status(HttpStatus.NOT_IMPLEMENTED).send("Not implemented yet")
  })

  router.get("/references", async (req, res) => {
    try {
      const references = await db.getReferences()

      return res.status(HttpStatus.OK).send(references)
    } catch (error) {
      log.error(error)

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: "error getting reference list"
      })
    }
  })

  router.get("/:reference", async (req, res) => {
    const { reference } = req.params
    const passage = await esv.getPassage(reference)

    return res.status(HttpStatus.OK).send(passage)
  })

  return router
}
