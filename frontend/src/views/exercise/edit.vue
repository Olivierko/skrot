<template>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <section class="section has-background-light">
        <div class="container">
          <p class="title">
            Edit exercise
            <button @click.prevent="promptRemove = true" class="button is-pulled-right is-danger">
              <span class="icon is-small">
                <i class="fas fa-trash-alt"></i>
              </span>
            </button>
          </p>

          <div class="field">
            <div class="control">
              <input class="input" type="text" required placeholder="Name" v-model="model.name" />
            </div>
          </div>
          <div class="field">
            <div class="control is-expanded has-icons-left">
              <span class="select is-fullwidth" :class="{ 'is-loading': isCategoriesLoading }">
                <select v-model="model.categoryId" required>
                  <option value="" disabled selected>Select category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="fas fa-tag"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control is-expanded has-icons-left">
              <span class="select is-fullwidth" :class="{ 'is-loading': isMuscleGroupsLoading }">
                <select v-model="model.muscleGroupId" required>
                  <option value="" disabled selected>Select muscle group</option>
                  <option v-for="muscleGroup in muscleGroups" :key="muscleGroup.id" :value="muscleGroup.id">
                    {{ muscleGroup.name }}
                  </option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="fas fa-tag"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <textarea class="textarea block" placeholder="Description" v-model="model.description"></textarea>
            </div>
          </div>
        </div>
      </section>

      <confirm v-model:open="promptRemove" @confirmed="onRemove" cancel="No" confirm="Yes">
        <span class="title is-size-5 has-text-weight-bold">Remove exercise</span>
        <div>Are you sure you want to remove this exercise?</div>
      </confirm>

      <div class="box field is-grouped is-grouped-right">
        <div class="control">
          <button type="submit" class="button is-dark">Submit</button>
        </div>
        <div class="control">
          <router-link class="button is-light" to="/exercise/list">Cancel</router-link>
        </div>
      </div>
    </div>
    <loading-overlay :visible="isLoading"></loading-overlay>
    <notification v-model:visible="hasNotification" :message="notificationMessage"></notification>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Exercise } from "@/types";
import { useExercises } from "@/composables/useExercises";
import { useCategories } from "@/composables/useCategories";
import { useMuscleGroups } from "@/composables/useMuscleGroups";
import Confirm from "@/components/confirm.vue";
import LoadingOverlay from "@/components/loading-overlay.vue";
import Notification from "@/components/notification.vue";

export default defineComponent({
  components: {
    Confirm,
    LoadingOverlay,
    Notification,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const { get, edit, remove, isLoading } = useExercises();
    const { isLoading: isCategoriesLoading, categories } = useCategories();
    const { isLoading: isMuscleGroupsLoading, muscleGroups } = useMuscleGroups();
    const promptRemove = ref(false);
    const hasNotification = ref(false);
    const notificationMessage = ref("");

    const model = reactive<Exercise>({
      id: props.id,
      name: "",
      description: "",
      categoryId: "",
      muscleGroupId: "",
    });

    const onSubmit = async () => {
      const result = await edit(props.id, model);

      if (result.success) {
        router.push({ name: "/exercise/list" });
      } else {
        hasNotification.value = true;
        notificationMessage.value = result.error ?? "";
      }
    };

    const onRemove = async () => {
      const result = await remove(props.id);

      if (result.success) {
        router.push({ name: "/exercise/list" });
      } else {
        hasNotification.value = true;
        notificationMessage.value = result.error ?? "";
      }
    };

    onMounted(async () => {
      const exercise = await get(props.id);
      model.name = exercise.name;
      model.description = exercise.description;
      model.categoryId = exercise.categoryId;
      model.muscleGroupId = exercise.muscleGroupId;
    });

    return {
      model,
      isLoading,
      promptRemove,
      categories,
      isCategoriesLoading,
      muscleGroups,
      isMuscleGroupsLoading,
      hasNotification,
      notificationMessage,
      onSubmit,
      onRemove,
    };
  },
});
</script>