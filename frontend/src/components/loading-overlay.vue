<template>
  <transition name="fade">
    <div v-if="visible" class="loader-wrapper is-overlay">
      <div class="loader is-loading"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loader-wrapper {
  background-color: rgba(10, 10, 10, 0.86);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.loader {
  height: 80px;
  width: 80px;
}
</style>