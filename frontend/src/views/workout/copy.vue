<template>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <section class="section has-background-light">
        <div class="container">
          <p class="title">Copy workout</p>
        </div>
      </section>

      <workout-editor v-model:entry="model"></workout-editor>

      <div class="box field is-grouped is-grouped-right">
        <div class="control">
          <button type="submit" class="button is-dark">Submit</button>
        </div>
        <div class="control">
          <router-link class="button is-light" to="/workout/list">Cancel</router-link>
        </div>
      </div>
    </div>
    <loading-overlay :visible="isLoading"></loading-overlay>
    <notification v-model:visible="hasNotification" :message="notificationMessage"></notification>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Workout } from "@/types";
import { useWorkouts } from "@/composables/useWorkouts";
import WorkoutEditor from "@/components/workout-editor.vue";
import LoadingOverlay from "@/components/loading-overlay.vue";
import Notification from "@/components/notification.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const { get, create, isLoading } = useWorkouts();
const hasNotification = ref(false);
const notificationMessage = ref("");

const model = reactive<Workout>({
  id: "",
  start: new Date(),
  end: new Date(),
  name: null,
  muscleGroups: [],
  exercises: [],
});

const onSubmit = async () => {
  const result = await create(model);

  if (result.success) {
    router.push({ name: "/workout/list" });
  }
  else {
    hasNotification.value = true;
    notificationMessage.value = result.error ?? "";
  }
};

onMounted(async () => {
  const workout = await get(props.id);
  model.name = workout.name;
  model.exercises = workout.exercises;
});
</script>