<template>
  <div class="card is-fullwidth block">
    <header @click="isOpen = !isOpen" class="card-header is-clickable is-unselectable">
      <slot name="header"></slot>
    </header>
    <transition-expand :show="isOpen">
      <div class="card-content">
        <slot></slot>
      </div>
    </transition-expand>
    <footer class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import TransitionExpand from "@/components/transition-expand.vue";

export default defineComponent({
  name: "Card",
  emits: ["update:open"],
  components: {
    TransitionExpand,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isOpen = computed<boolean>({
      get() {
        return props.open;
      },
      set(value) {
        emit("update:open", value);
      },
    });

    return {
      isOpen,
    };
  },
});
</script>