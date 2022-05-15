<template>
  <form @submit.prevent="onSubmit">
    <label class="px-2" for="date">Дата</label>
    <input class="form-control-sm" type="date" id="date" v-model="date">

    <label class="px-2" for="kat">Категория</label>
    <select id="kat" v-model="kat">
      <option v-for="(value, idx) in categories" :key="idx">
        {{ value }}
      </option>
    </select>

    <label class="px-2" for="sum">Сумма</label>
    <input type="number" min="1" id="sum" v-model.number="sum">

    <label class="px-2" for="comment">Комметарий</label>
    <input type="text" id="comment" v-model="comment" maxlength="50">

    <button
      class="btn btn-primary mx-2"
      type="submit"
      :disabled="!date || !kat || !sum"
      @click="addItem"
    >Добавить</button>
    <div v-if="isAdded" >
      <span class="text-success">
        Запись успешно добавлена
      </span>
    </div>
  </form>
</template>

<script setup>
import { defineProps, ref, inject } from 'vue'
const props = defineProps(['categories', 'part'])

const date = ref()
const kat = ref()
const sum = ref()
const comment = ref()

const addData = inject('addData')
const isAdded = inject('isSuccessAdded')

const addItem = () => {
  addData({
    date: date.value,
    category: props.categories.findIndex(data => data === kat.value) + 1,
    sum: sum.value,
    comment: comment.value
  },
  props.part
  )
}

</script>

<style scoped>

</style>
