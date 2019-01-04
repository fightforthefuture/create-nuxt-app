<template>
  <div>
    <div class="text-center sml-push-y2 med-push-y3">
      <div v-if="hasSigned">
        <p>
          Thanks for signing the petition! Please consider sharing with your
          friends and family.
        </p>
        <div class="row sml-push-y2 med-push-y3">
          <div class="sml-c12 lrg-c4">
            <ShareButton
              network="twitter"
              class="btn-block"
              @click.native="$trackClick('twitter_share_button_success')">
              <span>Tweet</span>
            </ShareButton>
          </div> <!-- .c -->
          <div class="sml-c12 lrg-c4 sml-push-y1 lrg-push-y0">
            <ShareButton
              network="facebook"
              class="btn-block"
              @click.native="$trackClick('facebook_share_button_sucess')">
              <span>Share</span>
            </ShareButton>
          </div> <!-- .c -->
          <div class="sml-c12 lrg-c4 sml-push-y1 lrg-push-y0">
            <a :href="donateUrl"
               class="btn btn-block"
               @click="$trackClick('donate_button_success')">
              Donate
            </a>
          </div> <!-- .c -->
        </div> <!-- .row -->
      </div>
      <p v-else>
        Enter your information below to sign the petition.
      </p>
    </div> <!-- .push -->
    <form v-if="!hasSigned" class="sml-push-y2 med-push-y3"
          @submit.prevent="submitForm()">
      <p v-if="errorMessage" class="text-warn">
        {{ errorMessage }}
      </p>
      <div class="flex-grid sml-flex-row">
        <input v-model="name" type="text" placeholder="Name*" required>
        <input v-model="email" type="email" placeholder="Email*" required>
      </div> <!-- .flex-grid -->
      <div class="flex-grid sml-flex-row sml-push-y1">
        <input v-model="address" type="text" placeholder="Address"
               class="sml-flex-4">
        <input v-model="zipCode" type="tel" placeholder="ZIP Code">
      </div> <!-- .flex-grid -->

      <button class="btn btn-block sml-push-y1" :disabled="isSending">
        <span v-if="isSending">
          Sending...
        </span>
        <span v-else>
          Take action
        </span>
      </button>
      <p class="sml-push-y1">
        <small>
          <a href="https://www.fightforthefuture.org/" target="_blank">
            Fight for the Future
          </a>
          will email you updates, and you can unsubscribe at any time. If
          you enter your number (it&rsquo;s optional) we will follow up by SMS.
          Message &amp; data rates apply. You can always text STOP to stop
          receiving messages.
          <a href="https://www.battleforthenet.com/privacy/" target="_blank">
            Privacy Policy
          </a>
        </small>
      </p>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { sendToMothership } from '~/assets/js/helpers'
import ShareButton from '~/components/ShareButton'

export default {
  components: {
    ShareButton
  },

  data() {
    return {
      isSending: false,
      hasSigned: false,
      errorMessage: null
    }
  },

  computed: {
    ...mapState(['donateUrl']),

    name: {
      get() {
        return this.$store.state.name
      },
      set(value) {
        this.$store.commit('setName', value)
      }
    },

    email: {
      get() {
        return this.$store.state.email
      },
      set(value) {
        this.$store.commit('setEmail', value)
      }
    },

    address: {
      get() {
        return this.$store.state.address
      },
      set(value) {
        this.$store.commit('setAddress', value)
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
      if (this.isSending) return

      this.isSending = true

      try {
        const response = await sendToMothership({ // eslint-disable-line no-unused-vars
          subject: 'TODO: subject',
          member: {
            first_name: this.name,
            email: this.email,
            street_address: this.address,
            postcode: this.zipCode,
            country: 'US'
          },
          hp_enabled: 'true',
          guard: '',
          // contact_congress: 1, // TODO: Optional
          // fcc_ecfs_docket: "17-108", // TODO: Optional
          an_tags: '["net-neutrality"]',
          an_petition_id: this.$store.state.anPetitionId
          // action_comment: TODO add if desired
        })

        this.$trackEvent('petition_form', 'submit')
        // TODO: Optional, enable callpower campaign after-action
        // this.$store.commit('setModalVisibility', true)
        // this.$store.commit('setModalType', 'call-form')
        this.isSending = false
        this.hasSigned = true
      } catch (err) {
        this.isSending = false
        this.errorMessage = 'Sorry, that didn’t work for some reason. Please try again.'
      }
    }
  }
}
</script>
