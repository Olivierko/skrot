<template>
  <section class="section has-background-dark">
    <div class="container">
      <div class="field">
        <label class="label has-text-light">Name</label>
        <div class="control">
          <input class="input" type="text" v-model="model.name" />
        </div>
      </div>

      <div class="field">
        <label class="label has-text-light">Start</label>
        <div class="control">
          <input class="input" type="datetime-local" v-model="start" required />
        </div>
      </div>

      <div class="field">
        <label class="label has-text-light">End</label>
        <div class="control">
          <input class="input" type="datetime-local" v-model="end" required />
        </div>
      </div>
    </div>
  </section>

  <section class="section has-background-light">
    <div class="container">
      <p class="title">
        Exercises
        <button
          @click.prevent="isSelectorVisible = true"
          class="button is-pulled-right"
          :disabled="isExerciseSelectorLoading"
          :class="{ 'is-loading': isExerciseSelectorLoading }"
        >
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
        </button>
      </p>

      <article v-if="!model.exercises.length" class="message is-danger">
        <div class="message-body">No exercise selected</div>
      </article>

      <transition-list>
        <exercise-entry-editor
          v-for="(entry, index) in model.exercises"
          v-model:entry="model.exercises[index]"
          :key="entry.id"
          @moveUp="onMoveUp"
          @moveDown="onMoveDown"
          @remove="onRemove"
          class="list-item"
          :class="{ 'is-active': movingEntry === entry.id }"
        ></exercise-entry-editor>
      </transition-list>
    </div>
  </section>

  <exercise-selector v-model:visible="isSelectorVisible" @selected="onExerciseSelection"></exercise-selector>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from "vue";
import { Workout, ExerciseEntry } from "@/types";
import TransitionList from "@/components/transition-list.vue";
import ExerciseSelector from "@/components/exercise-selector.vue";
import ExerciseEntryEditor from "@/components/exercise-entry-editor.vue";
import { remove, moveUp, moveDown, toDatetimeLocal } from "@/utilities";
import { v4 as uuidv4 } from "uuid";
import { useExercises } from "@/composables/useExercises";
import { useMuscleGroups } from "@/composables/useMuscleGroups";
import { useCategories } from "@/composables/useCategories";

const emit = defineEmits(["update:entry"]);

const props = defineProps({
  entry: {
    type: Object as PropType<Workout>,
    required: true,
  },
});

const model = computed<Workout>({
  get() {
    return props.entry;
  },
  set(value) {
    emit("update:entry", value);
  },
});

const start = computed<string>({
  get() {
    return toDatetimeLocal(model.value.start);
  },
  set(value) {
    model.value.start = new Date(value);
  },
});

const end = computed<string>({
  get() {
    return toDatetimeLocal(model.value.end);
  },
  set(value) {
    model.value.end = new Date(value);
  },
});

const movingEntry = ref("");
const isSelectorVisible = ref(false);

const onExerciseSelection = (ids: Array<string>) => {
  for (const id of ids) {
    const entry: ExerciseEntry = {
      id: uuidv4(),
      exerciseId: id,
      notes: "",
      sets: [],
    };

    model.value.exercises.push(entry);
  }

  isSelectorVisible.value = false;
};

const onMoveUp = (entry: ExerciseEntry) => {
  moveUp(model.value.exercises, entry);
  movingEntry.value = entry.id;
};

const onMoveDown = (entry: ExerciseEntry) => {
  moveDown(model.value.exercises, entry);
  movingEntry.value = entry.id;
};

const onRemove = (entry: ExerciseEntry) => {
  remove(model.value.exercises, entry);
};

const { isLoading: isExercisesLoading } = useExercises();
const { isLoading: isMuscleGroupsLoading } = useMuscleGroups();
const { isLoading: isCategoriesLoading } = useCategories();

const isExerciseSelectorLoading = computed<boolean>(() => {
  return isExercisesLoading.value || isMuscleGroupsLoading.value || isCategoriesLoading.value;
});
</script>