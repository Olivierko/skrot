<template>
  <div class="container">
    <section class="section has-background-light">
      <div class="container">
        <p class="title">
          Exercises
          <router-link class="button is-pulled-right" to="/exercise/new">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
          </router-link>
        </p>
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th><abbr title="Name">Name</abbr></th>
              <th><abbr title="Category">Category</abbr></th>
              <th><abbr title="Category">Muscle group</abbr></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exercise in exercises" :key="exercise.id" class="list-item">
              <td>{{ exercise.name }}</td>
              <td>{{ findCategory(exercise.categoryId)?.name ?? "UNKNOWN_CATEGORY" }}</td>
              <td>{{ findMuscleGroup(exercise.muscleGroupId)?.name ?? "UNKNOWN_MUSCLE_GROUP" }}</td>
              <td class="is-narrow">
                <div class="field has-addons is-pulled-right">
                  <p class="control">
                    <button @click="edit(exercise)" class="button">
                      <span class="icon is-small">
                        <i class="fas fa-edit"></i>
                      </span>
                    </button>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Exercise } from "@/types";
import { useExercises } from "@/composables/useExercises";
import { useCategories } from "@/composables/useCategories";
import { useMuscleGroups } from "@/composables/useMuscleGroups";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { exercises } = useExercises();
    const { find: findCategory } = useCategories();
    const { find: findMuscleGroup } = useMuscleGroups();

    const edit = (exercise: Exercise) => {
      router.push({ name: "/exercise/edit", params: { id: exercise.id } });
    };

    return {
      exercises,
      findCategory,
      findMuscleGroup,
      edit,
    };
  },
});
</script>