<template>
  <div class="timepicker">
    <label v-if="label" class="timepicker__label">
      {{ label }}
    </label>
    <div class="timepicker__wrapper">
      <input
        type="time"
        :class="['timepicker__input', { 'timepicker__input--error': isError }]"
        :value="modelValue"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <Clock1 class="timepicker__icon" :size="16" />
    </div>
    <span v-if="isError" class="timepicker__error">
      <CircleAlert :size="12" />
      {{ errorText }}
    </span>
  </div>
</template>

<script>
import { Clock1, CircleAlert } from 'lucide-vue-next'

export default {
  name: 'MyTimePicker',
  components: {
    Clock1,
    CircleAlert,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>
.timepicker {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.timepicker__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--foreground);
  margin-bottom: 4px;
}

.timepicker__wrapper {
  position: relative;
  width: 100%;
}

.timepicker__input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 44px;
  padding: 0 40px 0 12px;
  border: none;
  outline: 1px solid var(--primary-border);
  border-radius: 8px;
  font-size: 16px;
  line-height: 44px;
  color: var(--foreground);
  background-color: var(--text-white);
  transition: outline 0.2s ease;
  font-family: inherit;
  cursor: pointer;
  box-sizing: border-box;
}

.timepicker__input::-webkit-calendar-picker-indicator {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.timepicker__icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted-text);
  pointer-events: none;
}

.timepicker__input:focus {
  outline: 2px solid var(--foreground);
}

.timepicker__input--error {
  outline: 1px solid var(--error-text);
}

.timepicker__input--error:focus {
  outline: 2px solid var(--error-text);
}

.timepicker__input:disabled {
  background-color: var(--muted-bg);
  cursor: not-allowed;
  opacity: 0.6;
}

.timepicker__error {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--error-text);
}
</style>
