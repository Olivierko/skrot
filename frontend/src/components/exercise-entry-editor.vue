<template>
  <card v-model:open="isOpen">
    <template #header>
      <a href="#" v-if="isOpen" class="card-header-icon">
        <i class="fa fa-angle-up"></i>
      </a>
      <a href="#" v-else class="card-header-icon">
        <i class="fa fa-angle-down"></i>
      </a>
      <p class="card-header-title p-0">{{ exercise?.name }}</p>
      <a href="#" @click="onMoveUp" class="card-header-icon">
        <i class="fa fa-arrow-up"></i>
      </a>
      <a href="#" @click="onMoveDown" class="card-header-icon">
        <i class="fa fa-arrow-down"></i>
      </a>
      <a
        href="#"
        @click.stop.prevent="promptRemove = true"
        class="card-header-icon has-background-danger has-text-white"
      >
        <i class="fa fa-times"></i>
      </a>
      <confirm v-model:open="promptRemove" @confirmed="onRemove" cancel="No" confirm="Yes">
        <span class="title is-size-5 has-text-weight-bold">Remove exercise</span>
        <div>Are you sure you want to remove {{ exercise?.name }}?</div>
      </confirm>
    </template>
    <template #default>
      <tabs>
        <tab title="Entry" icon="fa-user-edit">
          <textarea class="textarea block" placeholder="Notes" v-model="model.notes"></textarea>
          <article v-if="!model.sets.length" class="message is-danger">
            <div class="message-body">No set data</div>
          </article>
          <table v-else class="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>
                  <abbr title="#">#</abbr>
                </th>
                <th>
                  <abbr title="Repititions">Reps</abbr>
                </th>
                <th>
                  <abbr title="Weight">Weight</abbr>
                </th>
                <th>
                  <abbr title="Unit">Unit</abbr>
                </th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <transition-list>
                <tr
                  v-for="(setEntry, setEntryIndex) in model.sets"
                  :key="setEntry.id"
                  class="list-item"
                  :class="{ 'is-active': movingSetEntry === setEntry.id }"
                >
                  <exercise-set-entry-editor
                    v-model:entry="model.sets[setEntryIndex]"
                    :index="setEntryIndex"
                    @moveUp="onMoveSetUp"
                    @moveDown="onMoveSetDown"
                    @remove="onRemoveSet"
                  ></exercise-set-entry-editor>
                </tr>
              </transition-list>
            </tbody>
          </table>
          <button @click="onAddSet" class="button is-dark is-fullwidth">Add set</button>
        </tab>
        <tab title="Description" icon="fa-file-alt">
          <div class="content">
            <ul class="exercise-info">
              <li>
                <span class="has-text-weight-bold">Category:</span> {{ category?.name }}
              </li>
              <li>
                <span class="has-text-weight-bold">Muscle group:</span> {{ muscleGroup?.name }}
              </li>
            </ul>
            <div v-html="exercise?.description"></div>
          </div>
        </tab>
        <tab title="History" icon="fa-history">
          <exercise-history :exercise-id="model.exerciseId" />
        </tab>
      </tabs>
    </template>
  </card>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from "vue";
import Card from "@/components/card.vue";
import Confirm from "@/components/confirm.vue";
import TransitionList from "@/components/transition-list.vue";
import Tab from "@/components/tab.vue";
import Tabs from "@/components/tabs.vue";
import ExerciseSetEntryEditor from "@/components/exercise-set-entry-editor.vue";
import ExerciseHistory from "@/components/exercise-history.vue";
import { useExercises } from "@/composables/useExercises";
import { useCategories } from "@/composables/useCategories";
import { useMuscleGroups } from "@/composables/useMuscleGroups";
import { Exercise, ExerciseEntry, ExerciseSetEntry, Category, MuscleGroup } from "@/types";
import { remove, moveUp, moveDown } from "@/utilities";
import { v4 as uuidv4 } from "uuid";

const emit = defineEmits(["update:entry", "moveUp", "moveDown", "remove"]);

const props = defineProps({
  entry: {
    type: Object as PropType<ExerciseEntry>,
    required: true,
  },
});

const { find: findExercise } = useExercises();
const { find: findCategory } = useCategories();
const { find: findMuscleGroup } = useMuscleGroups();

const model = computed<ExerciseEntry>({
  get() {
    return props.entry;
  },
  set(value) {
    emit("update:entry", value);
  },
});

const exercise = computed<Exercise | undefined>(() => findExercise(props.entry.exerciseId));
const category = computed<Category | undefined>(() => findCategory(exercise.value!.categoryId));
const muscleGroup = computed<MuscleGroup | undefined>(() => findMuscleGroup(exercise.value!.muscleGroupId));

const isOpen = ref(false);
const movingSetEntry = ref("");
const promptRemove = ref(false);

const onMoveUp = (event: InputEvent) => {
  event.stopPropagation();
  event.preventDefault();
  emit("moveUp", model.value);
};

const onMoveDown = (event: InputEvent) => {
  event.stopPropagation();
  event.preventDefault();
  emit("moveDown", model.value);
};

const onRemove = () => {
  emit("remove", model.value);
};

const onAddSet = () => {
  const entry: ExerciseSetEntry = {
    id: uuidv4(),
    repititions: 0,
    weight: 0,
    unit: ''
  };

  model.value.sets.push(entry);
};

const onMoveSetUp = (entry: ExerciseSetEntry) => {
  moveUp(model.value.sets, entry);
  movingSetEntry.value = entry.id;
};

const onMoveSetDown = (entry: ExerciseSetEntry) => {
  moveDown(model.value.sets, entry);
  movingSetEntry.value = entry.id;
};

const onRemoveSet = (entry: ExerciseSetEntry) => {
  remove(model.value.sets, entry);
};
</script>

<style scoped>
tbody {
  background-color: inherit !important;
}

tr {
  background-color: inherit;
}

.list-item {
  position: relative;
}

.exercise-info {
  list-style-type: none;
  margin: 0;
}
</style>