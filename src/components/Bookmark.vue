<template>
  <div ref="el" class="bookmark" :class="bookmarkClass">
    <div class="bookmark__background" :class="backgroundClass" :style="{backgroundColor: bookmark.background}">
        <img
          class="bookmark__image"
          :src="bookmark.img | apiUrl"
          :alt="bookmark.title"
        >
      </div>
    <a target="_blank" :href="bookmark.url" class="bookmark__link">
      <h1 class="bookmark__title">{{bookmark.title}}</h1>
      <span class="bookmark__url">{{bookmark.url}}</span>
    </a>
    <div class="bookmark__buttons">
      <button @click="editBookmark" type="button" class="bookmark__edit icon icon-edit">Edit</button>
      <button @click="deleteBookmark" type="button" class="bookmark__delete icon icon-delete">Delete</button>
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
      },
      bookmarkClass() {
        let className = [];
        if (this.isDisabled) className.push('bookmark_disabled');
        if (this.isHidden) className.push('bookmark_hidden');
        return className.join(' ').trim();
      }
    },
    data() {
      return {
        isDisabled: false,
        isHidden: false
      }
    },
    methods: {
      editBookmark() {

      },
      deleteBookmark() {
        const shouldDelete = confirm('Do you really want to delete this bookmark?');
        if (shouldDelete) {
          this.isDisabled = true;
          this.apiClient.deleteBookmark(this.bookmark.id)
            .then(this.remove)
            .then(() => {
              this.$emit('deleted')
            })
        }
      },
      remove() {
        this.isDisabled = true;
        return new Promise((resolve) => {
          const rect = this.$refs.el.getBoundingClientRect();
          const resultWidth = rect.right + rect.width;
          console.log(resultWidth);
          const tl = new TimelineLite();
          tl
            .to(this.$refs.el, .5, {
              left: resultWidth,
              ease: Power2.easeInOut
            })
            .to(this.$refs.el, .5, {
              height: 0,
              ease: Power2.easeInOut,
              onComplete: resolve
            }, 0.2)
          /*const tl = TweenLite
            .to(this.$refs.el, .2, {
              left: resultWidth,
              ease: Power0.easeInOut,
            });*/
          // setTimeout(resolve, 40000);
        });
      },
    }
  };
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css?family=Fira+Sans|PT+Sans:700&subset=cyrillic')
@keyframes fade-in
  0%
    opacity: 0
  100%
    opacity: 1
.bookmark
  position: relative
  max-width: 512px
  height: 268px
  margin: 0 auto 16px
  border-radius: 3px
  overflow: hidden
  /*transition: height .2s ease-in-out, margin .2s ease-in-out*/
  box-shadow: 0 0 6.09px 0.91px rgba(0, 0, 0, 0.13)
  /* Fix this*/
  font-family: 'Fira Sans', sans-serif
  &_hidden
    height: 0
    margin-bottom: 0
  &_disabled
    &:after
      content: ''
      display: block
      width: 100%
      height: 100%
      position: absolute
      top: 0
      left: 0
      background-color: rgba(255, 255, 255, .7)
      animation: fade-in .1s forwards
  &__url
    color: #fff
    font-size: 18px
    margin-bottom: 4px
    padding: 4px 12px
    background-color: rgba(44, 44, 44, 0.5)
    border-radius: 15px
    text-align: center
  &__link
    display: flex
    flex-direction: column
    justify-content: space-between
    height: 100%
    padding: 16px
    text-decoration: none
    color: #fff
  &__title
    font-size: 2em
    margin-top: 14px
    font-weight: bold
    font-family: 'PT Sans', sans-serif
  &__buttons
    position: absolute
    top: 38px
    right: 23px
    width: 80px
    display: flex
    justify-content: space-between
    button
      background-color: rgba(0, 0, 0, 0)
      background-repeat: no-repeat
      background-size: 24px
      background-position: center
      font-size: 0
      width: 32px
      height: 32px
      border-radius: 50%
      /* Fix this to use proper animation (Google-like) */
      transition: background-color .1s ease-in-out
      &:active
        background-color: rgba(0, 0, 0, .3)

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
    &:after
      content: ''
      display: block
      position: absolute
      background-image: linear-gradient(rgba(0, 0, 0, .45), rgba(0, 0, 0, .45))
      width: 100%
      height: 100%
      top: 0
      left: 0
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
