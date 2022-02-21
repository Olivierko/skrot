<template>
  <modal v-model:visible="isVisible">
    <div class="notification is-danger">
      <button @click="isVisible = false" class="delete"></button>
      {{ message }}
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Modal from "@/components/modal.vue";

export default defineComponent({
  name: "Notification",
  emits: ["update:visible"],
  components: {
    Modal,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: "",
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

    return { isVisible };
  },
});
</script>