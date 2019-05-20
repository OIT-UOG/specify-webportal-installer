<template>
  <section id="imglist_container">
    <div class="container-fluid">
      <div class="imglist">
        <a href="#">
          <ImageItem
            v-for="img in images"
            v-bind:key="img.filename"
            v-bind:source="imageUrl(img.collection, img.filename)"
            v-bind:height="200"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ImageItem from './ImageItem'

export default {
  name: 'ImageList',
  components: {
    ImageItem
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['imageUrl', 'images'])
  }
}
</script>

<style>

</style>
