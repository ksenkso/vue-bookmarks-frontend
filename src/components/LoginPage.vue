<template>
  <div class="login">
    <form @submit.prevent="logIn" action="#" class="login__form form">
      <div class="form__field">
        <label class="form__label" for="inp_email">Email</label>
        <input v-model="email" type="email" name="email" id="inp_email" class="form__input" placeholder="email@domain.com" required>
      </div>
      <div class="form__field">
        <label class="form__label" for="inp_password">Password</label>
        <input v-model="password" type="password" name="password" id="inp_password" class="form__input" placeholder="Your password"
               required>
      </div>
      <div class="form__buttons">
        <button type="submit" class="button button_success button_login">Войти</button>
        <div id="signIn"></div>
      </div>
    </form>
    <ul class="errors" v-if="errors && errors.length">
      <li class="error error_red" v-for="error in errors">{{error.message}}</li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mapGetters} from 'vuex';
  export default {
    name: 'LoginPage',
    inject: ['apiClient'],
    methods: {
      async logIn() {
        try {
          const {email, password} = this;
          await this.$store.dispatch('login', {email, password});
          console.log(this.$store.getters.user);
        } catch (e) {
            console.error(e)
        }
      },
      async loginWithGoogle(googleUser) {
        const id_token = googleUser.getAuthResponse().id_token;
        // Clear the errors list
        //errors.innerHTML = '';
        try {
          const user = await this.$store.dispatch('login', {token: id_token});
          console.log(user);
          this.$router.push('/');
        } catch (e) {
          console.error(e);
        }
      },
      handleGoogleLoginFail(err) {
        console.error(err);
      }
    },
    created() {
      this.$nextTick(() => {
        Vue.$renderSignInButton({
          id: 'signIn',
          onsuccess: this.loginWithGoogle.bind(this),
          onerror: this.handleGoogleLoginFail.bind(this)
        });
      })
    },
    data() {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters(['errors'])
    }
  };
</script>

<style lang="sass">
  .errors
    max-width: 466px
    margin: 24px auto 0
    .error
      padding: 8px
      border-radius: 3px
      margin-bottom: 8px
      &:last-child
        margin-bottom: 0
      &_red
        background-color: #f8d7da
        color: #000
  .login
    margin-top: 180px
    .form
      margin: 0 auto
      max-width: 466px
      padding: 32px
      border: 1px solid #eef
      border-radius: 3px
      &__field
        max-width: 100%
        margin-bottom: 16px
      &__label
        display: block
        margin-bottom: 8px
      &__input
        font-size: inherit
        max-width: 100%
        display: block
        width: 100%
        padding: 5px
        border: 1px solid #eeeeee
        border-radius: 3px
      &__buttons
        display: grid
        grid-template-columns: 180px 180px
        justify-content: space-between
</style>
