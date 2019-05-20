// https://css-tricks.com/lazy-loading-images-with-vue-js-directives-and-intersection-observer/

<template>
  <figure v-lazyload class="image__wrapper">
    <img
      class="image__item"
      :data-url="source"
      :style="style"
      alt="alt"
    >
  </figure>
</template>

<script>
export default {
  name: "ImageItem",
  props: {
    source: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    alt: {
      type: String,
      required: false
    }
  },
  computed: {
    style () {
      return `height: ${ this.height }`
    }
  }
}
</script>

<style>
  img {

  }
</style>

