const config = require("config")

const { sqlite } = config

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: sqlite.filename
    },
    migrations: {
      tableName: sqlite.migrationsTableName,
      directory: sqlite.migrationsDir
    }
  },

  staging: {
    client: "sqlite3",
    connection: {
      filename: sqlite.filename
    },
    migrations: {
      tableName: sqlite.migrationsTableName,
      directory: sqlite.migrationsDir
    }
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: sqlite.filename
    },
    migrations: {
      tableName: sqlite.migrationsTableName,
      directory: sqlite.migrationsDir
    }
  }
}
