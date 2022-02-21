<template>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <section class="section has-background-light">
        <div class="container">
          <p class="title">User profile</p>
          <div class="field">
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="model.unit" required>
                  <option value="" disabled selected>Select unit</option>
                  <option v-for="unit in units" :key="unit" :value="unit">{{ unit }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="box field is-grouped is-grouped-right">
        <div class="control">
          <button type="submit" class="button is-dark">Save</button>
        </div>
        <div class="control">
          <router-link class="button is-light" to="/">Cancel</router-link>
        </div>
      </div>
    </div>
    <loading-overlay :visible="isLoading"></loading-overlay>
    <notification v-model:visible="hasNotification" :message="notificationMessage"></notification>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useProfile } from "@/composables/useProfile";
import { units } from "@/utilities/constants";
import LoadingOverlay from "@/components/loading-overlay.vue";
import Notification from "@/components/notification.vue";

export default defineComponent({
  components: {
    LoadingOverlay,
    Notification,
  },
  setup() {
    const { isLoading, profile: model, edit } = useProfile();
    const hasNotification = ref(false);
    const notificationMessage = ref("");

    const onSubmit = async () => {
      const response = await edit(model);

      if (!response.success) {
        hasNotification.value = true;
        notificationMessage.value = response.error ?? "";
      }
    };

    return {
      units,
      model,
      isLoading,
      hasNotification,
      notificationMessage,
      onSubmit,
    };
  },
});
</script>