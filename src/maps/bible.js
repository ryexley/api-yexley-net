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

  return {
    collection_id: collectionId,
    book,
    chapter,
    start_verse: startVerse,
    end_verse: endVerse,
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
    backgroundColorHex: background_color_hex,
    unsplashImageId: unsplash_image_id,
    created,
    updated,
    deleted
  }
}
