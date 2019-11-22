import { DatabaseError } from "#/errors/database-error"

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
      throw new DatabaseError(error)
    }
  }
}
