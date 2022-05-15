<template>
  <form @submit.prevent="onSubmit">
    <label for="inputeText">Новая запись</label>
    <textarea
      v-model="noteText"
      class="form-control"
      name="noteText"
      id="noteText"
      rows="7"
      @blur="handleBlur"
      :maxlength="noteMaxLength"
    ></textarea>
    <small class='text-danger' v-if="errorMessage">{{ errorMessage }}</small>
    <span v-if="success" class='text-success'>Запись успешно добавлена</span>
    <br>

    <label for="year" class='px-2'><b>Год:</b></label>
    <input type="number" id="year" name="year" min=1900 max=2100 v-model.number='year'>
    <label for="month" class='px-2'><b>Месяц:</b></label>
    <select name="month" id="month" v-model='month'>
        <option
          v-for="(m, idx) in months"
          :value=idx
          :key=idx
        >{{ m }}</option>
    </select>
    <label for="day" class='px-2'><b>День:</b></label>
    <input
      type="number" id="day" min=1 max=31
      v-model.number='day'
    >
    <div class="row mt-2">
      <div class="col">
        <button
          type='submit'
          class="btn btn-primary my-1"
          :disabled="isSubmitting"
        >
          <the-spinner v-if="isSubmitting" isButton="true"/>
          Добавить запись
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { defineEmits, defineComponent, ref, watch, defineProps } from 'vue'
import TheSpinner from '../shared/TheSpinner.vue'

const emit = defineEmits(['addNote'])
defineComponent({ TheSpinner })
defineProps(['success', 'noteMaxLength'])

const date = new Date()
const year = ref(date.getFullYear())
const month = ref(date.getMonth())
const day = ref(date.getDate())

/*
Проверка на максимальную длину месяца с учётом високосного года
Можно использовать и input type="date" вместо всего этого, но как
во всём проекте показаны различные подходы к решению похожих задач
*/

watch([year, month, day], val => {
  if (val && val[2] > max[month.value]) {
    if (month.value === 1 && ((year.value % 4) === 0)) {
      if (val[2] > 29) {
        day.value = 29
      }
    } else {
      day.value = max[month.value]
    }
  }
})

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const max = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const { handleSubmit, isSubmitting } = useForm()

const { value: noteText, errorMessage, handleBlur } = useField('noteText',
  yup.string()
    .min(6, 'Запись должна быть больше 5 символов')
    .max(500, 'Максимальная длина записи не должна превышать 500 символов')
    .required('Введите текст записи')
)

const onSubmit = handleSubmit(values => {
  emit('addNote', values.noteText, year.value, month.value, day.value)
})
</script>

<style scoped>

</style>
