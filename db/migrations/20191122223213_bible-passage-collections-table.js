const TABLE_NAME = "bible_passage_collections"

exports.up = async function(knex) {
  const exists = await knex.schema.hasTable(TABLE_NAME)

  return exists ? null : await knex.schema.createTable(TABLE_NAME, table => {
    table.increments("id").primary()
    table.string("name", 64).notNullable()
    table.string("description", 256)
    table.datetime("created").notNullable()
    table.datetime("updated").notNullable()
    table.datetime("deleted")
    table.unique(["name"], "unique_collection_name")
  })
}

exports.down = async function(knex) {
  const exists = await knex.schema.hasTable(TABLE_NAME)

  return exists ? await knex.schema.dropTable(TABLE_NAME) : null
}
