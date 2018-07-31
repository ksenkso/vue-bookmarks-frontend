<template>
  <div class="bookmark">
    <a :href="bookmark.url" class="bookmark__link">
      <h1 class="bookmark__title">{{bookmark.name}}</h1>
      <span class="bookmark__background" :class="backgroundClass" :style="{backgroundColor: bookmark.background}">
            <img
              class="bookmark__image"
              :src="bookmark.img | apiUrl"
              :alt="bookmark.name"
            >
          </span>
    </a>
    <div class="bookmark__updated">Upd: {{bookmark.updatedAt|date}}</div>
    <div class="bookmark__buttons">
      <button @click="editBookmark" type="button" class="btn btn-sm btn-primary">Edit</button>
      <button @click="deleteBookmark" type="button" class="btn btn-sm btn-danger">Delete</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Bookmark',
    props: ['bookmark'],
    inject: ['apiClient'],
    computed: {
      backgroundClass() {
        return this.bookmark.imageType === 'ICO' ? 'bookmark__background_ico' : 'bookmark__background_splash';
      }
    },
    methods: {
      editBookmark() {

      },
      deleteBookmark() {

      }
    }
  };
</script>

<style scoped lang="sass">
.bookmark
  max-width: 512px
  height: 268px
  margin: 0 auto 16px
  border: 1px solid #efefef
  border-radius: 3px
  overflow: hidden
  /* Fix this*/
  font-family: 'Helvetica Neue', 'Helvetica', Tahoma, Arial, sans-serif
  &__link
    text-decoration: none
    color: #fff
    position: relative
    display: block
    height: 100%
    padding: 16px
  &__title
    font-size: 2em
    margin-bottom: 1rem
    font-weight: bold
  &__background
    width: 100%
    height: 100%
    max-height: 100%
    display: block
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: -1
    background-image: linear-gradient(rgba(0, 0, 0, .45), rgba(0, 0, 0, .45))
    &_splash
      .bookmark__image
        width: 100%
        height: 100%
        object-fit: cover
        object-position: center
    &_ico
      .bookmark__image
        width: 48px
        height: 48px
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        position: absolute
  &__image
    display: block



</style>
