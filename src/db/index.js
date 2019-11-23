import { DatabaseError } from "#/errors/database-error"
import { errorType } from "#/enums"

export class Database {
  constructor({ connectionFactory }) {
    this.db = connectionFactory()
  }

  async getBiblePassageCollections() {
    try {
      const collections = await this.db("bible_passage_collections").whereNull("deleted")

      return collections
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async insertBiblePassageCollection(collection) {
    try {
      const id = await this.db("bible_passage_collections").returning("id").insert(collection)

      return { id, ...collection }
    } catch (error) {
      let message = error.message
      let errType = errorType.NOT_DEFINED

      if (error.message.toLowerCase().includes("unique constraint failed")) {
        errType = errorType.UNIQUE_CONSTRAINT_VIOLATION
        const { name } = collection

        message = `Collection names must be unique. A collection with the name "${name}" already exists.`
      }

      throw new DatabaseError(error, message, errType)
    }
  }

  async getBiblePassageReferences() {
    try {
      const references = await this.db("bible_passage_references").whereNull("deleted")

      return references
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async insertBiblePassageReference(reference) {
    try {
      const id = await this.db("bible_passage_references").returning("id").insert(reference)

      return { ...reference, id }
    } catch (error) {
      let message = error.message
      let errType = errorType.NOT_DEFINED

      if (error.message.toLowerCase().includes("unique constraint failed")) {
        errType = errorType.UNIQUE_CONSTRAINT_VIOLATION
        const { book, chapter, start_verse, end_verse } = reference

        message = [
          "Bible references must be unique.",
          "A reference with the given combination of",
          "book, chapter, start verse and end verse",
          `(${book}, ${chapter}, ${start_verse} and ${end_verse})`,
          "already exists."
        ].join(" ")
      }

      throw new DatabaseError(error, message, errType)
    }
  }
}
