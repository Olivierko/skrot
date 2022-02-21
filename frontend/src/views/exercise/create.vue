<template>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <section class="section has-background-light">
        <div class="container">
          <p class="title">New exercise</p>
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
import { defineComponent, ref, reactive } from "vue";
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
  setup() {
    const router = useRouter();
    const { create } = useExercises();
    const { isLoading: isCategoriesLoading, categories } = useCategories();
    const { isLoading: isMuscleGroupsLoading, muscleGroups } = useMuscleGroups();
    const isLoading = ref(false);
    const hasNotification = ref(false);
    const notificationMessage = ref("");

    const model = reactive<Exercise>({
      id: "",
      name: "",
      description: "",
      categoryId: "",
      muscleGroupId: "",
    });

    const onSubmit = async () => {
      isLoading.value = true;
      const result = await create(model);
      isLoading.value = false;

      if (result.success) {
        router.push({ name: "/exercise/list" });
      } else {
        hasNotification.value = true;
        notificationMessage.value = result.error ?? "";
      }
    };

    return {
      model,
      isLoading,
      categories,
      isCategoriesLoading,
      muscleGroups,
      isMuscleGroupsLoading,
      hasNotification,
      notificationMessage,
      onSubmit,
    };
  },
});
</script>