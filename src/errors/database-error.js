import { errorType } from "#/enums"

export class DatabaseError extends Error {
  constructor(error, message = error.message, type = errorType.NOT_DEFINED) {
    super(error)

    this.name = "DatabaseError"
    this.message = message
    this.type = type
  }
}
