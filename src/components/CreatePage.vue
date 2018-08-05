<template>
  <form action="#" @submit.prevent="submitForm">
    <div class="form__group">
      <label for="name">Name</label>
      <input class="form__input" type="text" name="name" id="name" v-model="name">
    </div>
    <div class="form__group">
      <label for="url">URL</label>
      <input class="form__input" type="url" name="url" id="url" v-model="url">
    </div>
    <img :src="image" alt="Bookmark image">
    <button type="submit" class="button">Save</button>
  </form>
</template>

<script>
  export default {
    name: 'CreatePage',
    data() {
      return {
        name: '',
        url: '',
        image: ''
      }
    },
    methods: {
      submitForm() {
        const bookmark = {
          name: this.name,
          url: this.url
        };
        this.$store.dispatch('createBookmark', bookmark)
          .then(bookmark => {
            this.$router.push('/');
          })
      }
    }
  };
</script>

<style scoped lang="sass">

img
  &:empty
    display: none
</style>
