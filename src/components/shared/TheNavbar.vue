<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <ul class="nav d-flex justify-content-evenly">
          <li class="nav-item">
            <router-link  v-for="item in items" :key='item' class="navbar-brand" :to="item.url">
              <img :src="imgPath(item.url)" alt="" width="40" height="40" class="d-inline-block align-text-top">
              <span class='px-3'>{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>

const items = [
  { name: 'Дневник', url: '/diary' },
  { name: 'Задачи', url: '/tasks' },
  { name: 'Бюджет', url: '/budget' }
]

const imgPath = url => require('@/assets/' + url.slice(1) + '.png')

</script>

<style scoped lang="sass">
  span
    line-height: 40px
    vertical-align: bottom

  .active span
    color: #FFFFFF
    text-shadow: 0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px
</style>
