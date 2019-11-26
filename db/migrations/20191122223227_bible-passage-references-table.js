const TABLE_NAME = "bible_passage_references"
const PARENT_TABLE_NAME = "bible_passage_collections"

exports.up = async function(knex) {
  const exists = await knex.schema.hasTable(TABLE_NAME)

  return exists ? null : await knex.schema.createTable(TABLE_NAME, table => {
    table.increments("id").primary()
    table.bigInteger("collection_id").index("bible_passage_reference_collection").references("id").inTable(PARENT_TABLE_NAME).notNullable().onDelete("cascade")
    table.string("book", 64).notNullable()
    table.integer("chapter").notNullable()
    table.integer("start_verse").notNullable()
    table.integer("end_verse")
    table.string("slug", 96).notNullable()
    table.string("background_color_hex", 10)
    table.string("unsplash_image_id", 64)
    table.datetime("created").notNullable()
    table.datetime("updated").notNullable()
    table.datetime("deleted")
    table.unique(["book", "chapter", "start_verse", "end_verse"], "unique_bible_reference")
  })
}

exports.down = async function(knex) {
  const exists = await knex.schema.hasTable(TABLE_NAME)

  return exists ? await knex.schema.dropTable(TABLE_NAME) : null
}
