<template>
    <Page>
      <div class="container">
        <h1>Page you are looking not found. We are sorry.</h1>
        <h2 ref="message" class="text-center">Whoa, WHAT'S THIS?! WATCH YA BACK!</h2>
      </div>
    </Page>
</template>

<script>
  import Page from './Page';
  import {loadGSAP, wait} from '../lib/utils';

  export default {
    name: 'NotFoundPage',
    components: {Page},
    created() {
      //Wait for 2 seconds, and if GSAP is not loaded yet,
      // wait for it and then start the animation
      Promise.all([
        loadGSAP(),
        wait(2000)
      ]).then(() => {
        const tl = new TimelineLite({onComplete: () => this.$router.push('/')});
        tl
          .to(this.$refs.message, 1, {fontSize: '150%'});
      })
    }
  };
</script>

<style scoped>

</style>
