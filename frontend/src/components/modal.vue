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

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits(["update:visible", "close"]);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
});

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