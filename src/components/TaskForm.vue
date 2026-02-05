<template>
  <form @submit.prevent="onSubmit" class="task-form">
    <div class="form-group">
      <label for="title">Title</label>
      <MyInput
        id="title"
        v-model="formData.title"
        placeholder="Enter task title"
        :isError="!!errors.title"
        :errorText="errors.title"
      />
    </div>

    <div class="form-group">
      <label for="category">Category</label>
      <MySelect
        id="category"
        v-model="formData.category"
        placeholder="Select category"
        :options="categoryOptions"
        :isError="!!errors.category"
        :errorText="errors.category"
      />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="date">Date</label>
        <MyDatePicker id="date" type="date" v-model="formData.date" />
      </div>

      <div class="form-group">
        <label for="time">Time</label>
        <MyTimePicker id="time" type="time" v-model="formData.time" />
      </div>
    </div>

    <div class="form-group">
      <label for="priority">Priority</label>
      <MyTabs
        id="priority"
        v-model="formData.priority"
        :options="priorityOptions"
        placeholder="Select priority"
        :isError="errors.priority"
        :errorText="errors.priority"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <MyTextarea
        id="description"
        v-model="formData.description"
        placeholder="Add details about your task here... (optional)"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { Category, Priority, type Task } from '@/types/task'
import type { PropType } from 'vue'

export default {
  props: {
    task: {
      type: Object as PropType<Task | null>,
      default: null,
    },
  },
  emits: ['submit'],
  data() {
    return {
      formData: {
        title: '',
        description: '',
        category: '',
        priority: 'Low',
        date: '',
        time: '',
        isDone: false,
      },
      errors: {
        title: '',
        category: '',
        priority: '',
      },
      categoryOptions: [
        { label: 'Work', value: Category.Work },
        { label: 'Personal', value: Category.Personal },
        { label: 'Study', value: Category.Study },
      ],
      priorityOptions: [
        { label: 'Low', value: Priority.Low },
        { label: 'Medium', value: Priority.Medium },
        { label: 'High', value: Priority.High },
      ],
    }
  },
  watch: {
    task: {
      handler(newTask) {
        if (newTask) {
          this.formData = {
            title: newTask.title || '',
            description: newTask.description || '',
            category: newTask.category || '',
            priority: newTask.priority || 'Low',
            date: newTask.date || '',
            time: newTask.time || '',
            isDone: newTask.isDone || false,
          }
        } else {
          this.formData = {
            title: '',
            description: '',
            category: '',
            priority: 'Low',
            date: '',
            time: '',
            isDone: false,
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    validate() {
      this.errors = {
        title: '',
        category: '',
        priority: '',
      }

      let isValid = true

      if (!this.formData.title.trim()) {
        this.errors.title = 'Title is required'
        isValid = false
      }

      if (!this.formData.category) {
        this.errors.category = 'Category is required'
        isValid = false
      }

      if (!this.formData.priority) {
        this.errors.priority = 'Priority is required'
        isValid = false
      }

      return isValid
    },
    onSubmit() {
      if (this.validate()) {
        this.$emit('submit', this.formData)
      }
    },
  },
}
</script>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}
</style>
