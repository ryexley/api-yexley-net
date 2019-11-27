const initEnv = require("./src/util/env").initEnv

const env = initEnv()

module.exports = {
  client: "pg",
  connection: env.DATABASE_URL,
  migrations: {
    tableName: env.DATABASE_MIGRATIONS_TABLE_NAME,
    directory: env.DATABASE_MIGRATIONS_DIR
  }
}
