<template>
  <div class="tabs">
    <ul class="tabs__list" ref="tabsList">
      <li
        v-for="(option, index) in options"
        :key="option.value"
        :class="['tabs__item', { selected: option.value === modelValue }]"
        @click="selectOption(option, index)"
        ref="tabItems"
      >
        {{ option.label }}
      </li>
      <div class="tabs__indicator" :style="indicatorStyle"></div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MyTabs',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      indicatorStyle: {
        width: '0px',
        transform: 'translateX(0px)',
      },
    }
  },
  mounted() {
    this.updateIndicator()
  },
  watch: {
    modelValue() {
      this.$nextTick(() => {
        this.updateIndicator()
      })
    },
  },
  methods: {
    selectOption(option) {
      this.$emit('update:modelValue', option.value)
    },
    updateIndicator() {
      const selectedIndex = this.options.findIndex((opt) => opt.value === this.modelValue)

      if (selectedIndex === -1 || !this.$refs.tabItems) return

      const selectedTab = this.$refs.tabItems[selectedIndex]
      const tabsList = this.$refs.tabsList

      if (!selectedTab || !tabsList) return

      const { offsetLeft, offsetWidth } = selectedTab

      this.indicatorStyle = {
        width: `${offsetWidth}px`,
        transform: `translateX(${offsetLeft}px)`,
      }
    },
  },
}
</script>

<style scoped>
.tabs {
  width: 100%;
  background: var(--text-white);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 8px;
}

.tabs__list {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
}

.tabs__item {
  position: relative;
  z-index: 2;
  padding: 8px 16px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: var(--muted-text);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  user-select: none;
}

.tabs__item:hover {
  color: var(--foreground);
}

.tabs__item.selected {
  color: var(--text-white);
  font-weight: 600;
}

.tabs__indicator {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--foreground);
  border-radius: 6px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
