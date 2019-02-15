<template>
  <div class="page">
    <Header></Header>

    <slot></slot>
  </div>

</template>

<script>
  import Header from './Header';
  export default {
    name: 'Page',
    components: {Header}
  };
</script>

<style scoped>

</style>
