import axios from "axios"

export class DigitalBibleToolkit {
  constructor(config) {
    const { dbt: { rootUrl } } = config

    this.http = axios.create({ baseURL: `${rootUrl}/text/verse` })
  }
}
