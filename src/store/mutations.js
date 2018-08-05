import {parseJwt} from '../lib/utils';
import {api} from '../api';

export const addBookmark = (state, bookmark)  => {
  state.bookmarks = state.bookmarks.concat(bookmark);
};

export const removeBookmark = (state, id) => {
  state.bookmarks = state.bookmarks.filter(b => b.id !== id);
};

export const setBookmark = (state, bookmark) => {
  const index = state.bookmarks.findIndex(b => b.id === bookmark.id);
  //if found
  if (~index) {
    state.bookmarks.splice(index, 1, bookmark);
  } else {
    addBookmark(state, bookmark);
  }
};

export const setBookmarks = (state, bookmarks) => {
  state.bookmarks = bookmarks;
};

export const setErrors = (state, errors) => {
  state.errors = errors;
};

export const setUser = (state, user) => {
  state.user = user;
  localStorage.setItem('user', user);
};
export const setToken = (state, token) => {
  state.token = token;
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    state.parsedToken = parseJwt(token);
  } else {
    state.parsedToken = null;
  }
};
