<style lang="scss" scoped>
  .icon-call {
    max-height: $font-size-2*1.2;
  }
  .icon-warning {
    max-height: $base-font-size*$base-line-height;
  }
</style>

<template>
  <div>
    <div class="with-border-bottom">
      <h2>
        <img src="~/assets/images/call-icon.svg" alt="Phone icon"
             class="img-inline icon-call">
        Calling you now&hellip;
      </h2>
      <p class="sml-push-y1">
        <strong>Introduce yourself, be polite, and say:</strong>
      </p>
      <p class="text-meta">{{ callScript }}</p>
      <div class="sml-pad-y2">
        <p>
          <img src="~/assets/images/warning-icon.svg" alt="!"
               class="img-inline icon-warning">
          If lines are busy, we may call you in a few minutes.
        </p>
      </div> <!-- .pad -->
    </div> <!-- .with-border-bottom -->

    <h4 class="sml-push-y2">
      Done calling? Do these things, too!
    </h4>
    <SocialShareButtons class="sml-push-y2"/>
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
    ...mapState(['callScript'])
  }
}
</script>
