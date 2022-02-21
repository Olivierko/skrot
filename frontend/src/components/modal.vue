<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="isVisible" class="modal is-active">
        <div @click="onClose" class="modal-background"></div>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "Modal",
  emits: ["update:visible", "close"],
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isVisible = computed<boolean>({
      get() {
        return props.visible;
      },
      set(value) {
        emit("update:visible", value);
      },
    });

    const onClose = () => {
      isVisible.value = false;
      emit("close");
    };

    const keyPress = (event: KeyboardEvent) => {
      if (!isVisible.value) {
        return;
      }

      let key = event.key || event.keyCode;
      if (key === "Escape" || key === "Esc" || key === 27) {
        isVisible.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("keyup", keyPress);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("keyup", keyPress);
    });

    return {
      isVisible,
      onClose,
    };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>