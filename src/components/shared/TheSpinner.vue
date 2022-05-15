<template>
  <div v-if="!isButton" class="spinner-border" style="width: 6rem; height: 6rem;" role="status">
  </div>
  <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['isButton'])
</script>

<style scoped>

</style>
