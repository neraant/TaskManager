<template>
  <span class="symbols__counter" :class="{ exceeded: isExceeded }">
    {{ symbolsCount }} / {{ maxSymbols }}
  </span>
</template>

<script>
export default {
  name: 'MySymbolsCounter',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    maxSymbols: {
      type: Number,
      default: 500,
    },
  },
  computed: {
    symbolsCount() {
      return this.modelValue.length
    },
    isExceeded() {
      return this.symbolsCount > this.maxSymbols
    },
  },
}
</script>

<style scoped>
.symbols__counter {
  display: flex;
  font-size: 12px;
  color: var(--muted-text);
  user-select: none;
}

.symbols__counter.exceeded {
  color: var(--error-text);
  font-weight: 600;
}
</style>
