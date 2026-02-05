<template>
  <main class="home">
    <h1 class="home__title">Task Manager</h1>
    <p class="home__subtitle">You have {{ tasksStore.getTodaysTasks }} tasks for today</p>

    <TasksFilters />

    <TasksList />

    <MyButton class="home__button" variant="primary">
      <RouterLink class="home__button__link" to="/tasks/add">
        <Plus class="home__button__icon" :size="16" />
      </RouterLink>
    </MyButton>
  </main>
</template>

<script lang="ts">
import TasksList from '@/components/TasksList.vue'
import TasksFilters from '@/components/TasksFilters.vue'
import MyButton from '@/components/ui/MyButton.vue'
import { useTasksStore } from '@/stores/tasks'
import { Plus } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

export default {
  name: 'HomeView',
  components: {
    TasksList,
    MyButton,
    RouterLink,
    TasksFilters,
    Plus,
  },
  data() {
    return {
      tasksStore: useTasksStore(),
    }
  },
}
</script>

<style scoped>
.home {
  margin-bottom: 88px;
  min-height: calc(100dvh - 129px);
  display: flex;
  flex-direction: column;
}
.home__title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 2px;
}
.home__subtitle {
  font-size: 14px;
  color: var(--muted-text);
  margin-bottom: 16px;
}
.home__button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  border-radius: 100% !important;
  width: 48px !important;
  height: 48px !important;
  padding: 0 !important;
  z-index: 100;
  box-shadow: 0px 0px 15px 5px var(--black-shadow) !important;
}
.home__button:hover {
  box-shadow: 0px 0px 20px 10px var(--black-shadow) !important;
}
.home__button:active {
  box-shadow: 0px 0px 15px 5px var(--black-shadow) !important;
}
.home__button__link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: inherit;
  text-decoration: none;
}
</style>
