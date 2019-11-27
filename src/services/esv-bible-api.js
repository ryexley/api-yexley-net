import axios from "axios"
import Keyv from "keyv"
import { isNil } from "#/util"
import { ServiceError } from "#/errors/service-error"

export class EsvBibleApi {
  constructor({ env, log }) {
    this.log = log

    this.http = axios.create({
      baseURL: env.ESV_ROOT_URL,
      headers: {
        Authorization: `Token ${env.ESV_API_KEY}`
      }
    })

    this.defaultOptions = {
      "include-passage-references": false,
      "include-footnotes": false,
      "include-headings": false
    }

    this.cache = new Keyv(env.DATABASE_URL, {
      namespace: "esv-bible-cache",
      table: "esv_bible_passage_cache",
      busyTimeout: 5000
    })

    this.cache.on("error", err => {
      const error = new Error(err)

      this.log.error(error)
      throw new Error("cache connection error", error)
    })
  }

  async getPassage(reference) {
    try {
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
    } catch (error) {
      throw new ServiceError(error)
    }
  }
}
