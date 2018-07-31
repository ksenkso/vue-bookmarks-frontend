<template>
  <div class="page">
    <header>
      <LogoutButton></LogoutButton>
    </header>
    <div class="loader" v-if="isLoading">Loading...</div>
    <div class="errors" v-if="errors.length">
      <div class="error" v-for="error in errors">
        {{error}}
      </div>
    </div>
    <div class="bookmarks" v-if="bookmarks.length && !isLoading">
      <Bookmark v-for="bookmark in bookmarks" :bookmark="bookmark" :key="bookmark.id"></Bookmark>
    </div>
  </div>
</template>

<script>
  import LogoutButton from './LogoutButton';
  import Bookmark from './Bookmark';
  export default {
    name: 'IndexPage',
    inject: ['apiClient'],
    components: {LogoutButton, Bookmark},
    methods: {
      fetchBookmarks() {
        this.isLoading = true;
        this.apiClient
          .getBookmarks()
          .then(bookmarks => {
            this.bookmarks = bookmarks;
            this.isLoading = false;
          })
          .catch(error => {
            if (error.errors) {
              this.errors = error.errors;
            }
          })
      },
      editBookmark(id) {
        this.$router.push({path: '/edit', params: {id}});
      },
      deleteBookmark(id) {
        const shouldProceed = confirm('Do You really want to delete this bookmark?');
        if (shouldProceed) {
          this.apiClient.deleteBookmark(id)
            .then(() => this.bookmarks = this.bookmarks.filter(b => b.id !== id))
            .catch(error => this.errors = this.errors.concat(error.errors));
        }
      }
    },
    created() {
      this.fetchBookmarks()
    },
    data() {
      return {
        bookmarks: [],
        isLoading: true,
        errors: []
      }
    }
  };
</script>

<style scoped lang="sass">

</style>
