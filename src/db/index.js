import { DatabaseError } from "#/errors/database-error"
import { errorType } from "#/enums"

export class Database {
  constructor({ connectionFactory }) {
    this.db = connectionFactory()
  }

  async getReferences() {
    try {
      const references = await this.db("bible_passage_references").whereNull("deleted")

      return references
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async insertReference(reference) {
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
