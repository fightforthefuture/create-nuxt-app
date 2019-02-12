<template>
  <div>
    <div v-if="selfies && selfies.data.length === 0">
      <h4 class="text-center sml-push-y2 med-push-y4">
        Sorry, we didn&rsquo;t find any selfies that match your search
      </h4>
    </div>
    <div v-if="selfies">
      <div class="row sml-push-y1 med-push-y2">
        <div v-for="(selfie, index) in selfies.data"
             :key="selfie.photo"
             class="sml-c6 med-c3 lrg-c2 sml-push-y2">
          <div class="selfie-wrapper is-trigger"
               :class="{'has-quote': selfie.comment}"
               @click="openSelfieModal(selfie)">
            <img :src="selfie.photo" :alt="`Selfie ${index}`" />
          </div> <!-- .selfie-wrapper -->
        </div> <!-- v-for -->
      </div> <!-- .row -->

      <div class="sml-push-y2 text-center">
        <a v-if="!isEndOfFeed" @click="loadMore" class="btn">Load More</a>
        <p v-else class="text-brand-light">
          You&rsquo;ve reached the end of the feed, but there are still millions
          more people fighting for Net Neutrality across the country.
        </p>
      </div> <!-- .push -->
    </div> <!-- v-if -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['selfies', 'selfiesCurPageNum']),

    isEndOfFeed() {
      if (this.$store.state.selfies) {
        return this.selfiesCurPageNum >= this.$store.state.selfies.pages.page_count
      } else {
        return null
      }
    }
  },

  mounted() {
    // NOTE: selfies are fetched in the `PageHeader`

    // `window` is not availabled in `created` lifecycle hook
    window.addEventListener('scroll', () => {
      this.bottomVisible()
    })
  },

  methods: {
    ...mapActions([ 'openSelfieModal' ]),

    loadMore() {
      if (!this.isEndOfFeed) {
        this.$store.commit('setSelfiesCurPageNum', this.selfiesCurPageNum + 1)
        this.$store.dispatch('getSelfies', { page: this.selfiesCurPageNum })
      }
    },

    bottomVisible() {
      const doc = document.documentElement
      let isBottomOfPage = doc.clientHeight + window.scrollY >= doc.scrollHeight
      if (isBottomOfPage) {
        this.loadMore()
      }
    }
  }
}
</script>
