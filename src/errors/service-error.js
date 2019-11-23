export class ServiceError extends Error {
  constructor(error) {
    super(error)

    this.name = "ServiceError"
  }
}
