<template>
  <teleport to="#app">
    <div v-if="showModal" class="shadow" @click.self="closeModal">
      <div class="my-modal">
        <div class="my-modal-close" @click="closeModal">&#10006;</div>
          <div class="my-modal-header">
            <slot name="header"></slot>
          </div>
        <div class="my-modal-body">
            <slot name="body"></slot>
        </div>
        <div class="my-modal-footer">
            <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps(['showModal'])
const emit = defineEmits(['closeModal'])

watch(() => props.showModal, () => {
  if (props.showModal) {
    document.body.classList.add('scroll-block')
  } else {
    document.body.classList.remove('scroll-block')
  }
})

const closeModal = () => {
  emit('closeModal')
}

</script>

<style lang="sass">
  body.scroll-block
    // overflow: hidden !important
</style>

<style scoped lang="sass">
  .shadow
    position: absolute
    top: 0
    left: 0
    height: 100%
    width: 100%
    background: rgba(0, 0, 0, 0.8)

  .my-modal
    border-radius: 8px
    padding: 15px
    display: block
    min-width: 30vw
    max-width: 60vw
    min-height: 10vh
    max-height: 50vh
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background: darken(white, 25%)

    &-close
      border-radius: 50%
      color: #fff
      background: #2a4cc7
      display: flex
      align-items: center
      justify-content: center
      position: absolute
      top: 7px
      right: 7px
      width: 30px
      height: 30px
      cursor: pointer

    &-header
      color: #0971c7
      text-align: center

    &-body
      border-top: 1px solid black
      border-bottom: 1px solid black
      max-height: 20vh
      overflow: auto

    &-footer
      margin: 5px auto
      margin-bottom: 0
      text-align: center
</style>
