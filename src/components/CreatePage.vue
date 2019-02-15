<template>
  <Page>
    <div class="container">
      <h1>Create new bookmark</h1>
      <EditForm @submit="submitForm"></EditForm>
    </div>
  </Page>

</template>

<script>
  import Page from './Page';
  import EditForm from './EditForm';
  export default {
    name: 'CreatePage',
    components: {Page, EditForm},
    data() {
      return {
        bookmark: {
          title: '',
          url: ''
        }
      }
    },
    methods: {
      submitForm(bookmark) {
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
