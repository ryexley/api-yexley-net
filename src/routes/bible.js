import { Router as routeFactory } from "express"
import HttpStatus from "http-status"
import { validateRequestPayload } from "#/middleware/validate-request-payload"
import { bibleReferenceSchema } from "#/schemas/bible"
import { mapIncomingReference, mapOutgoingReference } from "#/maps/bible"
import { isNotEmpty } from "#/util"

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
    try {
      const timestamp = new Date().toISOString()
      const newReference = await db.insertReference({
        ...mapIncomingReference(req.body),
        created: timestamp,
        updated: timestamp
      })

      if (isNotEmpty(newReference)) {
        return res.status(HttpStatus.CREATED).send({
          ...mapOutgoingReference(newReference)
        })
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errors: [
          "Error creating new reference"
        ]
      })
    } catch (error) {
      log.error(error)

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: "error creating new reference"
      })
    }
  })

  router.get("/references", async (req, res) => {
    try {
      const referencesData = await db.getReferences()
      const references = referencesData.map(reference => ({
        ...mapOutgoingReference(reference)
      }))

      return res.status(HttpStatus.OK).send(references)
    } catch (error) {
      log.error(error)

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: "error getting reference list"
      })
    }
  })

  router.get("/:reference", async (req, res) => {
    try {
      const { reference } = req.params
      const passage = await esv.getPassage(reference)

      return res.status(HttpStatus.OK).send(passage)
    } catch (error) {
      log.error(error)

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: "error fetching bible passage"
      })
    }
  })

  return router
}
