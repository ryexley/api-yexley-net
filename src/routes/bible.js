import { Router as routeFactory } from "express"
import HttpStatus from "http-status"
import { validateRequestPayload } from "#/middleware/validate-request-payload"
import { errorType } from "#/enums"
import { isNotEmpty } from "#/util"
import {
  biblePassageCollectionSchema,
  bibleReferenceSchema
} from "#/schemas/bible"
import {
  mapIncomingCollection,
  mapOutgoingCollection,
  mapIncomingReference,
  mapOutgoingReference
} from "#/maps/bible"

export function bibleRouter(app) {
  const router = routeFactory()
  const { services: { esv }, db, log, env } = app
  const port = (env.SERVICE_PORT !== 80) ? `:${env.SERVICE_PORT}` : ""
  const routerBaseUrl = `${env.SERVICE_HOST}${port}/bible`

  router.get("/", (req, res) => res.status(HttpStatus.OK).send({
    service: {
      name: env.SERVICE_NAME,
      meta: {
        url: routerBaseUrl
      }
    }
  }))

  router.post("/collections", [validateRequestPayload(biblePassageCollectionSchema)], async (req, res) => {
    try {
      const timestamp = new Date().toISOString()
      const newCollection = await db.insertBiblePassageCollection({
        ...mapIncomingCollection(req.body),
        created: timestamp,
        updated: timestamp
      })

      if (isNotEmpty(newCollection)) {
        return res.status(HttpStatus.CREATED).send({ ...newCollection })
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errors: [
          "Error creating new Bible passage collection"
        ]
      })
    } catch (error) {
      log.error(error)

      if (error.type === errorType.UNIQUE_CONSTRAINT_VIOLATION) {
        return res.status(HttpStatus.CONFLICT).send({
          error: errorType.UNIQUE_CONSTRAINT_VIOLATION,
          message: error.message
        })
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: "Error creating new Bible passage collection"
      })
    }
  })

  router.get("/collections", async (req, res) => {
    try {
      const mappingOptions = { routerBaseUrl, protocol: req.protocol }
      const collectionData = await db.getBiblePassageCollections()
      const collections = collectionData.map(collection => ({
        ...mapOutgoingCollection(collection, mappingOptions)
      }))

      return res.status(HttpStatus.OK).send(collections)
    } catch (error) {
      log.error(error)

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: "error getting bible passage collection list"
      })
    }
  })

  router.get("/collection/:slug/references", async (req, res) => {
    try {
      const { slug: collectionSlug } = req.params
      const mappingOptions = { routerBaseUrl, protocol: req.protocol }
      const collectionData = await db.getBiblePassageCollectionReferences(collectionSlug)
      const collection = mapOutgoingCollection(collectionData, mappingOptions)

      return res.status(HttpStatus.OK).send(collection)
    } catch (error) {
      log.error(error)

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: "error getting bible passage collection"
      })
    }
  })

  router.post("/references", [validateRequestPayload(bibleReferenceSchema)], async (req, res) => {
    try {
      const mappingOptions = { routerBaseUrl, protocol: req.protocol }
      const timestamp = new Date().toISOString()
      const newReference = await db.insertBiblePassageReference({
        ...mapIncomingReference(req.body),
        created: timestamp,
        updated: timestamp
      })

      if (isNotEmpty(newReference)) {
        return res.status(HttpStatus.CREATED).send({
          ...mapOutgoingReference(newReference, mappingOptions)
        })
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errors: [
          "Error creating new reference"
        ]
      })
    } catch (error) {
      log.error(error)

      if (error.type === errorType.UNIQUE_CONSTRAINT_VIOLATION) {
        return res.status(HttpStatus.CONFLICT).send({
          error: errorType.UNIQUE_CONSTRAINT_VIOLATION,
          message: error.message
        })
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: "error creating new reference"
      })
    }
  })

  router.get("/references", async (req, res) => {
    try {
      const mappingOptions = { routerBaseUrl, protocol: req.protocol }
      const referencesData = await db.getBiblePassageReferences()
      const references = referencesData.map(reference => ({
        ...mapOutgoingReference(reference, mappingOptions)
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
