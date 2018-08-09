<template>
  <div class="page">
    <Header></Header>
    <div class="container">
      <h1>Create new bookmark</h1>
      <form class="form" action="#" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Title</label>
          <input class="form-control" type="text" name="title" id="title" v-model="title">
        </div>
        <div class="form-group">
          <label for="url">URL</label>
          <input class="form-control" type="url" name="url" id="url" v-model="url">
        </div>
        <img :src="image" alt="Bookmark image">
        <div class="form-group">
          <button type="submit" class="btn btn-success">Save</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
  import Header from './Header';
  export default {
    name: 'CreatePage',
    components: {Header},
    data() {
      return {
        title: '',
        url: '',
        image: ''
      }
    },
    methods: {
      submitForm() {
        const bookmark = {
          title: this.title,
          url: this.url
        };
        this.$store.dispatch('createBookmark', bookmark)
          .then(() => {
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
