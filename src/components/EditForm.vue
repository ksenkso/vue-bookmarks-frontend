<template>
  <form class="form" action="#" @submit.prevent="submitForm">
    <div class="form-group">
      <label for="title">Title</label>
      <input class="form-control" type="text" name="title" id="title" v-model="bookmark.title">
    </div>
    <div class="form-group">
      <label for="url">URL</label>
      <input class="form-control" type="url" name="url" id="url" v-model="bookmark.url">
    </div>
    <!--<img :src="image" alt="Bookmark image">-->
    <div class="form-group">
      <button type="submit" class="btn btn-success">Save</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'EditForm',
    props: {
      initialBookmark: {
        required: false,
        type: Object,
        default: {
          title: '',
          url: ''
        }
      }
    },
    data() {
      return {
        bookmark: this.initialBookmark
      }
    },
    methods: {
      submitForm() {
        // TODO: Check for validity
        this.$emit('submit', this.bookmark);
      }
    }
  };
</script>

<style scoped>

</style>
