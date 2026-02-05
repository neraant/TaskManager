<template>
  <transition name="overlay">
    <div v-if="isOpen" class="dialog" @click="closeDialog">
      <div class="dialog__content" @click.stop>
        <div class="dialog__header">
          <slot name="header">
            <span class="dialog__header__text">
              {{ headerText }}
            </span>
          </slot>
          <button @click="closeDialog" class="dialog__close__button">
            <X :size="14" class="dialog__close__icon" />
          </button>
        </div>
        <div class="dialog__body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="dialog__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { X } from 'lucide-vue-next'

export default {
  name: 'MyDialog',
  components: {
    X,
  },
  props: {
    headerText: {
      type: String,
      required: false,
      default: '',
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      escapeHandler: null as ((e: KeyboardEvent) => void) | null,
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:isOpen', false)
    },
  },
  watch: {
    isOpen() {
      if (this.isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
  },
  mounted() {
    this.escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.closeDialog()
      }
    }
    window.addEventListener('keydown', this.escapeHandler)
  },
  beforeUnmount() {
    if (this.escapeHandler) {
      window.removeEventListener('keydown', this.escapeHandler)
    }
    document.body.style.overflow = 'auto'
  },
}
</script>

<style scoped>
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 16px;
}

.dialog__content {
  margin: auto;
  padding: 0;
  background: var(--bg-white);
  border-radius: 12px;
  min-width: 400px;
  max-width: 500px;
  max-height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dialog__header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  flex-shrink: 0;
}

.dialog__header__text {
  font-size: 16px;
  font-weight: 600;
}

.dialog__body {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
}

.dialog__footer {
  padding: 16px;
  border-top: 1px solid var(--border-color, #e5e7eb);
  flex-shrink: 0;
}

.dialog__close__button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  color: var(--text-primary, #000);
}

.dialog__close__button:hover {
  background-color: var(--hover-bg, #f3f4f6);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-active .dialog__content,
.overlay-leave-active .dialog__content {
  transition: all 0.4s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.overlay-enter-from .dialog__content,
.overlay-leave-to .dialog__content {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 480px) {
  .dialog__content {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>
