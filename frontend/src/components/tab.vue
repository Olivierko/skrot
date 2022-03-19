<template>
  <div v-show="isSelected">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const selectedTitle = ref(inject<String>("selectedTitle"));

const isSelected = computed<boolean>(() => {
  return selectedTitle.value === props.title;
});
</script>