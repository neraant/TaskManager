<template>
  <p class="empty__list__text" v-if="tasksStore.tasks.length === 0">You don't have any tasks yet</p>
  <TransitionGroup v-else class="task__list" name="list" tag="ul">
    <TaskItem
      v-for="task in tasksStore.filteredTasks"
      :key="task.id"
      :task="task"
      @toggle="tasksStore.toggleTask"
    />
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TaskItem from './TaskItem.vue'
import { useTasksStore } from '../stores/tasks'

export default defineComponent({
  components: {
    TaskItem,
  },
  data() {
    return {
      tasksStore: useTasksStore(),
    }
  },
})
</script>

<style scoped>
.empty__list__text {
  margin: auto;
  color: var(--muted-text);
}

.task__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.list-move {
  transition: transform 0.5s ease;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
