<template>
    <header class="header">
      <div class="container">
        <div class="row justify-content-between">
          <div class="logo">BookmarkApp</div>
          <LogoutButton></LogoutButton>
        </div>
      </div>
    </header>
</template>

<script>
  import LogoutButton from './LogoutButton';
  export default {
    name: 'Header',
    components: {LogoutButton}
  };
</script>

<style scoped lang="sass">
.header
  height: 48px
  background-color: #2874b4
  display: flex
  margin-bottom: 24px
  .row
    padding: 5px 0

.logo
  font-size: 24px
  font-weight: bold
  color: #f3feff
</style>
