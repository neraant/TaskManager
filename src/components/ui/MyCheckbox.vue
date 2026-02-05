<template>
  <label class="checkbox">
    <input
      type="checkbox"
      class="checkbox__input"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkbox__checkmark"></span>
    <span v-if="$slots.default" class="checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'MyCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox__checkmark {
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid var(--muted-border);
  border-radius: 4px;
  background-color: white;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.checkbox__input:checked ~ .checkbox__checkmark {
  background-color: var(--primary-bg);
  border-color: var(--primary-border);
}

.checkbox__input:checked ~ .checkbox__checkmark::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid var(--primary-text);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox__input:focus ~ .checkbox__checkmark {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.checkbox__input:disabled ~ .checkbox__checkmark {
  background-color: var(--muted-bg);
  border-color: var(--muted-border);
  cursor: not-allowed;
}

.checkbox__label {
  font-size: 14px;
  color: var(--foreground);
}

.checkbox:hover .checkbox__checkmark {
  border-color: var(--primary-border);
}
</style>
