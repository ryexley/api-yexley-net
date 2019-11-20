const TABLE_NAME = "bible_passage_references"

exports.up = async function(knex) {
  const exists = await knex.schema.hasTable(TABLE_NAME)

  return exists ? null : knex.schema.createTable(TABLE_NAME, table => {
    table.increments("id")
    table.string("book", 64).notNullable()
    table.integer("chapter").notNullable()
    table.integer("start_verse").notNullable()
    table.integer("end_verse")
    table.string("background_color_hex", 10)
    table.string("unsplash_image_id", 64)
    table.datetime("created").notNullable()
    table.datetime("updated").notNullable()
    table.datetime("deleted")
  })
}

exports.down = async function(knex) {
  const exists = await knex.schema.hasTable(TABLE_NAME)

  return exists ? knex.schema.dropTable(TABLE_NAME) : null
}
