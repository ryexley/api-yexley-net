export function mapIncomingReference(reference) {
  const {
    book,
    chapter,
    startVerse,
    endVerse,
    backgroundColorHex,
    unsplashImageId
  } = reference

  return {
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
