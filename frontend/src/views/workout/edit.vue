<template>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <section class="section has-background-light">
        <div class="container">
          <p class="title">
            Edit workout
            <button
              @click.prevent="promptRemove = true"
              class="button is-pulled-right is-danger"
            >
              <span class="icon is-small">
                <i class="fas fa-trash-alt"></i>
              </span>
            </button>
          </p>
        </div>
      </section>

      <workout-editor v-model:entry="model"></workout-editor>

      <confirm v-model:open="promptRemove" @confirmed="onRemove" cancel="No" confirm="Yes">
        <span class="title is-size-5 has-text-weight-bold">Remove workout</span>
        <div>Are you sure you want to remove this workout?</div>
      </confirm>

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
import Confirm from "@/components/confirm.vue";
import LoadingOverlay from "@/components/loading-overlay.vue";
import Notification from "@/components/notification.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const { get, edit, remove, isLoading } = useWorkouts();
const promptRemove = ref(false);
const hasNotification = ref(false);
const notificationMessage = ref("");

const model = reactive<Workout>({
  id: props.id,
  start: new Date(),
  end: new Date(),
  exercises: [],
});

const onSubmit = async () => {
  const result = await edit(props.id, model);

  if (result.success) {
    router.push({ name: "/workout/list" });
  }
  else {
    hasNotification.value = true;
    notificationMessage.value = result.error ?? "";
  }
};

const onRemove = async () => {
  const result = await remove(props.id);

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
  model.start = workout.start;
  model.end = workout.end;
  model.exercises = workout.exercises;
});
</script>