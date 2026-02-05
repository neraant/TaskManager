<template>
  <div class="select__container" :class="{ error: isError }">
    <div class="select" :class="{ open: isOpen, error: isError }" @click="toggleDropdown">
      <span class="select__value">
        {{ selectedLabel || placeholder }}
      </span>
      <ChevronDown class="select__arrow" :class="{ rotate: isOpen }" :size="16" />
    </div>

    <transition name="dropdown">
      <ul v-if="isOpen" class="select__dropdown">
        <li
          v-for="option in options"
          :key="option.value"
          class="select__option"
          :class="{ selected: option.value === modelValue }"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>

    <span class="select__error__text" v-if="isError"
      ><CircleAlert size="12" /> {{ errorText }}</span
    >
  </div>
</template>

<script>
import { ChevronDown, CircleAlert } from 'lucide-vue-next'

export default {
  name: 'MySelect',
  components: {
    ChevronDown,
    CircleAlert,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Select option',
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
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    selectedLabel() {
      const selected = this.options.find((opt) => opt.value === this.modelValue)
      return selected ? selected.label : ''
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown)
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.$emit('update:modelValue', option.value)
      this.isOpen = false
    },
    closeDropdown(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
      }
    },
  },
}
</script>

<style scoped>
.select__container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 8px;
  background-color: var(--text-white);
  border: none;
  outline: 1px solid var(--primary-border);
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: outline 0.2s ease;
  user-select: none;
}

.select:hover {
  outline: 1px solid var(--foreground);
}

.select.open {
  outline: 2px solid var(--foreground);
}

.select.error {
  outline: 1px solid var(--error-text);
}

.select.error:hover,
.select.error.open {
  outline: 2px solid var(--error-text);
}

.select__value {
  color: var(--foreground);
  flex: 1;
}

.select__value:empty::before {
  content: attr(data-placeholder);
  color: var(--muted-text);
}

.select__arrow {
  color: var(--muted-text);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.select__arrow.rotate {
  transform: rotate(180deg);
}
.select__container .select__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: var(--text-white);
  border: 1px solid var(--primary-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  list-style: none;
  padding: 4px;
  margin: 0;
}

.select__option {
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.15s ease;
  font-size: 14px;
  color: var(--foreground);
}

.select__option:hover {
  background-color: var(--primary-bg);
}

.select__option.selected {
  background-color: var(--primary-bg);
  color: var(--primary-text);
  font-weight: 600;
}

.select__error__text {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--error-text);
}

/* Transition animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform-origin: top;
}

.dropdown-enter-from {
  opacity: 0;
  transform: scaleY(0.9);
}

.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}
</style>
