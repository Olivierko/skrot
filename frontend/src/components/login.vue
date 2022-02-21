<template>
  <modal :visible="!isAuthenticated">
    <form @submit.prevent="onSubmit" class="box is-radiusless">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input v-model="credentials.username" class="input" type="text" placeholder="Username" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input v-model="credentials.password" class="input" type="password" placeholder="********" required />
        </div>
      </div>

      <button type="submit" class="button is-primary">Log in</button>
      <loading-overlay :visible="isLoading"></loading-overlay>
      <notification v-model:visible="hasNotification" :message="notificationMessage"></notification>
    </form>
  </modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "@/composables/useApi";
import Modal from "@/components/modal.vue";
import LoadingOverlay from "@/components/loading-overlay.vue";
import Notification from "@/components/notification.vue";
import { Credentials } from "@/types";

export default defineComponent({
  name: "Login",
  components: {
    Modal,
    LoadingOverlay,
    Notification,
  },
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const { login } = useApi();
    const credentials = reactive<Credentials>({ username: "", password: "" });
    const isLoading = ref(false);
    const hasNotification = ref(false);
    const notificationMessage = ref("");

    const onSubmit = async () => {
      isLoading.value = true;
      const response = await login(credentials);
      isLoading.value = false;

      if (!response.success) {
        hasNotification.value = true;
        notificationMessage.value = response.error ?? "";
      } else {
        router.go(0);
      }
    };

    return {
      credentials,
      isLoading,
      hasNotification,
      notificationMessage,
      onSubmit,
    };
  },
});
</script>