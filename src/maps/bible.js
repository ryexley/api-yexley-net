import slugify from "slugify"
import { book as books } from "#/util/bible"
import { isNotEmpty } from "#/util"

export function mapIncomingReference(reference) {
  const {
    collectionId,
    book,
    chapter,
    startVerse,
    endVerse,
    backgroundColorHex,
    unsplashImageId
  } = reference

  let slug = `${books[book.toLowerCase()].slug}+${chapter}:${startVerse}`

  slug = isNotEmpty(endVerse) ? `${slug}-${endVerse}` : slug

  return {
    collection_id: collectionId,
    book,
    chapter,
    start_verse: startVerse,
    end_verse: endVerse,
    slug,
    background_color_hex: backgroundColorHex,
    unsplash_image_id: unsplashImageId
  }
}

export function mapOutgoingReference(reference) {
  const {
    id,
    collection_id,
    book,
    chapter,
    start_verse,
    end_verse,
    slug,
    background_color_hex,
    unsplash_image_id,
    created,
    updated,
    deleted
  } = reference

  return {
    id,
    collectionId: collection_id,
    book,
    chapter,
    startVerse: start_verse,
    endVerse: end_verse,
    slug,
    backgroundColorHex: background_color_hex,
    unsplashImageId: unsplash_image_id,
    created,
    updated,
    deleted
  }
}

export function mapIncomingCollection(collection) {
  const {
    name,
    description
  } = collection

  const slug = slugify(name, { lower: true })

  return {
    name,
    description,
    slug
  }
}

export function mapOutgoingCollection(collection) {
  const {
    id,
    name,
    description,
    slug,
    created,
    updated,
    deleted,
    references: collectionReferences = []
  } = collection

  return {
    id,
    name,
    description,
    slug,
    created,
    updated,
    deleted,
    references: collectionReferences.map(mapOutgoingReference)
  }
}
