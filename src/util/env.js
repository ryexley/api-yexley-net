const envalid = require("envalid")
const { cleanEnv, str, host, port, url } = envalid

exports.initEnv = function initEnv() {
  const env = cleanEnv(process.env, {
    SERVICE_NAME: str(),
    SERVICE_HOST: host(),
    SERVICE_PORT: port(),
    LOG_LEVEL: str(),
    ESV_ROOT_URL: url(),
    ESV_API_KEY: str(),
    DATABASE_URL: url(),
    DATABASE_MIGRATIONS_DIR: str(),
    DATABASE_MIGRATIONS_TABLE_NAME: str()
  })

  return env
}
