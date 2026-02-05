<template>
  <span :class="['badge', variant]">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'MyBadge',
  props: {
    variant: {
      type: String,
      default: 'primary',
      required: false,
      validator: (value) => {
        return ['primary', 'success', 'info', 'muted'].includes(value)
      },
    },
  },
}
</script>

<style scoped>
.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border: 1px solid var(--foreground);
  font-weight: 600;
  font-size: 12px;
  border-radius: 6px;
}

.badge.primary {
  color: var(--primary-text);
  border-color: var(--primary-border);
  background: var(--primary-bg);
}

.badge.success {
  color: var(--success-text);
  border-color: var(--success-border);
  background: var(--success-bg);
}

.badge.info {
  color: var(--info-text);
  border-color: var(--info-border);
  background: var(--info-bg);
}

.badge.muted {
  color: var(--muted-text);
  border-color: var(--muted-border);
  background: var(--muted-bg);
}
</style>
