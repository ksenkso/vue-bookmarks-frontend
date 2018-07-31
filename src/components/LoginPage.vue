<template>
  <div class="login">
    <form @submit.prevent="logIn" action="#" class="login__form form">
      <div class="form__field">
        <label class="form__label" for="inp_email">Email</label>
        <input type="email" name="email" id="inp_email" class="form__input" placeholder="email@domain.com" required>
      </div>
      <div class="form__field">
        <label class="form__label" for="inp_password">Password</label>
        <input type="password" name="password" id="inp_password" class="form__input" placeholder="Your password"
               required>
      </div>
      <div class="form__buttons">
        <button type="submit" class="button button_success button_login">Войти</button>
        <div id="signIn"></div>
      </div>
    </form>
    <ul class="errors"></ul>
  </div>
</template>

<script>

  export default {
    name: 'LoginPage',
    inject: ['apiClient'],
    methods: {
      logIn() {

      },
      async loginWithGoogle(googleUser) {
        const id_token = googleUser.getAuthResponse().id_token;
        // Clear the errors list
        //errors.innerHTML = '';
        try {
          await this.apiClient.login(id_token);
          this.$router.push('/');
        } catch (e) {
          console.error(e);
        }
      },
      handleGoogleLoginFail(err) {

      }
    },
    created() {
      this.$nextTick(() => {
        this.$renderSignInButton({
          id: 'signIn',
          onsuccess: this.loginWithGoogle.bind(this),
          onerror: this.handleGoogleLoginFail.bind(this)
        });
      })
    }
  };
</script>

<style lang="sass">
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
