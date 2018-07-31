import BaseValidator from './BaseValidator';

/**
 * @class SequenceValidator
 * @extends BaseValidator
 * @property {String} value
 * @property {StepCondition[]} conditions
 */
export default class SequenceValidator extends BaseValidator {
  /**
   *
   * @param {IterableIterator} value
   * @param {StepCondition[]} conditions
   */
  constructor(value, conditions) {
    super(value, conditions);
  }

  /**
   *
   * @inheritDoc
   */
  validation() {
    for (const item of this.value) {
      this.conditions.forEach(cond => {
        cond.step(item);
      });
    }
    return super.validation();
  }
}
