<style lang="scss">
body.modal-open {
  overflow: hidden;
}
.modal-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  animation: fade-in .3s;
  background-color: transparentize($black, 0.15);
  overflow: auto;
}
.modal {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 90%;
  max-width: 700px;
  max-height: 96vh;
  overflow: hidden;
  background-color: $white;
  border-radius: $default-border-radius;
  color: $grey-dark-color;
}
.modal-scroll {
  overflow-y: auto;
}
.modal .close {
  position: absolute;
  top: $gutter;
  right: $gutter;
  font-size: $font-size-2;
  line-height: 1;
  background-color: transparent;
  border:none;
  cursor: pointer;
  text-decoration: none;
}
.modal .close:focus {
  outline: none;
}
</style>

<template>
  <div class="modal-wrapper" v-if="modalVisible" @click.self="close()">
    <div class="modal">
      <div class="modal-scroll sml-pad-2 sml-pad-y4 med-pad-4">
        <slot></slot>
      </div> <!-- .modal-scroll -->
      <button class="close text-brand-light" @click="close()">&times;</button>
    </div> <!-- .modal -->
  </div> <!-- .modal-wrapper -->
</template>

<script>
export default {
  computed: {
    modalVisible () { return this.$store.state.modalVisible },
  },

  watch: {
    modalVisible(newValue) {
      // Add or remove body class based on if modal is visible
      if (newValue) {
        document.querySelector('body').classList.add('modal-open')
      } else {
        document.querySelector('body').classList.remove('modal-open')
      }
    }
  },

  methods: {
    close() {
      this.$store.commit('setModalVisibility', false)
      this.$store.commit('setModalType', null)
      this.$store.commit('setModalData', null)
    }
  }
}
</script>
