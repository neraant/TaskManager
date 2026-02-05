<template>
  <PageLayout>
    <template #header-back>
      <ArrowLeft :size="20" />
    </template>

    <template #header-title>
      {{ isEditing ? 'Edit Task' : 'Add Task' }}
    </template>

    <template #main>
      <TaskForm ref="taskForm" :task="task" :isEditing="isEditing" @submit="handleSubmit" />
    </template>

    <template #footer>
      <MyButton type="button" variant="primary" @click="submitForm" class="submit-button">
        {{ isEditing ? 'Update Task' : 'Create Task' }}
      </MyButton>
    </template>

    <template #header-action>
      <MyButton type="button" variant="ghost" @click="submitForm"> Save </MyButton>
    </template>
  </PageLayout>
</template>

<script lang="ts">
import type { Task } from '@/types/task'
import PageLayout from '@/components/layouts/PageLayout.vue'
import TaskForm from '@/components/TaskForm.vue'
import { ArrowLeft } from 'lucide-vue-next'
import { useTasksStore } from '@/stores/tasks'

export default {
  components: {
    PageLayout,
    TaskForm,
    ArrowLeft,
  },
  data() {
    return {
      tasksStore: useTasksStore(),
      task: null as Task | null,
    }
  },
  computed: {
    isEditing(): boolean {
      return !!this.$route.params.id
    },
  },
  mounted() {
    if (this.isEditing) {
      const taskId = this.$route.params.id as string
      this.task = this.tasksStore.getTaskById(taskId) || null
    }
  },
  methods: {
    submitForm() {
      ;(this.$refs.taskForm as InstanceType<typeof TaskForm>).onSubmit()
    },
    handleSubmit(taskData: Task) {
      if (this.isEditing && this.task) {
        this.tasksStore.updateTask({
          ...taskData,
          id: this.task.id,
        })
      } else {
        this.tasksStore.addTask(taskData)
      }
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
