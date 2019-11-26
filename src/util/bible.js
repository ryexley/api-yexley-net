/* eslint-disable quote-props */
export const book = {
  "genesis": {
    displayName: "Genesis",
    slug: "genesis"
  },
  "exodus": {
    displayName: "Exodus",
    slug: "exodus"
  },
  "leviticus": {
    displayName: "Leviticus",
    slug: "leviticus"
  },
  "numbers": {
    displayName: "Numbers",
    slug: "numbers"
  },
  "deuteronomy": {
    displayName: "Deuteronomy",
    slug: "deuteronomy"
  },
  "joshua": {
    displayName: "Joshua",
    slug: "joshua"
  },
  "judges": {
    displayName: "Judges",
    slug: "judges"
  },
  "ruth": {
    displayName: "Ruth",
    slug: "ruth"
  },
  "first-samuel": {
    displayName: "1st Samuel",
    slug: "1samuel"
  },
  "second-samuel": {
    displayName: "2nd Samuel",
    slug: "2samuel"
  },
  "first-kings": {
    displayName: "1st Kings",
    slug: "1kings"
  },
  "second-kings": {
    displayName: "2nd Kings",
    slug: "2kings"
  },
  "first-chronicles": {
    displayName: "1st Chronicles",
    slug: "1chronicles"
  },
  "second-chronicles": {
    displayName: "2nd Chronicles",
    slug: "2chronicles"
  },
  "ezra": {
    displayName: "Ezra",
    slug: "ezra"
  },
  "nehemiah": {
    displayName: "Nehemiah",
    slug: "nehemiah"
  },
  "esther": {
    displayName: "Esther",
    slug: "esther"
  },
  "job": {
    displayName: "Job",
    slug: "job"
  },
  "psalms": {
    displayName: "Psalms",
    slug: "psalms"
  },
  "proverbs": {
    displayName: "Proverbs",
    slug: "proverbs"
  },
  "ecclesiastes": {
    displayName: "Ecclesiastes",
    slug: "ecclesiastes"
  },
  "song-of-solomon": {
    displayName: "Song of Solomon",
    slug: "songofsolomon"
  },
  "isaiah": {
    displayName: "Isaiah",
    slug: "isaiah"
  },
  "jeremiah": {
    displayName: "Jeremiah",
    slug: "jeremiah"
  },
  "lamentations": {
    displayName: "Lamentations",
    slug: "lamentations"
  },
  "ezekiel": {
    displayName: "Ezekial",
    slug: "ezekiel"
  },
  "daniel": {
    displayName: "Daniel",
    slug: "daniel"
  },
  "hosea": {
    displayName: "Hosea",
    slug: "hosea"
  },
  "joel": {
    displayName: "Joel",
    slug: "joel"
  },
  "amos": {
    displayName: "Amos",
    slug: "amos"
  },
  "obadiah": {
    displayName: "Obadiah",
    slug: "obadiah"
  },
  "jonah": {
    displayName: "Jonah",
    slug: "jonah"
  },
  "micah": {
    displayName: "Micah",
    slug: "micah"
  },
  "nahum": {
    displayName: "Nahum",
    slug: "nahum"
  },
  "habakkuk": {
    displayName: "Habakkuk",
    slug: "habakkuk"
  },
  "zephaniah": {
    displayName: "Zephaniah",
    slug: "zephaniah"
  },
  "haggai": {
    displayName: "Haggai",
    slug: "haggai"
  },
  "zechariah": {
    displayName: "Zechariah",
    slug: "zechariah"
  },
  "malachi": {
    displayName: "Malachi",
    slug: "malachi"
  },
  "matthew": {
    displayName: "Matthew",
    slug: "matthew"
  },
  "mark": {
    displayName: "Mark",
    slug: "mark"
  },
  "luke": {
    displayName: "Luke",
    slug: "luke"
  },
  "john": {
    displayName: "John",
    slug: "john"
  },
  "acts": {
    displayName: "Acts",
    slug: "acts"
  },
  "romans": {
    displayName: "Romans",
    slug: "romans"
  },
  "first-corinthians": {
    displayName: "1st Corinthians",
    slug: "1corinthians"
  },
  "second-corinthians": {
    displayName: "2nd Corinthians",
    slug: "2corinthians"
  },
  "galatians": {
    displayName: "Galatians",
    slug: "galatians"
  },
  "ephesians": {
    displayName: "Ephesians",
    slug: "ephesians"
  },
  "philippians": {
    displayName: "Philippians",
    slug: "philippians"
  },
  "colossians": {
    displayName: "Colossians",
    slug: "colossians"
  },
  "first-thessalonians": {
    displayName: "1st Thessalonians",
    slug: "1thessalonians"
  },
  "second-thessalonians": {
    displayName: "2nd Thessalonians",
    slug: "2thessalonians"
  },
  "first-timothy": {
    displayName: "1st Timothy",
    slug: "1timothy"
  },
  "second-timothy": {
    displayName: "2nd Timothy",
    slug: "2timothy"
  },
  "titus": {
    displayName: "Titus",
    slug: "titus"
  },
  "philemon": {
    displayName: "Philemon",
    slug: "philemon"
  },
  "hebrews": {
    displayName: "Hebrews",
    slug: "hebrews"
  },
  "james": {
    displayName: "James",
    slug: "james"
  },
  "first-peter": {
    displayName: "1st Peter",
    slug: "1peter"
  },
  "second-peter": {
    displayName: "2nd Peter",
    slug: "2peter"
  },
  "first-john": {
    displayName: "1st John",
    slug: "1john"
  },
  "second-john": {
    displayName: "2nd John",
    slug: "2john"
  },
  "third-john": {
    displayName: "3rd John",
    slug: "3john"
  },
  "jude": {
    displayName: "Jude",
    slug: "jude"
  },
  "revelation": {
    displayName: "Revelation",
    slug: "revelation"
  }
}
/* eslint-enable quote-props */

export function bookDisplayNames() {
  const displayNames = Object.keys(book).map(b => book[b].displayName)

  return displayNames
}
