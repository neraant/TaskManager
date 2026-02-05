<template>
  <div class="tasks__filter">
    <div class="tasks__filter__buttons">
      <button
        v-for="filter in filters"
        :key="filter.value"
        :class="['filter-button', { active: tasksStore.activeFilter === filter.value }]"
        @click="tasksStore.setFilter(filter.value)"
      >
        {{ filter.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useTasksStore } from '@/stores/tasks'

export default {
  data() {
    return {
      tasksStore: useTasksStore(),
      filters: [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'work', label: 'Work' },
        { value: 'study', label: 'Study' },
        { value: 'personal', label: 'Personal' },
      ] as const,
      category: '',
    }
  },
}
</script>

<style scoped>
.tasks__filter {
  margin-bottom: 4px;
  width: 100%;
  padding-bottom: 12px;
  overflow-x: auto;
}
.tasks__filter__buttons {
  display: flex;
  gap: 8px;
}
.filter-button {
  padding: 8px 16px;
  border: 1px solid var(--muted-bg);
  background: var(--bg-white);
  box-shadow: 0px 2px 4px 0px var(--black-shadow);
  border-radius: 17px;
  cursor: pointer;
  color: var(--muted-text);
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
}
.filter-button:hover {
  background: var(--muted-bg);
}
.filter-button.active {
  background: var(--foreground);
  border: 1px solid var(--foreground);
  color: var(--text-white);
}
</style>
