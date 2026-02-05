<template>
  <li :class="['task__item', { done: task.isDone }]">
    <RouterLink :to="`/tasks/${task.id}`" class="task__link">
      <MyCheckbox
        :modelValue="task.isDone"
        @update:modelValue="handleCheckboxChange"
        @click.stop
        class="task__checkbox"
      />

      <div class="task__content">
        <h6 class="task__title">{{ task.title }}</h6>
        <p v-if="task.description" class="task__description">{{ task.description }}</p>
      </div>

      <MyBadge :variant="badgeVariant" class="task__badge">
        {{ task.category }}
      </MyBadge>
    </RouterLink>
  </li>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Category, type Task } from '../types/task'

export default defineComponent({
  name: 'TaskItem',
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  emits: ['toggle'],
  computed: {
    badgeVariant(): string {
      if (this.task.isDone) {
        return 'muted'
      }

      switch (this.task.category) {
        case Category.Personal:
          return 'success'
        case Category.Study:
          return 'info'
        default:
          return 'primary'
      }
    },
  },
  methods: {
    handleCheckboxChange(value: boolean): void {
      this.$emit('toggle', this.task.id, value)
    },
  },
})
</script>

<style scoped>
.task__item {
  list-style: none;
  transition: all 0.1s ease-in-out;
  width: 100%;
}

.task__item:not(.done):hover {
  transform: scale(1.01);
}

.task__item.done {
  opacity: 0.5;
}

.task__link {
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  padding: 16px 12px;
  border-radius: 24px;
  background: var(--bg-white);
  box-shadow: 2px 0px 10px 1px var(--black-shadow);
  text-decoration: none;
  color: inherit;
}

.task__checkbox {
  margin-top: 4px;
  cursor: pointer;
}

.task__content {
  display: flex;
  flex-direction: column;
  margin-right: auto;
  min-width: 0;
  gap: 6px;
}

.task__title {
  position: relative;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: fit-content;
}

.task__title::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0; /* Вместо width: 100% */
  transform: translateY(-50%) scaleX(0);
  transform-origin: left;
  height: 1px;
  background: var(--foreground);
  transition: transform 0.4s ease-in-out;
}

.task__item.done .task__title::after {
  transform: translateY(-50%) scaleX(1);
}

.task__description {
  font-size: 14px;
  font-weight: 400;
  color: var(--muted-text);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
}

.task__badge {
  margin-top: 4px;
}
</style>
