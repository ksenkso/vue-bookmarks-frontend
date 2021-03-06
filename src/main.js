import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import GoogleAuthPlugin from './plugins/GoogleAuthPlugin';
import ApiClient from './classes/ApiClient';
import routes from './routes';
import store from './store/index';

Vue.filter('apiUrl', value => {
  return ApiClient.BACKEND_BASE + value;
});
Vue.filter('date', value => {
  const date = new Date(value);
  const formatter = new Intl.DateTimeFormat('en-US');
  return formatter.format(date);
});

Vue.config.productionTip = false;

const apiClient = new ApiClient();

Vue.use(VueRouter);


const client_id = '777688038969-dgf86lie7v6pkq4qr3p5rscd1atfu9cg.apps.googleusercontent.com';
Vue.use(GoogleAuthPlugin, {client_id});

const router = new VueRouter({routes});
router.beforeEach((to, from, next) => {
  console.log(to);

  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      console.log('jwt down');
      next({path: '/login'});
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  render: h => h(App),
  provide: () => ({
    apiClient
  }),
  data() {
    return {
      apiClient
    };
  },
}).$mount('#app');
