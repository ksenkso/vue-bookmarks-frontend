import SequenceValidator from '../classes/SequenceValidator';
import ValidationError from '../classes/ValidationError';
import BaseValidator from '../classes/BaseValidator';

export function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export const $ = (selector, ctx = document) => ctx.querySelector(selector);

/**
 *
 * @param {HTMLFormElement} form
 */
export const getFormValues = (form) => {
  const values = {};
  for (const item of form.elements) {
    if (!(item.type === 'submit') && !(item.type === 'button')) {
      values[item.name] = item.value;
    }
  }
  return values;
};

// noinspection JSUnusedGlobalSymbols
/**
 *
 * @param email
 * @param password
 * @return {{done: Boolean, errors: ?ValidationError[]}}
 */
export function validateCredentials({email, password}) {
  const conditions = [
    {
      check() {
        const EMAIL_REGEX = /(\w+)@(\w+)\.(\w+)/gm;

        if (!EMAIL_REGEX.test(email)) {
          return {
            done: false,
            error: new ValidationError('email', 'Email should look like "name@domain.zone"')
          };
        } else {
          return {
            done: true,
            error: null
          };
        }
      }
    }
  ];
  const validator = new BaseValidator(email, conditions);
  let errors = [];
  if (!validator.validate()) {
    errors = validator.getErrors();
  }
  const result = validatePassword(password);
  if (result.done) {
    return {done: true, errors: null};
  } else {
    errors = errors.concat(result.errors);
    return {done: false, errors};
  }
}

/**
 *
 * @throws {ValidationError}
 * @param {String} password
 * @return {{done: Boolean, errors: ?ValidationError[]}}
 */
function validatePassword(password) {
  const conditions = [
    {
      step() {
      },
      check(value) {
        return value.length >= 8 ? {done: true, error: null} : {
          done: false,
          error: new ValidationError('password', '{{attribute}} should be at least 8 symbols')
        };
      }
    },
    condHasNumberLatinChars(3),
    condHasNumberOfChars('@[].+=-!#$%&*', 3)
  ];
  const validator = new SequenceValidator(/**@type IterableIterator<string>*/ password, conditions);
  if (validator.validation()) {
    return {done: true, errors: null};
  } else {
    return {done: false, errors: validator.getErrors()};
  }
}

/**
 * @typedef {{done: Boolean, error: ValidationError|null}} ConditionResult
 *
 */

/**
 * @typedef {Object} Condition
 */

/**
 * @function
 * @name Condition#check
 * @param {*} [value]
 * @return {ConditionResult}
 */

/**
 * @typedef {{...Condition}} StepCondition
 */

/**
 * @function
 * @name StepCondition#step
 * @param {*} char
 * @return {void}
 */

/**
 *
 * @param {String} chars
 * @param {Number} number
 * @param {Object} validationAttributes
 * @return {StepCondition}
 */
function condHasNumberOfChars(chars, number, validationAttributes = {name: 'Value'}) {
  let counter = 0;
  /**
   * @type {StepCondition}
   */
  return {
    step(char) {
      if (chars.includes(char)) {
        counter++;
      }
    },
    /**
     *
     * @return {ConditionResult}
     */
    check() {
      if (counter !== number) {
        /**
         * @type {ConditionResult}
         */
        return {
          done: false,
          error: new ValidationError(validationAttributes.name, `{{attribute}} should contain at least ${number} chars of ${chars}`)
        };
      } else {
        return {done: true, error: null};
      }
    }
  };
}

/**
 *
 * @param {Number} number
 * @param {Object} validationAttributes
 * @return {StepCondition}
 */
function condHasNumberLatinChars(number, validationAttributes = {name: 'Value'}) {
  let counter = 0;
  /**
   * @type {StepCondition}
   */
  return {
    /**
     *
     * @param char
     */
    step(char) {
      if (char.match(/[a-zA-Z]/)) {
        counter++;
      }
    },
    /**
     *
     * @return {ConditionResult}
     */
    check() {
      if (counter < number) {
        return {
          done: false,
          error: new ValidationError(validationAttributes.name, `{{attribute}} should contain at least ${number} of latin chars`)
        };
      } else {
        return {done: true, error: null};
      }
    }
  };
}

/**
 *
 * @param {Function} cb
 */
export const loadGoogleAPI = (cb) => {
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/platform.js';
  // noinspection SpellCheckingInspection
  script.onload = () => {
    // noinspection ES6ModulesDependencies
    gapi.load('auth2', cb);
  };
  document.body.appendChild(script);
};

/**
 *
 * @param {Function} cb
 * @param {Function} onError
 */
export const initGoogleAPI = (cb, onError = e => console.error(e)) => {
  gapi.auth2.init({
    client_id: CLIENT_ID,
    scope: 'profile email'
  })
    .then(cb)
    .catch(onError);
};

// noinspection SpellCheckingInspection
export const CLIENT_ID = '777688038969-dgf86lie7v6pkq4qr3p5rscd1atfu9cg.apps.googleusercontent.com';

export const getComponent = (name) => $(`[data-component=${name}]`);
export const errorHandler = (context, error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    context.commit('setErrors', error.response.data.errors);
    Promise.reject(error.response.data.errors);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    Promise.reject(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    context.commit('setErrors', [error]);
    console.log('Error', error.message);
    Promise.reject(error.message);
  }
  console.log(error.config);
  Promise.reject(error.config);
};
// TODO: Create condOnlyLatinChars to require user to use only Latin characters in their passwords
