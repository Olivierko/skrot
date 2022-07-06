<template>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <section class="section has-background-light">
        <div class="container">
          <p class="title">New workout</p>
        </div>
      </section>

      <workout-editor v-model:entry="model"></workout-editor>

      <confirm v-model:open="promptCancel" @confirmed="onCancel" cancel="No" confirm="Yes">
        <span class="title is-size-5 has-text-weight-bold">Cancel workout</span>
        <div>Are you sure you want to discard your current workout?</div>
      </confirm>

      <div class="box field is-grouped is-grouped-right">
        <div class="control">
          <button type="submit" class="button is-dark" :class="{ 'is-loading': isLoading }">Submit</button>
        </div>
        <div class="control">
          <button
            @click.prevent="promptCancel = true"
            class="button is-light"
            :disabled="isLoading"
          >Cancel</button>
        </div>
      </div>
    </div>
    <loading-overlay :visible="isLoading"></loading-overlay>
    <notification v-model:visible="hasNotification" :message="notificationMessage"></notification>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Confirm from "@/components/confirm.vue";
import WorkoutEditor from "@/components/workout-editor.vue";
import LoadingOverlay from "@/components/loading-overlay.vue";
import Notification from "@/components/notification.vue";
import { useWorkouts, reviver } from "@/composables/useWorkouts";
import { useLocalStoreSync, LocalStoreSyncOptions } from "@/composables/useLocalStoreSync";
import { Workout } from "@/types";

const router = useRouter();
const { create } = useWorkouts();
const defaultWorkout: Workout = {
  id: "",
  start: new Date(),
  end: new Date(),
  name: null,
  muscleGroups: [],
  exercises: [],
};

const parse = (source: string): Workout => JSON.parse(source, reviver) as Workout;
const validate = (source: string): boolean => source !== JSON.stringify(defaultWorkout);

const storeOptions: LocalStoreSyncOptions<Workout> = {
  key: "new-workout",
  parse: parse,
  validate: validate,
  default: defaultWorkout,
};

const { item: model, reset } = useLocalStoreSync<Workout>(storeOptions);

const isLoading = ref(false);
const promptCancel = ref(false);
const hasNotification = ref(false);
const notificationMessage = ref("");

const onCancel = () => {
  defaultWorkout.start = new Date();
  defaultWorkout.end = new Date();
  defaultWorkout.name = null;

  reset();
  router.push({ name: "/workout/list" });
};

const onSubmit = async () => {
  isLoading.value = true;
  const result = await create(model);
  isLoading.value = false;

  if (result.success) {
    reset();
    router.push({ name: "/workout/list" });
  }
  else {
    hasNotification.value = true;
    notificationMessage.value = result.error ?? "";
  }
};
</script>