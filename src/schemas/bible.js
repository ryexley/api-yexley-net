import joi from "@hapi/joi"

export const biblePassageCollectionSchema = joi.object({
  name: joi.string().min(1).max(64).required(),
  description: joi.string().max(256)
}).options({
  abortEarly: false
})

export const bibleReferenceSchema = joi.object({
  collectionId: joi.number().integer().required(),
  book: joi.string().min(3).max(64).required(),
  chapter: joi.number().integer().required(),
  startVerse: joi.number().integer().required(),
  endVerse: joi.number().integer(),
  backgroundColorHex: joi.string().alphanum().max(10),
  unsplashImageId: joi.string().alphanum().max(64)
}).options({
  abortEarly: false
})
