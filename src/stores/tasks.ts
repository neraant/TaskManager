import { Category, Priority, type FiltersType, type Task } from '@/types/task'
import { useLocalStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'tasks-app-data'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: useLocalStorage('tasks', [] as Task[]),
    activeFilter: 'all' as FiltersType,
  }),
  actions: {
    addTask(newTask: Task) {
      const maxId = this.tasks.length > 0 ? Math.max(...this.tasks.map((t) => t.id)) : 0

      this.tasks.push({
        ...newTask,
        id: maxId + 1,
      })
    },
    deleteTask(taskId: number) {
      const index = this.tasks.findIndex((t) => t.id === taskId)
      if (index !== -1) {
        this.tasks.splice(index, 1)
      }
    },
    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex((t) => t.id === updatedTask.id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
    },
    toggleTask(taskId: number, newValue: boolean) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.isDone = newValue
      }
    },
    setFilter(filter: FiltersType) {
      this.activeFilter = filter
    },
  },
  getters: {
    activeTasks: (state) => {
      return state.tasks.filter((t) => !t.isDone)
    },

    completedTasks: (state) => {
      return state.tasks.filter((t) => t.isDone)
    },

    filteredTasks: (state) => {
      if (state.activeFilter === 'active') {
        return state.tasks.filter((t) => !t.isDone)
      } else if (state.activeFilter === 'completed') {
        return state.tasks.filter((t) => t.isDone)
      } else if (state.activeFilter === 'work') {
        return state.tasks.filter((t) => t.category === 'Work')
      } else if (state.activeFilter === 'study') {
        return state.tasks.filter((t) => t.category === 'Study')
      } else if (state.activeFilter === 'personal') {
        return state.tasks.filter((t) => t.category === 'Personal')
      }
      return state.tasks
    },

    getTodaysTasks: (state) => {
      return state.tasks.filter((task) => dayjs(task.date).isSame(dayjs(), 'day')).length
    },

    getTaskById: (state) => (id: string) => {
      return state.tasks.find((t) => t.id === +id)
    },
  },
})
