<template>
  <the-navbar />
  <div class="container mt-2">
    <div class="row">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup>

import { defineComponent } from '@vue/runtime-core'
import TheNavbar from '../components/shared/TheNavbar.vue'

defineComponent({ TheNavbar })

</script>

<style scoped>

</style>
