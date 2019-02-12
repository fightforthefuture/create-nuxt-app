<template>
  <div>
    <h2>
      <span class="text-success">Thanks!</span> Can you call?
    </h2>
    <p class="sml-push-y1">
      We&rsquo;ll provide you with a suggestion of what to say and connect you
      directly with your lawmaker&rsquo;s office.
    </p>
    <p v-if="errorMessage" class="text-warn sml-push-y2">{{ errorMessage }}</p>
    <form @submit.prevent="submitForm()" class="flex-grid sml-flex-row sml-push-y2">
      <input class="phone sml-flex-2" type="tel" placeholder="Phone Number*"
             v-model.trim="phone" required>
      <input class="zip" type="tel" placeholder="ZIP Code*"
             v-model.trim="zipCode" required>
      <button class="btn" :disabled="isSending">
        <span v-if="isSending">...</span>
        <span v-else>Call</span>
      </button>
    </form>
    <p class="sml-push-y1 text-meta">
      <small>
        Your number will only be used for this call and will never be shared
        with third parties.
        <a href="https://www.battleforthenet.com/privacy/" target="_blank">
          Privacy Policy</a>
      </small>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { postFormData } from '~/assets/js/helpers'

export default {
  data() {
    return {
      isSending: false,
      errorMessage: null
    }
  },

  computed: {
    ...mapState(['callpowerCampaignId']),

    phone: {
      get() {
        return this.$store.state.phone
      },
      set(value) {
        this.$store.commit('setPhone', value)
      }
    },

    zipCode: {
      get() {
        return this.$store.state.zipCode
      },
      set(value) {
        this.$store.commit('setZipCode', value)
      }
    }
  },

  methods: {
    async submitForm() {
      this.isSending = true

      try {
        const { data } = await postFormData( // eslint-disable-line no-unused-vars
          'https://call-congress.fightforthefuture.org/create', {
            campaignId: this.callpowerCampaignId,
            userPhone: this.phone,
            userLocation: this.zipCode
          }
        )

        this.isSending = false
        this.$trackEvent('call_form', 'submit')
        // Show call script in modal
        this.$store.commit('setModalType', 'call-script')
      }
      catch (err) {
        this.isSending = false
        this.errorMessage = "Sorry, that didn't work. Please check your info and try again."
      }
    }
  }
}
</script>
