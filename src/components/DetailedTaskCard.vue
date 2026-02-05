<template>
  <div v-if="task" class="task-card">
    <div class="task-card__status">
      <span class="task-card__status__text"> Status </span>

      <MyToggle :modelValue="task.isDone" @update:modelValue="handleToggle" />
    </div>

    <h2 class="task-card__title">
      {{ task.title }}
    </h2>

    <div class="task-card__header">
      <MyBadge :variant="badgeVariant">
        {{ task.category }}
      </MyBadge>

      <span class="task-card__header__date"> <Calendar :size="12" /> {{ date }} </span>
    </div>

    <div class="task-card__description">
      <p class="task-card__description__title">
        {{ 'DESCRIPTION' }}
      </p>
      <p class="task-card__description__text">
        {{ task.description || 'No description' }}
      </p>
    </div>

    <div class="task-card__footer">
      <div v-for="info in taskInfo" :key="info.title" class="task-card__info-card">
        <div class="task-card__info-card__header">
          <component
            :is="info.icon"
            :size="14"
            class="task-card__info-card__icon"
            :color="info.iconColor"
          />
          <span class="task-card__info-card__title">{{ info.title }}</span>
        </div>
        <span class="task-card__info-card__content">{{ info.content }}</span>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script lang="ts">
import { useTasksStore } from '@/stores/tasks'
import { Category } from '@/types/task'
import dayjs from 'dayjs'
import { Calendar, Clock, Flag } from 'lucide-vue-next'

export default {
  components: {
    Calendar,
    Clock,
    Flag,
  },
  data() {
    return {
      tasksStore: useTasksStore(),
      taskId: '',
    }
  },
  computed: {
    task() {
      return this.tasksStore.getTaskById(this.taskId)
    },
    badgeVariant(): string {
      if (!this.task) return ''

      switch (this.task.category) {
        case Category.Personal:
          return 'success'
        case Category.Study:
          return 'info'
        default:
          return 'primary'
      }
    },
    date() {
      if (!this.task?.date) return 'No date'
      return dayjs(this.task.date).format('MMM DD, YYYY')
    },
    taskInfo() {
      if (!this.task) return []

      return [
        {
          icon: Flag,
          iconColor: '#f97316',
          title: 'PRIORITY',
          content: this.task.priority,
        },
        {
          icon: Clock,
          iconColor: '#3b82f6',
          title: 'TIME',
          content: this.task.time || 'Not set',
        },
      ]
    },
  },
  methods: {
    handleToggle(newValue: boolean) {
      if (this.task) {
        this.tasksStore.toggleTask(this.task.id, newValue)
      }
    },
  },
  mounted() {
    this.taskId = this.$route.params.id as string
  },
}
</script>

<style scoped>
.task-card {
  background: var(--bg-white);
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 6px 1px var(--black-shadow);
}

.task-card__status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.task-card__status__text {
  font-size: 16px;
  font-weight: 500;
  color: var(--muted-text);
}

.task-card__title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 8px;
}

.task-card__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.task-card__header__date {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--muted-text);
  font-weight: 500;
}

.task-card__description {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.task-card__description__title {
  letter-spacing: 1px;
  font-size: 14px;
  opacity: 0.8;
  font-weight: 600;
}

.task-card__description__text {
  color: var(--muted-text);
  line-height: 1.4rem;
  word-break: break-all;
}

.task-card__footer {
  display: flex;
  gap: 12px;
}

.task-card__info-card {
  flex: 1;
  background: var(--muted-bg);
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-card__info-card__header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.task-card__info-card__icon {
  color: var(--muted-text);
}

.task-card__info-card__title {
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 600;
  opacity: 0.7;
}

.task-card__info-card__content {
  font-size: 16px;
  font-weight: 600;
  color: var(--foreground);
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--muted-text);
}
</style>
