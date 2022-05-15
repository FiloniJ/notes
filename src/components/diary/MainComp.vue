<template>
  <div class="col text-center">
    <div>
      <h2>Здесь находится история вашей жизни!</h2>
      <span>{{ helpText }}</span>
      <br>
      <select v-model="fYear" class='mx-1'>
        <option
          v-for="year in periods.year"
          :key=year
          :value=year
        >{{ year }}</option>
      </select>
      <select v-if="fYear" v-model="fMonth" class='mx-1'>
        <option
          v-for="val in periods.month"
          :key="val"
          :value="val"
        >{{ months[val - 1] }}</option>
      </select>
      <select v-if="fMonth" v-model="fDay" class='mx-1'>
        <option
          v-for="val in periods.day"
          :key=val
          :value=val
        >{{ val }}</option>
      </select>
    </div>
    <the-spinner v-if="loading" />
    <notes-list v-else
      :data="filteredData"
      @changeNote="changeNote"
      @saveChanges="saveChanges"
      @deleteNote="deleteNote"
      :noteMaxLength="noteMaxLength"
    />
    <add-diary
      @addNote="addNote"
      :success="success"
      :noteMaxLength="noteMaxLength"
    />
  </div>
</template>

<script setup>
import { defineComponent, ref, reactive, onMounted, watch } from 'vue'
import AddDiary from './AddDiary.vue'
import NotesList from './NotesList.vue'
import TheSpinner from '../shared/TheSpinner.vue'
import axios from 'axios'
import { useStore } from 'vuex'

defineComponent({ AddDiary, NotesList, TheSpinner })
const localhost = useStore().getters.domain

const noteMaxLength = 500

const helpText = ref('Выберите год')
const periods = reactive({ year: [], month: [], day: [] })

const fYear = ref()
const fMonth = ref()
const fDay = ref()

const loading = ref()
const data = ref([])

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

// Вывод в select дат на выбор для просмотра записей дневника
watch(fYear, () => {
  fMonth.value = false
  filteredData.value = []
  helpText.value = 'Выберите месяц'
  periods.month = []
  data.value.forEach(el => {
    if (el.year === fYear.value) {
      if (!periods.month.includes(el.month)) {
        periods.month.push(el.month)
      }
    }
  })
  periods.month.sort((a, b) => a - b)
})

watch(fMonth, val => {
  if (val) {
    fDay.value = false
    filteredData.value = []
    helpText.value = 'Выберите число'
    periods.day = []
    data.value.forEach(el => {
      if (el.year === fYear.value && el.month === fMonth.value) {
        if (!periods.day.includes(el.day)) {
          periods.day.push(el.day)
        }
      }
    })
    periods.day.sort()
  }
})

const filteredData = ref([])
const updateFilteredData = () => {
  filteredData.value = data.value
    .filter(el =>
      el.year === fYear.value &&
      el.month === fMonth.value &&
      el.day === fDay.value
    )
}

watch(fDay, val => {
  if (val) {
    helpText.value = 'Записи на данную дату'
    updateFilteredData()
  }
})

// create
const success = ref()

const addNote = async (note, year, month, day) => {
  await axios.post(localhost + 'api/diary', { note, year, month: month + 1, day })
    .then(response => {
      data.value.push(response.data)
      updateFilteredData()
      if (!periods.year.includes(response.data.year)) {
        periods.year.push(response.data.year)
        periods.year.sort()
      }
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
  await axios.get(localhost + 'api/diary')
    .then(response => {
      data.value = response.data
    })
    .catch(e => console.log(e))
  data.value.forEach(el => {
    if (!periods.year.includes(el.year)) {
      periods.year.push(el.year)
    }
  })
  periods.year.sort()
  loading.value = false
})
// update
let editNoteId = 0

const changeNote = id => {
  editNoteId = id
}

const saveChanges = async text => {
  await axios.put(localhost + `api/diary/${editNoteId}`, { note: text })
    .then(() => {
      data.value.find(el => el.id === editNoteId).note = text
      updateFilteredData()
    })
}
// delete
const deleteNote = async id => {
  await axios.delete(localhost + `api/diary/${id}`)
    .then(() => {
      const idx = data.value.findIndex(el => el.id === id)
      data.value.splice(idx, 1)
      updateFilteredData()
    })
}
</script>

<style scoped>

</style>
