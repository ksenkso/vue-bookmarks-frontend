/**
 * @interface IValidator
 */
/**
 * @function validation
 * @name IValidator#validation
 * @return {Boolean}
 */
/**
 * @class BaseValidator
 * @implements {IValidator}
 */
export default class BaseValidator {
  constructor(value, conditions) {
    /**
     * Value to check for conditions
     * @type {*}
     */
    this.value = value;
    /**
     * List of conditions to check
     * @type {Condition[]}
     */
    this.conditions = conditions;
    /**
     * List of errors
     * @type {ValidationError[]}
     */
    this.errors = [];
  }

  getErrors() {
    return this.errors;
  }

  /**
   * Actions to perform before validation
   */
  beforeValidate() {

  }

  /**
   *
   * @return {boolean}
   */
  validate() {
    // clear the errors list first
    this.errors = [];
    this.beforeValidate();
    const result = this.validation();
    this.afterValidate();
    return result;
  }

  /**
   *
   * @return {boolean}
   */
  validation() {
    this.conditions.forEach(condition => {
      const result = condition.check(this.value);
      if (!result.done) {
        this.errors.push(result.error);
      }
    });
    return !this.errors.length;
  }

  /**
   * Actions after validation
   */
  afterValidate() {

  }
}
