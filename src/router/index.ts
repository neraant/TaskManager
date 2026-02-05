import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/HomeView.vue') },
    { path: '/tasks', component: () => import('@/views/HomeView.vue') },
    { path: '/tasks/add', component: () => import('@/views/TaskFormView.vue'), name: 'TaskAdd' },
    {
      path: '/tasks/:id',
      component: () => import('@/views/TaskDetailsView.vue'),
      name: 'TaskDetail',
    },
    {
      path: '/tasks/:id/edit',
      component: () => import('@/views/TaskFormView.vue'),
      name: 'TaskEdit',
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },

    { path: '/ui', name: 'UI', component: () => import('@/views/UIView.vue') },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
