<template>
  <GalleryLayout>
    <div class="site-content">
      <section class="sml-pad-y5">
        <div class="wrapper">
          <div class="sml-c12 grid-center text-center">
            <h1>We support Net Neutrality</h1>
            <a href="/" class="btn sml-push-y1 med-push-y2">
              <img src="/photo.svg" class="med-push-y-half"/>Take your photo
            </a>
          </div> <!-- .c -->

          <SelfieGrid />
        </div> <!-- .wrapper -->
      </section>
    </div> <!-- .site-content -->
  </GalleryLayout>
</template>

<script>
import config from '~/config'
import { createMetaTags } from '~/assets/js/helpers'
import GalleryLayout from '~/components/GalleryLayout'
import SelfieGrid from '~/components/SelfieGrid'

export default {
  components: {
    GalleryLayout,
    SelfieGrid
  },

  head() {
    return {
      title: `${config.sharing.title} - Gallery`,
      meta: createMetaTags({
        title: config.sharing.title,
        description: config.sharing.description,
        image: config.sharing.image,
        url: config.sharing.url
      }),
      bodyAttrs: {
        class: 'full-width'
      }
    }
  },

  async created() {
    if (this.$route.query.photo) {
      try {
        // TODO: make a generic endpoint or change per project
        const { data } = await this.$axios.get(`https://data.battleforthenet.com/deadline/selfies/${this.$route.query.photo}.json`)
        this.$store.dispatch('openSelfieModal', data)
      } catch (error) {
        // failed to load photo
      }
    }
  }
}
</script>
