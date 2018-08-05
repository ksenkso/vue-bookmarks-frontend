import Vue from 'vue';
import {api} from '../api';
import {errorHandler} from '../lib/utils';
export const logout = async (context) => {
  if (context.state.user.oauth_provider === 'Google') {
    await Vue.$logoutFromGoogle();
  }
  context.commit('setUser', null);
  context.commit('setToken', null);

};
export const login = (context, {email, password, token}) => {
  return new Promise((resolve, reject) => {
    let data = {};
    if (token && !email && !password) {
      data = {token};
    } else if (email && password) {
      data = {email, password};
    }
    api.post('users/login', data)
      .then(response => {
        const {token, user} = response.data;
        context.commit('setUser', user);
        context.commit('setToken', token);
        resolve(user);
      })
      .catch(error => errorHandler(context, error));
  });
};

export const getBookmarks = (context) => {
  return api.get('bookmarks')
    .then(response => {
      context.commit('setBookmarks', response.data.bookmarks);
    })
    .catch(error => errorHandler(context, error));
};
export const createBookmark = (context, bookmark) => {
    return api.post('bookmarks', bookmark)
      .then(r => r.data)
      .catch(e => errorHandler(context, e));
};

export const updateBookmark = (context, bookmark) => {
    return api.put('bookmarks/' + bookmark.id, bookmark)
      .then(r => r.data)
      .catch(e => errorHandler(context, e));
};

export const deleteBookmark = (context, id) => {
    return api.delete('bookmarks/' + id)
      .then(r => r.data)
      .catch(e => errorHandler(context, e));
};
