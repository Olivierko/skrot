<template>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <section class="section has-background-light">
        <div class="container">
          <p class="title">New muscle group</p>
          <div class="field">
            <div class="control">
              <input class="input" type="text" required placeholder="Name" v-model="model.name" />
            </div>
          </div>
        </div>
      </section>

      <div class="box field is-grouped is-grouped-right">
        <div class="control">
          <button type="submit" class="button is-dark">Submit</button>
        </div>
        <div class="control">
          <router-link class="button is-light" to="/muscle-group/list">Cancel</router-link>
        </div>
      </div>
    </div>
    <loading-overlay :visible="isLoading"></loading-overlay>
    <notification v-model:visible="hasNotification" :message="notificationMessage"></notification>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { MuscleGroup } from "@/types";
import { useMuscleGroups } from "@/composables/useMuscleGroups";
import LoadingOverlay from "@/components/loading-overlay.vue";
import Notification from "@/components/notification.vue";

const router = useRouter();
const { create } = useMuscleGroups();
const isLoading = ref(false);
const hasNotification = ref(false);
const notificationMessage = ref("");

const model = reactive<MuscleGroup>({
  id: "",
  name: "",
});

const onSubmit = async () => {
  isLoading.value = true;
  const result = await create(model);
  isLoading.value = false;

  if (result.success) {
    router.push({ name: "/muscle-group/list" });
  }
  else {
    hasNotification.value = true;
    notificationMessage.value = result.error ?? "";
  }
};
</script>