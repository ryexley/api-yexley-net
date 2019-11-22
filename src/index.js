import config from "config"
import service from "@ryexley/service-core"
import knex from "knex"
import { Database } from "./db"
import { EsvBibleApi } from "./services/esv-bible-api"
import { rootRouter } from "./routes/root"
import { bibleRouter } from "./routes/bible"

function configure(app) {
  const { config: appConfig, config: { sqlite }, log } = app
  const dbConnectionFactory = () => knex({
    client: "sqlite3",
    connection: {
      filename: sqlite.filename
    }
  })

  const db = new Database({ connectionFactory: dbConnectionFactory, config: sqlite, log })
  const esv = new EsvBibleApi({ config: appConfig, log })

  return {
    db,
    services: {
      esv
    }
  }
}

const serviceConfig = {
  config,
  configure,
  routes: [
    { path: "/", router: rootRouter },
    { path: "/bible", router: bibleRouter }
  ]
}

export default service(serviceConfig).start()
