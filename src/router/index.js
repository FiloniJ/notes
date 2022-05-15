import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../components/diary/MainComp.vue')
  },
  {
    path: '/diary',
    name: 'diary',
    component: () => import('../components/diary/MainComp.vue'),
    meta: {
      layout: 'menu'
    }
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../components/tasks/MainComp.vue'),
    meta: {
      layout: 'menu'
    }
  },
  {
    path: '/budget',
    name: 'budget',
    component: () => import('../components/budget/MainComp.vue'),
    meta: {
      layout: 'budget'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
