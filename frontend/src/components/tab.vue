<template>
  <div v-show="isSelected">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from "vue";

export default defineComponent({
  name: "Tab",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const selectedTitle = ref(inject<String>("selectedTitle"));

    const isSelected = computed<boolean>(() => {
      return selectedTitle.value === props.title;
    });

    return {
      isSelected,
    };
  },
});
</script>