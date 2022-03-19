<template>
  <modal v-model:visible="isVisible">
    <div class="box p-0 is-radiusless">
      <nav class="panel is-dark">
        <div class="panel-heading is-radiusless">
          Select exercise(s)
          <button
            @click.prevent="isVisible = false"
            class="delete is-medium is-pulled-right"
          ></button>
        </div>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input
              v-model="query"
              class="input"
              type="search"
              pattern="([^\s][A-z0-9À-ž\s]+)"
              @keyup="stopPropagation"
              placeholder="Search"
              tabindex="0"
            />
            <span class="icon is-left">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>

        <div class="panel-block field is-grouped mb-0">
          <p class="control is-expanded has-icons-left">
            <span class="select is-fullwidth" :class="{ 'is-loading': isMuscleGroupsLoading }">
              <select v-model="muscleGroupFilter">
                <option value="0">Any muscle group</option>
                <option
                  v-for="muscleGroup in muscleGroups"
                  :key="muscleGroup.id"
                  :value="muscleGroup.id"
                >{{ muscleGroup.name }}</option>
              </select>
            </span>
            <span class="icon is-small is-left">
              <i class="fas fa-tag"></i>
            </span>
          </p>

          <p class="control is-expanded has-icons-left">
            <span class="select is-fullwidth" :class="{ 'is-loading': isCategoriesLoading }">
              <select v-model="categoryFilter">
                <option value="0">Any category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >{{ category.name }}</option>
              </select>
            </span>
            <span class="icon is-small is-left">
              <i class="fas fa-tag"></i>
            </span>
          </p>
        </div>

        <div class="exercise-container p-1">
          <a
            v-for="exercise in filteredExercises"
            :key="exercise.id"
            class="panel-block is-radiusless"
            :class="{ selected: selections.includes(exercise.id) }"
            @click.prevent="select(exercise.id)"
            href="#"
          >
            {{ exercise.name }}
            <div class="tags is-pulled-right">
              <span
                class="tag"
              >{{ findMuscleGroup(exercise.muscleGroupId)?.name ?? "UNKNOWN_MUSCLE_GROUP" }}</span>
              <span class="tag">{{ findCategory(exercise.categoryId)?.name ?? "UNKNOWN_CATEGORY" }}</span>
            </div>
          </a>
        </div>

        <div class="container">
          <div class="tabs is-toggle is-fullwidth">
            <ul>
              <li>
                <button
                  @click.prevent="clear"
                  class="button is-fullwidth is-radiusless"
                  :disabled="!selections.length && !query && muscleGroupFilter === '0' && categoryFilter === '0'"
                >Clear</button>
              </li>
              <li>
                <button
                  @click.prevent="confirm"
                  class="button is-success is-fullwidth is-radiusless"
                  :disabled="!selections.length"
                >Add {{ `(${selections.length})` }}</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { Exercise } from "@/types";
import Modal from "@/components/modal.vue";
import { useCategories } from "@/composables/useCategories";
import { useMuscleGroups } from "@/composables/useMuscleGroups";
import { useExercises } from "@/composables/useExercises";

const emit = defineEmits(["update:visible", "selected"]);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const query = ref("");
const categoryFilter = ref("0");
const muscleGroupFilter = ref("0");
const selections = reactive<Array<string>>([]);
const { categories, find: findCategory, isLoading: isCategoriesLoading } = useCategories();
const { muscleGroups, find: findMuscleGroup, isLoading: isMuscleGroupsLoading } = useMuscleGroups();
const { exercises } = useExercises();

const isVisible = computed<boolean>({
  get() {
    return props.visible;
  },
  set(value) {
    emit("update:visible", value);
  },
});

const filteredExercises = computed<Array<Exercise>>(() => {
  return exercises.value.filter(matchesQuery).filter(matchesCategory).filter(matchesMuscleGroup);
});

const matchesQuery = (item: Exercise): boolean => {
  if (query.value === "") {
    return true;
  }

  const re = new RegExp(query.value, "i");
  return re.test(item.name);
};

const matchesCategory = (item: Exercise): boolean => {
  if (categoryFilter.value === "0") {
    return true;
  }

  return item.categoryId == categoryFilter.value;
};

const matchesMuscleGroup = (item: Exercise): boolean => {
  if (muscleGroupFilter.value === "0") {
    return true;
  }

  return item.muscleGroupId == muscleGroupFilter.value;
};

const stopPropagation = (event: KeyboardEvent) => {
  // stop modal clear event from occuring on search clear
  event.stopPropagation();
};

const select = (id: string) => {
  const existingIndex = selections.indexOf(id);

  if (existingIndex !== -1) {
    selections.splice(existingIndex, 1);
  } 
  else {
    selections.push(id);
  }
};

const clear = () => {
  query.value = "";
  categoryFilter.value = "0";
  muscleGroupFilter.value = "0";
  selections.splice(0, selections.length);
};

const confirm = () => {
  emit("selected", selections);
  clear();
};
</script>

<style scoped>
.exercise-container {
  height: 300px;
  overflow: auto;
}

.exercise-container a {
  display: list-item;
}

.selected {
  background: cornflowerblue !important;
  color: white !important;
}
</style>