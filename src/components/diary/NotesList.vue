<template>
  <div class="row mt-2">
    <div class="col-12">
      <ul class="list-unstyled">
          <hr>
        <li v-for="str in data" :key="str.id">
          <div class="row">
            <div class="col-md-9 col-12" style="white-space: pre-wrap;">
              {{ str.note }}
            </div>
            <div class="col-md-3 col-12 align-self-center m-auto">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                @click="changeNote(str.id)"
              >Изменить</button>
              <button class="btn btn-primary mx-1" @click="emit('deleteNote', str.id)">Удалить</button>
            </div>
            <hr>
            <br>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Редактирование записи</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <textarea class="form-control" rows="10" v-model="changingText" :maxlength="noteMaxLength"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Отменить редактирование</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="emit('saveChanges', changingText)">Сохранить изменения</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'
const props = defineProps(['data', 'noteMaxLength'])
const emit = defineEmits(['changeNote', 'saveChanges', 'deleteNote'])
const changingText = ref('')
const changeNote = id => {
  changingText.value = props.data.find(el => el.id === id).note
  emit('changeNote', id)
}
</script>

<style scoped>

</style>
