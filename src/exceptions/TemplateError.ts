export default class TemplateError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.stack = new Error().stack;
    this.name = this.constructor.name;
  }
}
