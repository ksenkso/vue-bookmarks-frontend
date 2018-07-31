export default {
  install(Vue, options) {
    const plugin = this;

    Vue.isGAPILoaded = false;
    Vue.__gapiCalls = [];
    this.loadApi()
      .then(() => this.initAuth(options.client_id))
      .then(() => {
        console.log('Google API initialized');
        Vue.isGAPILoaded = true;
        if (Vue.__gapiCalls.length) {
          Vue.__gapiCalls.forEach(call => call());
          Vue.__gapiCalls = [];
        }
      });
    Vue.prototype.$renderSignInButton = function(options) {
      plugin.makeGAPICall(Vue, plugin.$_renderSignInButton.bind(null, options))
    };
    Vue.prototype.$logoutFromGoogle = function() {
      return plugin.makeGAPICall(Vue, plugin.$_logoutFromGoogle.bind(null, this.apiClient))
    };
  },
  makeGAPICall(Vue, call) {
    if (Vue.isGAPILoaded) {
      return call();
    } else {
      Vue.__gapiCalls.push(call);
      return Vue.__gapiCalls;
    }
  },
  $_renderSignInButton(options) {
    const opts = Object.assign({}, {
      scope: 'profile email',
      longtitle: true
    }, options);
    gapi.signin2.render(options.id, opts);
  },
  $_logoutFromGoogle(apiClient) {
    apiClient.jwt = null;
    apiClient.user = null;
    return gapi.auth2.getAuthInstance().signOut();
  },
  loadApi() {
    return new Promise((res, rej) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      // noinspection SpellCheckingInspection
      script.onload = () => {
        // noinspection ES6ModulesDependencies
        gapi.load('auth2', res);
      };
      script.onerror = rej;
      document.body.appendChild(script);
    });
  },
  initAuth(client_id) {
    return gapi.auth2.init({
      client_id,
      scope: 'profile email'
    });
  }
};
