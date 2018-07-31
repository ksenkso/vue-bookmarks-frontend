export default class ValidationError extends Error {
  constructor(attribute, message) {
    super();
    this.name = 'ValidationError';
    //this.attribute = attribute;
    this.message = message.replace('{{attribute}}', attribute);
  }
}
