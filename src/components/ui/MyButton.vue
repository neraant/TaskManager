<template>
  <button @click="onClick" :disabled="disabled" :class="['button', variant]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    variant: {
      type: String,
      required: false,
      default: 'primary',
      validator: (value) => {
        return ['primary', 'ghost', 'outline'].includes(value)
      },
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['click'],
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>

<style scoped>
.button {
  padding: 12px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 12px;
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-weight: 600;
}

.button.primary {
  background: var(--foreground);
  color: var(--text-white);
  box-shadow: 0px 4px 8px 1px var(--black-shadow);
}
.button.primary:hover {
  box-shadow: 0px 8px 10px 3px var(--black-shadow);
  transform: translateY(-1px);
}
.button.primary:active {
  box-shadow: 0px 4px 8px 1px var(--black-shadow);
  transform: translateY(2px);
}

.button.ghost {
  color: var(--foreground);
}
.button.ghost:hover {
  opacity: 0.8;
}

.button.outline {
  color: var(--foreground);
  border: 1px solid var(--foreground);
}
.button.outline:hover {
  background: var(--foreground);
  color: var(--text-white);
}

.button:disabled {
  box-shadow: none;
  background: var(--muted-bg);
  color: var(--muted-text);
  cursor: not-allowed;
}
</style>
