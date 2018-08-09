<template>
  <button class="btn btn-primary" @click="logout">Logout</button>
</template>

<script>
export default {
  name: 'LogoutButton',
  // This component needs the ApiClient instance to be able to call
  // `$logoutFromGoogle` method
  inject: ['apiClient'],
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      // await this.$logoutFromGoogle();
      this.$router.push('/login');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
