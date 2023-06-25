import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue'
import FilmIdPage from '@/pages/FilmIdPage.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/film/:id',
    name: 'film',
    component: FilmIdPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router