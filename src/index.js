import service from "@ryexley/service-core"
import knex from "knex"
import { initEnv } from "#/util/env"
import { Database } from "#/db"
import { EsvBibleApi } from "#/services/esv-bible-api"
import { rootRouter } from "#/routes/root"
import { bibleRouter } from "#/routes/bible"

function configure(app) {
  const { env: appEnv, log } = app

  const dbConnectionFactory = () => knex({
    client: "pg",
    connection: appEnv.DATABASE_URL
  })

  const db = new Database({ connectionFactory: dbConnectionFactory })
  const esv = new EsvBibleApi({ env: appEnv, log })

  return {
    db,
    services: {
      esv
    }
  }
}

const env = initEnv()

const serviceConfig = {
  env,
  configure,
  routes: [
    { path: "/", router: rootRouter },
    { path: "/bible", router: bibleRouter }
  ]
}

export default service(serviceConfig).start()
