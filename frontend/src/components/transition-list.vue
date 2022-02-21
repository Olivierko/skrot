<template>
  <transition-group name="list">
    <slot></slot>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TransitionList",
});
</script>

<style>
.list-move {
  transition: transform 0.4s ease;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s linear;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
  transform: translateX(20px);
}

.list-item {
  z-index: 2;
}

.list-item.is-active {
  z-index: 3;
}
</style>