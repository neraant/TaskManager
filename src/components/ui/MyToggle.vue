<template>
  <label class="toggle">
    <input
      type="checkbox"
      class="toggle__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="toggle__slider"></span>
  </label>
</template>

<script>
export default {
  name: 'MyToggle',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>
.toggle {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: pointer;
}

.toggle__input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle__slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--muted-bg);
  border: 2px solid var(--muted-border);
  border-radius: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle__slider::before {
  content: '';
  position: absolute;
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: var(--text-white);
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle__input:checked + .toggle__slider {
  background-color: var(--primary-bg);
  border-color: var(--primary-border);
}

.toggle__input:checked + .toggle__slider::before {
  transform: translateX(20px);
  background-color: var(--primary-text);
}

.toggle:hover .toggle__slider {
  border-color: var(--primary-border);
}

.toggle__input:focus + .toggle__slider {
  box-shadow: 0 0 0 3px var(--primary-shadow);
}

.toggle__input:disabled + .toggle__slider {
  opacity: 0.5;
  cursor: not-allowed;
}

.toggle__input:disabled ~ .toggle__slider {
  cursor: not-allowed;
}
</style>
