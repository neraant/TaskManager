<template>
  <MyButton variant="outline" class="delete-button" @click="handleOpenConfirmation">
    <Trash :size="16" />
    Delete Task
  </MyButton>
  <MyDialog headerText="Delete Task Confirmation" v-model:isOpen="isConfirmationOpen">
    <p class="delete__text">Are you sure you wanna delete this task?</p>

    <template #footer>
      <div class="delete__buttons">
        <MyButton variant="outline" @click="isConfirmationOpen = false"> Cancel </MyButton>
        <MyButton class="delete-button__dialog" @click="handleDelete"> Delete </MyButton>
      </div>
    </template>
  </MyDialog>
</template>

<script lang="ts">
import { useTasksStore } from '@/stores/tasks'
import { Trash } from 'lucide-vue-next'

export default {
  components: {
    Trash,
  },
  data() {
    return {
      tasksStore: useTasksStore(),
      isConfirmationOpen: false,
    }
  },
  methods: {
    handleDelete() {
      const taskId = this.$route.params.id as string

      if (taskId) {
        this.tasksStore.deleteTask(+taskId)
        this.$router.replace('/')
      }
    },
    handleOpenConfirmation() {
      this.isConfirmationOpen = true
    },
  },
}
</script>

<style scoped>
.delete-button {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--error-text) !important;
  border: 1px solid var(--error-text) !important;
  width: 100%;
}

.delete-button:hover {
  background: var(--error-text) !important;
  color: var(--text-white) !important;
}

.delete__text {
  color: var(--muted-text);
  font-size: 14px;
  margin: 0;
}

.delete__buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
}

.delete-button__dialog {
  background: var(--error-text) !important;
}
</style>
