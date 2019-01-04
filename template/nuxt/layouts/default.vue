<template>
  <div>
    <nuxt />

    <Modal>
      <CallFormModal v-if="modalType === 'call-form'" />
      <CallScriptModal v-if="modalType === 'call-script'" />
      <SelfieModal v-if="modalType === 'selfie'" :selfie="modalData" />
      <ArchivedModal v-if="modalType === 'archived'" />
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '~/components/Modal'
import CallFormModal from '~/components/CallFormModal'
import CallScriptModal from '~/components/CallScriptModal'
import SelfieModal from '~/components/SelfieModal'
import ArchivedModal from '~/components/ArchivedModal'

export default {
  components: {
    Modal,
    CallFormModal,
    CallScriptModal,
    SelfieModal,
    ArchivedModal
  },

  computed: {
    ...mapState(['modalType', 'modalData'])
  }
}
</script>
