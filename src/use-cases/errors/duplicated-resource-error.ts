export class DuplicatedResourceError extends Error {
  constructor() {
    super('Resource already exists.')
  }
}
