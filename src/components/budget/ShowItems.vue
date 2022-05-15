<template>
  <div class="col">
    <label class="px-3" for="from">Начало периода</label>
    <input type="date" id='from' v-model="startPeriod">
    <label class="px-3" for="to">Конец периода</label>
    <input type="date" id='to' v-model="endPeriod">
    <button
      class="btn btn-primary mx-2"
      :disabled="!startPeriod || !endPeriod"
      @click="emit('acceptFilter', props.part, startPeriod, endPeriod)"
    >Показать</button>
    <div v-if="dateDiapError">
      <br>
      <small class="text-danger">{{ dateDiapError }}</small>
    </div>
    <hr>
    <div v-if="data.length > 0">
      <apexchart width="600" align="center" type="donut" :options="options" :series="series" />
    </div>
    <table v-if="data.length > 0" style="margin: auto;" class="my-3 table">
      <thead>
        <tr>
          <td>Дата</td>
          <td>Сумма</td>
          <td>Категория</td>
          <td>Комментарий</td>
          <td>Функции</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, idx) in data" :key="idx">
          <td>{{ value.date }}</td>
          <td>{{ value.sum }}</td>
          <td>{{ categories[value.category - 1] }}</td>
          <td>{{ value.comment }}</td>
          <td>
            <button
              class="btn btn-danger"
              @click="deleteData(idx)"
            >Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <add-item
      :categories="categories"
      :id="props.id"
      :part="props.part"
    />
  </div>
</template>

<script setup>
import { watch, ref, defineComponent, defineProps, defineEmits } from 'vue'
import { dateDif } from '@/utils/DateTime.js'
import AddItem from './AddItem.vue'

defineComponent({ AddItem })
const props = defineProps(['data', 'categories', 'part'])
const emit = defineEmits(['deleteData', 'acceptFilter'])

const series = ref([])
const options = {
  labels: props.categories,
  legend: {
    show: true,
    width: 200,
    fontSize: '16px'
  }
}

// рассчёт суммы по категориям для отображения на общем графике
watch(() => props.data, () => {
  series.value = []
  for (let i = 0; i < options.labels.length; i++) {
    series.value[i] = 0
  }
  for (let i = 0; i < props.data.length; i++) {
    series.value[props.data[i].category - 1] += props.data[i].sum
  }
})

const startPeriod = ref('')
const endPeriod = ref('')
const dateDiapError = ref()

const deleteData = (idx) => {
  emit('deleteData', idx, props.part, startPeriod.value, endPeriod.value)
}

watch([startPeriod, endPeriod], () => {
  if (startPeriod.value && endPeriod.value) {
    const dif = dateDif(new Date(startPeriod.value), new Date(endPeriod.value))
    if (dif > 0) {
      startPeriod.value = endPeriod.value
      if (!dateDiapError.value) {
        dateDiapError.value = 'Начало периода должно быть меньше или равно концу периода'
        setTimeout(() => { dateDiapError.value = false }, 5000)
      }
    }
  }
})
</script>

<style scoped lang="sass">
  table
    border: 2px solid white
    color: darken(white, 40%)

  td, th
    padding: 3px 10px
    border: 1px solid gray
    text-align: center
    vertical-align: middle
</style>
