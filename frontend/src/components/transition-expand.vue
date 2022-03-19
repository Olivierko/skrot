<template>
  <transition name="expand" @enter="enter" @afterEnter="afterEnter" @leave="leave">
    <slot v-if="show"></slot>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
  },
});

const enter = (el: Element) => {
  const element = el as HTMLElement;
  const { width } = getComputedStyle(element);
  element.style.width = width;
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.height = "auto";

  const { height } = getComputedStyle(element);
  element.style.width = "";
  element.style.position = "";
  element.style.visibility = "";
  element.style.height = "0";

  // force re-paint
  getComputedStyle(element).height;

  requestAnimationFrame(() => {
    element.style.height = height;
  });
};

const afterEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = "auto";
};

const leave = (el: Element) => {
  const element = el as HTMLElement;
  const { height } = getComputedStyle(element);
  element.style.height = height;

  // force re-paint
  getComputedStyle(element).height;

  requestAnimationFrame(() => {
    element.style.height = "0";
  });
};
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  transition: height 0.15s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  height: 0;
}
</style>