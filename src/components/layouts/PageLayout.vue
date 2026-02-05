<template>
  <div class="page-layout">
    <header class="header">
      <div class="header__back">
        <button v-if="$slots['header-back']" @click="goBack" class="back__link">
          <slot name="header-back"></slot>
        </button>
      </div>

      <div class="header__title">
        <slot name="header-title"></slot>
      </div>

      <div v-if="$slots['header-action']" class="header__action">
        <slot name="header-action"></slot>
      </div>
    </header>

    <main class="main">
      <slot name="main"></slot>
    </main>

    <footer v-if="$slots.footer" class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PageLayout',
  methods: {
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
.page-layout {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: var(--bg-white);
  border-bottom: 1px solid var(--primary-border);
  z-index: 10;
  box-sizing: border-box;
  height: 70px;
}

.header__back,
.header__action {
  flex-shrink: 0;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: var(--foreground);
}

.back__link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--foreground);
  text-decoration: none;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.back__link:hover {
  background: var(--muted-bg);
}

.main {
  margin-top: 70px;
  margin-bottom: 77px;
  flex: 1;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  border-top: 1px solid var(--primary-border);
  z-index: 10;
  background: var(--bg-white);
  height: 77px;
}
</style>
