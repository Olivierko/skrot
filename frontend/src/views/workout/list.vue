<template>
  <div class="container">
    <section class="section has-background-light">
      <div class="container">
        <p class="title">
          Workouts
          <router-link class="button is-pulled-right" to="/workout/new">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
          </router-link>
        </p>
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>
                <abbr title="Start">When</abbr>
              </th>
              <th>
                <abbr title="Duration">Duration</abbr>
              </th>
              <th>
                <abbr title="Name">Name/Muscle groups</abbr>
              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="workout in workouts" :key="workout.id" class="list-item">
              <td>{{ toPrettyDate(workout.start) }}</td>
              <td>{{ toDifference(workout.start, workout.end) }}</td>
              <td>{{ displayName(workout) }}</td>
              <td class="is-narrow">
                <div class="field has-addons is-pulled-right">
                  <p class="control">
                    <button @click="copy(workout)" class="button">
                      <span class="icon is-small">
                        <i class="fas fa-copy"></i>
                      </span>
                    </button>
                  </p>
                  <p class="control">
                    <button @click="edit(workout)" class="button">
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
        <pagination v-model:page="page" :totalPages="pages" :isLoading="isLoading"></pagination>
        <span class="is-pulled-right is-italic">Showing {{ count }} results</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Workout } from "@/types";
import { useWorkouts } from "@/composables/useWorkouts";
import { toPrettyDate, toDifference } from "@/utilities/date";
import Pagination from "@/components/pagination.vue";

const router = useRouter();
const { workouts, page, pages, count, isLoading } = useWorkouts();

const displayName = (workout: Workout) => {
  return (workout.name === undefined || workout.name === null || workout.name.length === 0) 
    ? workout.muscleGroups.join(', ')
    : workout.name;
};

const copy = async (workout: Workout) => {
  router.push({ name: "/workout/copy", params: { id: workout.id } });
};

const edit = (workout: Workout) => {
  router.push({ name: "/workout/edit", params: { id: workout.id } });
};
</script>