import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    bookmarks: [],
    errors: [],
    user: null,
    token: null,
    parsedToken: null
  },
  actions,
  mutations,
  getters: {
    bookmarks: state => state.bookmarks,
    errors: state => state.errors,
    user: state => state.user,
    token: state => state.token,
    isAuthenticated: state => state.token && (state.parsedToken.exp > +new Date()/1000|0)
  }
});
export default store;
