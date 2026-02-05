<template>
  <div class="textarea__container">
    <textarea
      :class="['textarea', { error: isError }]"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="isDisabled"
      :rows="rows"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span class="textarea__error__text" v-if="isError">
      <CircleAlert :size="12" />
      {{ errorText }}
    </span>
  </div>
</template>

<script>
import { CircleAlert } from 'lucide-vue-next'

export default {
  name: 'MyTextarea',
  components: {
    CircleAlert,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 4,
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
.textarea__container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.textarea {
  padding: 12px;
  border: none;
  width: 100%;
  outline: 1px solid var(--primary-border);
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--foreground);
  transition: outline 0.2s ease;
  background-color: var(--text-white);
  resize: none;
  font-family: inherit;
  min-height: 80px;
}

.textarea::placeholder {
  color: var(--muted-text);
}

.textarea:focus {
  outline: 2px solid var(--foreground);
}

.textarea.error {
  outline: 1px solid var(--error-text);
}

.textarea.error:focus {
  outline: 2px solid var(--error-text);
}

.textarea__error__text {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--error-text);
}

.textarea:disabled {
  background-color: var(--muted-bg);
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
