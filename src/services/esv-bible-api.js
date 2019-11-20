import axios from "axios"
import Keyv from "keyv"
import { isNil } from "../util"

export class EsvBibleApi {
  constructor({ config, log }) {
    const {
      esv: {
        rootUrl,
        apiKey
      },
      sqlite: {
        filename: dbFilename
      }
    } = config

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

    this.cache = new Keyv(`sqlite://${dbFilename}`, {
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
