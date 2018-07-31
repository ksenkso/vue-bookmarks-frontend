export default class ResponseError extends Error {
  constructor(message, errors) {
    super();
    this.message = message;
    this.errors = errors;
  }
}
