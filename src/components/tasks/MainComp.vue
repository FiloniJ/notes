<template>
  <div class="col text-center">
    <h2>Не забудьте обо всех важных делах!</h2>
    <label for="status" class="px-1"><b>Статус</b></label>
    <select id="status" v-model="statusValue">
      <option v-for="value in status" :key=value>{{ value }}</option>
    </select>
    <label for="term" class="px-1"><b>Срочность</b></label>
    <select id="term" v-model="termValue">
      <option v-for="value in term" :key=value>{{ value }}</option>
    </select>
    <div v-if="statusValue === 'Активные'">
      <label for="period" class="px-1"><b>Период</b></label>
      <select id="period" v-model="periodValue">
        <option v-for="(value, idx) in period" :key=value :value="periodDays[idx]">{{ value }}</option>
      </select>
    </div>
    <div v-if="statusValue || termValue">
      <br>
      <button
        class="btn btn-secondary btn-sm"
        @click="clearFilters"
      >Очистить фильтры</button>
    </div>

    <hr>
    <the-spinner v-if="loading"/>
    <span v-else v-for="data in paginatedData" :key=data.id>
      <div class="row">
        <div class="col-lg-10 col-sm-12 align-middle">
          {{ data.note }}<br>
          <strong>Срок:</strong> {{ data.date }}
          <br>
          <strong>Выполнена:</strong> {{ data.done ? 'Да' : 'Нет' }}
        </div>
        <div class="col-lg-2 col-sm-12 m-auto">
          <button v-if="!data.done"
            class="btn btn-primary btn-sm my-1"
            @click="doneTask(data.id)"
            :disabled="data.done"
          >Выполнить задачу</button>
          <button
            class="btn btn-danger btn-sm"
            @click="deleteTask(data.id)"
          >Удалить задачу</button>
        </div>
      </div>
      <hr>
    </span>
    <div v-if="pageCount > 1">
      <button class="btn btn-primary mx-1" @click="prevPage" :disabled="nowPage == 0">Назад</button>
      <button class="btn btn-primary mx-1" @click="nextPage" :disabled="nowPage >= (pageCount - 1)">Вперёд</button>
    </div>
    <add-task
      :term="term"
      @newTask='newTask'
      :success="success"
    ></add-task>
  </div>
</template>

<script setup>
import { defineComponent, ref, computed, onMounted } from 'vue'
import AddTask from './AddTask.vue'
import { dateDif } from '@/utils/DateTime'
import axios from 'axios'
import { useStore } from 'vuex'
import TheSpinner from '../shared/TheSpinner.vue'

defineComponent({ AddTask, TheSpinner })

const status = ['Активные', 'Просроченные', 'Выполненные']
const term = ['Срочные', 'Обычные', 'Необязательные']
const period = ['Сегодня', '7 дней', '30 дней']
const periodDays = [1, 7, 30]
const store = useStore()
const localhost = store.getters.domain
const loading = ref()

const tasks = ref([])

const statusValue = ref()
const termValue = ref()
const periodValue = ref()

// Filter
const taskData = computed(() => tasks.value
  .filter(data => {
    if (termValue.value) {
      const idx = term.findIndex(data => data === termValue.value) + 1
      return data.term === idx
    }
    return tasks
  })
  .filter(data => {
    if (statusValue.value) {
      const idx = status.findIndex(data => data === statusValue.value) + 1
      if (idx === 3) { // выполненные
        return data.done
      } else {
        const dif = dateDif(new Date(data.date))
        if (idx === 2) { // просроченные
          return dif < 0 && !data.done
        } else if (idx === 1) { // активные
          return dif >= 0 && !data.done
        }
      }
    }
    return tasks
  })
  .filter(data => {
    if (periodValue.value) {
      return dateDif(new Date(data.date)) < periodValue.value
    }
    nowPage.value = 0
    return tasks
  })
)

const clearFilters = () => {
  statusValue.value = false
  termValue.value = false
  periodValue.value = false
}

// Pagination
const size = 5
const nowPage = ref(0)

const paginatedData = computed(() => taskData.value.slice(nowPage.value * size, nowPage.value * size + size))

const pageCount = computed(() => Math.ceil(taskData.value.length / size))

const nextPage = () => {
  nowPage.value += 1
}

const prevPage = () => {
  nowPage.value -= 1
}

// create
const success = ref()
const newTask = async values => {
  await axios.post(localhost + 'api/tasks', values)
    .then(response => {
      tasks.value.push(response.data)
      success.value = true
      setTimeout(() => {
        success.value = false
      }, 5000)
    })
    .catch(e => console.log(e))
}
// read
onMounted(async () => {
  loading.value = true
  await axios.get(localhost + 'api/tasks')
    .then(response => {
      tasks.value = response.data
    })
  loading.value = false
})
// update
const doneTask = async id => {
  const idx = tasks.value.findIndex(el => el.id === id)
  tasks.value[idx].done = 1
  const data = tasks.value[idx]
  await axios.put(localhost + `api/tasks/${id}`, data)
    .catch(() => {
      tasks.value[idx].done = 0
    })
}
// delete
const deleteTask = async id => {
  await axios.delete(localhost + `api/tasks/${id}`)
    .then(() => {
      const idx = tasks.value.findIndex(el => el.id === id)
      tasks.value.splice(idx, 1)
    })
}
</script>

<style scoped>

</style>
