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
      <Bookmark
        v-for="bookmark in bookmarks"
        :bookmark="bookmark"
        :key="bookmark.id"
        @deleted="deleteBookmark(bookmark.id)"
      ></Bookmark>
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
      deleteBookmark(id) {
        this.bookmarks = this.bookmarks.filter(b => b.id !== id);
      },
      addTweenScript() {
        const tweenLite = document.createElement('script');
        tweenLite.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenLite.min.js';
        document.head.appendChild(tweenLite);
        const tl = document.createElement('script');
        tl.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TimelineLite.min.js';
        document.head.appendChild(tl);
        const cssPlugin = document.createElement('script');
        cssPlugin.src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/plugins/CSSPlugin.min.js"
        document.head.appendChild(cssPlugin);
      }
    },
    created() {
      this.fetchBookmarks();
      this.addTweenScript();
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

<style lang="sass">
body
  /*background-image: repeating-linear-gradient(#ffa682, #ffa682 8px, transparent 8px, transparent 16px)*/
.bookmarks
  max-width: 100%
  overflow-x: hidden
</style>
