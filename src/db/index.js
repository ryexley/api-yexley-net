export class Database {
  constructor({ connectionFactory, log }) {
    this.log = log
    this.db = connectionFactory()
  }

  async getReferences() {
    try {
      const references = await this.db("bible_passage_references").select()

      return references
    } catch (error) {
      this.log.error(error)
      return []
    }
  }
}
