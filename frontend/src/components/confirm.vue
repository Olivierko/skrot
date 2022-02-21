<template>
  <modal v-model:visible="isOpen" @close="onClose">
    <div class="card is-radiusless">
      <div class="card-content">
        <div class="content">
          <slot></slot>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" @click.prevent="onCancel" class="card-footer-item has-background-light has-text-dark">{{ cancel }}</a>
        <a href="#" @click.prevent="onConfirm" class="card-footer-item has-background-danger has-text-white">{{ confirm }}</a>
      </footer>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Modal from "@/components/modal.vue";

export default defineComponent({
  name: "Confirm",
  emits: ["update:open", "canceled", "confirmed"],
  components: {
    Modal,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    cancel: {
      type: String,
      default: "Cancel",
    },
    confirm: {
      type: String,
      default: "OK",
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

    const onClose = () => {
      emit("canceled");
    };

    const onCancel = () => {
      isOpen.value = false;
      emit("canceled");
    };

    const onConfirm = () => {
      isOpen.value = false;
      emit("confirmed");
    };

    return {
      isOpen,
      onClose,
      onCancel,
      onConfirm,
    };
  },
});
</script>