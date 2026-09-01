export class HttpError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function badRequest(message: string): never {
  throw new HttpError(400, message)
}

export function unauthorized(message: string): never {
  throw new HttpError(401, message)
}
