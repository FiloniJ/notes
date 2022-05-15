<template>
  <div class="col text-center">
    <h2>Копейка рубль бережёт</h2>
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Расходы
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <show-items
              :data="expenses"
              :categories="expKat"
              part='expenses'
              @deleteData="deleteData"
              @acceptFilter="acceptFilter"
            />
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Доходы
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <show-items
              :data="incomings"
              :categories="incKat"
              part='income'
              @deleteData="deleteData"
              @acceptFilter="acceptFilter"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref, provide } from 'vue'
import ShowItems from './ShowItems.vue'
import axios from 'axios'
import { useStore } from 'vuex'

defineComponent({ ShowItems })

const expKat = ['Дом', 'Еда', 'Долги', 'Транспорт', 'Счета и услуги', 'Личные расходы', 'Сбережения', 'Другие расходы']
const incKat = ['Зарплата', 'Аренда', 'Проценты', 'Прочие']

const localhost = useStore().getters.domain

// create
const isSuccessAdded = ref()
provide('isSuccessAdded', isSuccessAdded)

const addData = async (data, part) => {
  await axios.post(localhost + `api/budget/${part}`, data)
    .then(() => {
      isSuccessAdded.value = true
      setTimeout(() => {
        isSuccessAdded.value = false
      }, 5000)
    })
}
provide('addData', addData)

// read
const expenses = ref([])
const incomings = ref([])

const acceptFilter = async (part, startPeriod, endPeriod) => {
  await axios.get(localhost + `api/budget/${part}`, {
    params: {
      startPeriod,
      endPeriod
    }
  })
    .then(response => {
      if (part === 'income') {
        incomings.value = response.data
      } else {
        expenses.value = response.data
      }
    })
    .catch(e => console.log(e))
}

// delete
const deleteData = async (idx, part, start, end) => {
  let index = expenses
  if (part === 'income') {
    index = incomings
  }
  await axios.delete(localhost + `api/budget/${part}/${index.value[idx].id}`)
    .then(() => {
      index.value.splice(idx, 1)
      acceptFilter(part, start, end)
    })
}
</script>

<style scoped lang="sass">
  .accordion-item,
  .accordion-button,
  .accordion-body
    background-color: #141414
    color: #888
    border-color: black
</style>
