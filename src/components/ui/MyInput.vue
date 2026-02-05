<template>
  <div class="input">
    <input
      :class="['input__field', { 'input__field--error': isError }]"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="isDisabled"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="isError" class="input__error">
      <CircleAlert :size="12" />
      {{ errorText }}
    </span>
  </div>
</template>

<script>
import { CircleAlert } from 'lucide-vue-next'

export default {
  name: 'MyInput',
  components: {
    CircleAlert,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    isDisabled: {
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
.input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.input__field {
  padding: 12px;
  border: none;
  width: 100%;
  outline: 1px solid var(--primary-border);
  border-radius: 8px;
  font-size: 16px;
  color: var(--foreground);
  transition: outline 0.2s ease;
  background-color: var(--text-white);
}

.input__field::placeholder {
  color: var(--muted-text);
}

.input__field:focus {
  outline: 2px solid var(--foreground);
}

.input__field--error {
  outline: 1px solid var(--error-text);
}

.input__field--error:focus {
  outline: 2px solid var(--error-text);
}

.input__field:disabled {
  background-color: var(--muted-bg);
  cursor: not-allowed;
  opacity: 0.6;
}

.input__error {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--error-text);
}
</style>
