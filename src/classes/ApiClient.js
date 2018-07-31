import Users from '../endpoints/Users';
import Bookmarks from '../endpoints/Bookmarks';
import {parseJwt} from '../lib/utils';
import EventEmitter from './EventEmitter';
import ResponseError from './ResponseError';

export default class ApiClient extends EventEmitter {
  // noinspection JSUnresolvedVariable
  static API_BASE = process.env.VUE_APP_API_BASE;
  static BACKEND_BASE = process.env.VUE_APP_BACKEND_BASE;

  constructor() {
    super();
    this._jwt = null;
    this._user = null;
  }

  //region props
  get jwt() {
    return this._jwt;
  }

  set jwt(value) {
    this._jwt = value;

    if (value) {
      localStorage.setItem('jwt', value);
      this.parsedJWT = parseJwt(value);
    } else {
      localStorage.removeItem('jwt');
      this.parsedJWT = {};
    }
  }

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
    localStorage.setItem('user', JSON.stringify(value));
  }


  //endregion

  //region methods
  /**
   * @return {Boolean}
   */
  restoreFromStorage() {
    let jwtLoaded = false;
    let userLoaded = false;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.jwt = jwt;
      if (this.jwtAlive()) {
        jwtLoaded = true;
      } else {
        this.jwt = null;
      }
    }
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      userLoaded = true;
    }
    return userLoaded && jwtLoaded;
  }

  jwtAlive() {
    if (this.jwt && this.parsedJWT) {
      const exp = this.parsedJWT.exp;
      return exp > (Date.now() / 1000 | 0);
    }
    return false;
  }

  /**
   *
   * @param email
   * @param [password]
   * @return {Promise<Object>}
   */
  async login(email, password) {
    let data;
    if (password === undefined) {
      data = {token: email};
    } else {
      data = {email, password};
    }
    const {token, user} = await this.makeRequest(Users.login, data);
    this.jwt = token;
    this.user = user;
    return {token, user};
  }

  logout() {
    this.jwt = null;
  }

  /**
   *
   * @param endpoint
   * @param data
   * @param opts
   * @return {Promise<*>}
   */
  makeRequest(endpoint, data = null, opts = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwt
    };
    const options = Object.assign(
      {headers},
      endpoint.defaults,
      opts,
    );
    if (data) {
      options.body = JSON.stringify(data);
    }
    return fetch(ApiClient.API_BASE + endpoint.url, options)
      .then(r => r.json())
      .then(json => {
        if (json.success) {
          delete json.success;
          return json;
        } else {
          throw new ResponseError(`Some errors occurred during the request: ${endpoint.url}`, json.errors);
        }
      })
  }

  //endregion

  //region routes
  /**
   *
   * @return {Promise<Object[]>}
   */
  getBookmarks() {
    return this.makeRequest(Bookmarks.all)
      .then(/** @param {{bookmarks: Object[]}} r */r => r.bookmarks);
  }

  /**
   *
   * @param {Number} id
   * @return {Promise<*>}
   */
  deleteBookmark(id) {
    return this.makeRequest(Bookmarks.delete(id))
      .then(r => r.done);
  }

  /**
   *
   * @return {Promise<Object>}
   */
  getUser() {
    return this.makeRequest(Users.me)
      .then/** @param {{user: Object}} r */(r => r.user);
  }

  //endregion

}
