<template>
  <Page>
    <div class="container">
      <h1>Create new bookmark</h1>
      <EditForm @submit="saveBookmark" :initial-bookmark="bookmark"></EditForm>
    </div>
  </Page>
</template>

<script>
  import Page from './Page';
  import EditForm from './EditForm';
  export default {
    name: 'EditPage',
    components: {Page, EditForm},
    methods: {
      saveBookmark({title, url}) {
        this.$store.dispatch('updateBookmark', {title, url, id: this.$route.params.id})
          .then(() => {
            alert('Bookmark updated!');
            this.$router.push('/');
          })
      }
    },
    data() {
      return {
        bookmark: {
          title: '',
          url: ''
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        const bookmark = vm.$store.getters.bookmarks.find(b => b.id === +to.params.id);
        console.log(vm.bookmark);
        if (!bookmark) {
          vm.bookmark.title = '';
          vm.bookmark.url = '';
          next('/not-found');
        } else {
          vm.bookmark.title = bookmark.title;
          vm.bookmark.url = bookmark.url;
          // vm.setBookmark(bookmark);
          next();
        }
      })
    }
  };
</script>

<style scoped>

</style>
