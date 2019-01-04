<template>
  <div class="text-center">
    <h2 class="text-success sml-push-y2 med-push-y3">
      Thanks for sending a photo!
    </h2>

    <div class="row">
      <div class="sml-c12 med-c7 lrg-c6 grid-center">
        <div class="sml-push-y2 med-push-y3 sml-pad-2 fill-grey is-rounded-top">
          <img :src="photoSource" alt="A photo of you!"/>
        </div> <!-- .fill -->
        <div class="sml-pad-2 fill-grey-dark is-rounded-bottom">
          <a class="btn btn-block" :href="selfie.photo" target="_blank"
             @click="$trackClick('download_selfie')">
            Download
          </a>

          <SocialShareButtons class="sml-push-y2" :url="shareURL"/>
        </div> <!-- .fill -->
      </div> <!-- .c -->
    </div> <!-- .row -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SocialShareButtons from '~/components/SocialShareButtons'

export default {
  components: {
    SocialShareButtons
  },

  computed: {
    ...mapState([ 'photoSource', 'selfie' ]),

    shareURL() {
      // TODO: genericize URL or change per project
      return `https://deadline.fftf.xyz/share/${this.selfie.id}`
    }
  }
}
</script>
