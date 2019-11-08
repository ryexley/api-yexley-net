import config from "config"
import service from "@ryexley/service-core"
import { rootRouter } from "./routes/root"

const serviceConfig = {
  config,
  routes: [
    { path: "/", router: rootRouter }
  ]
}

export default service(serviceConfig).start()
