import joi from "@hapi/joi"

export const bibleReferenceSchema = joi.object({
  book: joi.string().alphanum().min(3).max(64).required(),
  chapter: joi.number().integer().required(),
  startVerse: joi.number().integer().required(),
  endVerse: joi.number().integer(),
  backgroundColorHex: joi.string().alphanum().max(10),
  unsplashImageId: joi.string().alphanum().max(64)
})
