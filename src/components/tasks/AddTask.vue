<template>
  <h2>Добавление новой задачи</h2>
  <form @submit.prevent="onSubmit">
    <div class="col-12">
      <label for='date' class='px-1' >
        <b>Дата выполнения</b>
        <small class='text-danger' v-if="dError">&nbsp;({{ dError }})</small><br>
      </label>
      <input type="date" v-model="nowDate" @blur='dBlur'>
    </div>
    <div class="col-1212">
      <label for='term' class='px-1'>
        <b>Срочность</b>
        <small class='text-danger' v-if="srError">&nbsp;({{ srError }})</small><br>
      </label>
      <select id="term" v-model="termValue" @blur='srBlur'>
        <option v-for="(value, idx) in term" :key=value :value="idx + 1">{{ value }}</option>
      </select>
    </div>

    <textarea class="form-control mt-1" rows="3" v-model='taskText' @blur='tBlur'></textarea>
    <small class='text-danger'>{{ tError }}</small>
    <span v-if="success" class="text-success">Задача успешно добавлена</span>
    <br>
    <button
      :disabled="isSubmitting"
      type='submit'
      class="btn-primary mt-1"
    >Добавить задание</button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { todayDate } from '@/utils/DateTime'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

defineProps(['term', 'success'])
const emit = defineEmits(['newTask'])

const { handleSubmit, isSubmitting } = useForm()

const { value: taskText, errorMessage: tError, handleBlur: tBlur } = useField('note',
  yup
    .string()
    .min(3, 'Текст задачи не должен быть меньше 3 символов')
    .required('Введите текст задачи')
)
const { value: termValue, errorMessage: srError, handleBlur: srBlur } = useField('term',
  yup
    .string()
    .required('Выберите категорию срочности')
)
const { value: nowDate, errorMessage: dError, handleBlur: dBlur } = useField('date',
  yup
    .string()
    .required('Выберите дату')
)

nowDate.value = todayDate()

const onSubmit = handleSubmit(values => {
  values.done = 0
  emit('newTask', values)
})
</script>

<style scoped>

</style>
