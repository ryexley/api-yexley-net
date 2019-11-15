import config from "config"
import service from "@ryexley/service-core"
import { rootRouter } from "./routes/root"
import { bibleRouter } from "./routes/bible"

const serviceConfig = {
  config,
  routes: [
    { path: "/", router: rootRouter },
    { path: "/bible", router: bibleRouter }
  ]
}

export default service(serviceConfig).start()
