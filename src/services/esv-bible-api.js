import axios from "axios"
import Keyv from "keyv"
import { isNil } from "../util"

export class EsvBibleApi {
  constructor({ config, log }) {
    const { esv: { rootUrl, apiKey } } = config

    this.log = log

    this.http = axios.create({
      baseURL: rootUrl,
      headers: {
        Authorization: `Token ${apiKey}`
      }
    })

    this.cache = new Keyv({
      namespace: "esv-bible-cache"
    })
  }

  async getPassage(reference) {
    let passage = await this.cache.get(reference)

    if (isNil(passage)) {
      const { data } = await this.http.get("passage/text", {
        params: { q: reference }
      })

      await this.cache.set(reference, data)

      passage = data
    }

    return passage
  }
}
