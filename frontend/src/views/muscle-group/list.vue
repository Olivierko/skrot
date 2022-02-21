<template>
  <div class="container">
    <section class="section has-background-light">
      <div class="container">
        <p class="title">
          Muscle groups
          <router-link class="button is-pulled-right" to="/muscle-group/new">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
          </router-link>
        </p>
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th><abbr title="Name">Name</abbr></th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="muscleGroup in muscleGroups" :key="muscleGroup.id" class="list-item">
              <td>{{ muscleGroup.name }}</td>
              <td class="is-narrow">
                <div class="field has-addons is-pulled-right">
                  <p class="control">
                    <button @click="edit(muscleGroup)" class="button">
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
import { MuscleGroup } from "@/types";
import { useMuscleGroups } from "@/composables/useMuscleGroups";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { muscleGroups } = useMuscleGroups();

    const edit = (muscleGroup: MuscleGroup) => {
      router.push({ name: "/muscle-group/edit", params: { id: muscleGroup.id } });
    };

    return {
      muscleGroups,
      edit,
    };
  },
});
</script>