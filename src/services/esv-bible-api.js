import axios from "axios"
import Keyv from "keyv"
// import debug from "debug"
import { isNil } from "../util"

export class EsvBibleApi {
  constructor({ config, log }) {
    const { esv: { rootUrl, apiKey } } = config

    // this.debug = debug("api:services:bible:esv")
    this.log = log

    this.http = axios.create({
      baseURL: rootUrl,
      headers: {
        Authorization: `Token ${apiKey}`
      }
    })

    this.defaultOptions = {
      "include-passage-references": false,
      "include-footnotes": false,
      "include-headings": false
    }

    this.cache = new Keyv({
      namespace: "esv-bible-cache"
    })
  }

  async getPassage(reference) {
    let passage = await this.cache.get(reference)

    if (isNil(passage)) {
      this.log.debug("cache miss, fetching from esv api")
      const { data } = await this.http.get("passage/text", {
        params: {
          ...this.defaultOptions,
          q: reference
        }
      })

      await this.cache.set(reference, data)

      passage = data
    } else {
      this.log.debug("cache hit, returning cached value")
    }

    return passage
  }
}
