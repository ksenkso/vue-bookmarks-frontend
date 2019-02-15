<template>
  <Page>
    <div class="container">
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
      <div class="alert" v-if="!bookmarks.length && !isLoading">
        You do not have any bookmarks. Try to create one!
      </div>
      <div class="text-center">
        <router-link class="btn btn-primary btn-lg" to="/create">Create</router-link>
      </div>
    </div>
  </Page>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Header from './Header';
  import Bookmark from './Bookmark';
  import Page from './Page';
  import {loadGSAP} from '../lib/utils';

  export default {
    name: 'IndexPage',
    components: {Header, Bookmark, Page},
    methods: {
      fetchBookmarks() {
        this.isLoading = true;
        this.$store.dispatch('getBookmarks')
          .then(() => this.isLoading = false)
          .catch(() => this.isLoading = false);
      },
      deleteBookmark(id) {
        this.$store.commit('removeBookmark', id);
      }
    },
    created() {
      this.fetchBookmarks();
      loadGSAP()
    },
    data() {
      return {
        isLoading: true,
        errors: []
      };
    },
    computed: {
      ...mapGetters(['bookmarks'])
    }
  };
</script>

<style lang="sass">
  .bookmarks
    max-width: 100%
    overflow-x: hidden
</style>
