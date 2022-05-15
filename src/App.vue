<template>
  <component :is="layout + '-layout'"></component>
  <menu-layout />
</template>

<script setup>

import { useRoute } from 'vue-router'
import { computed, defineComponent } from 'vue'
import LoginLayout from './layouts/LoginLayout'
import MenuLayout from './layouts/MenuLayout'

const route = useRoute()
const layout = computed(() => route.meta.layout)

defineComponent({ LoginLayout, MenuLayout })

</script>

<style lang="sass">
  @import 'bootstrap/dist/css/bootstrap.css'
  body
    font-family: Inter, Roboto, Oxygen, Fira Sans, Helvetica Neue, sans-serif
    font-size: 16px
    color: #2c3e50
    background: #2c3e50

  .container
    background-color: #141414
    border-color: rgb(51, 51, 51)
    box-shadow: 5px 5px 5px black
    color: #888
    border-radius: 5px

  input, select
    background-color: darken(white, 5%)
</style>
