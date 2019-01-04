<template>
  <div>
    <h2>Print the Letter</h2>
    <p class="sml-push-y2 med-push-y3">
      Select your state below to print out the letter.
    </p>
    <div class="flex-grid sml-flex-col med-flex-row sml-push-y3">
      <select v-model="selectedState" class="sml-flex-2">
        <option :value="null">
          Select your state
        </option>
        <option v-for="(name, abbr) in states" :key="abbr" :value="abbr">
          {{ name }}
        </option>
      </select>
      <button class="btn sml-push-y1 med-push-y0" @click.prevent="printLetter()"
              :disabled="!selectedState">
        Print the Letter
      </button>
    </div> <!-- .flex-grid -->
  </div>
</template>

<script>
import { geocodeState } from '~/assets/js/helpers'
import US_STATES from '~/assets/data/states.json'

export default {
  data() {
    return {
      selectedState: null
    }
  },

  computed: {
    states() { return US_STATES }
  },

  async created() {
    // Try to pre-select US state based on IP address
    try {
      const state = await geocodeState()
      this.selectedState = state.abbr
    } catch (error) {
      console.error('Geocoder error', error)
    }
  },

  methods: {
    printLetter() {
      this.$trackEvent('print_letter_button', 'click')
      // TODO: generate PDFs for the current campaign
      window.open(`/pdfs/${this.selectedState.toLowerCase()}.pdf`, '_blank')
    }
  }
}
</script>
