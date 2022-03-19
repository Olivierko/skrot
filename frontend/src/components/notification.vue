<template>
  <modal v-model:visible="isVisible">
    <div class="notification is-danger">
      <button @click="isVisible = false" class="delete"></button>
      {{ message }}
    </div>
  </modal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Modal from "@/components/modal.vue";

const emit = defineEmits(["update:visible"]);

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    default: "",
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
</script>