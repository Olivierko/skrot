<template>
  <th class="is-narrow">{{ index + 1 }}</th>
  <td>
    <div class="field">
      <div class="control">
        <input class="input" type="number" min="1" v-model="model.repititions" />
      </div>
    </div>
  </td>
  <td>
    <div class="field">
      <div class="control">
        <input class="input" type="number" v-model="model.weight" />
      </div>
    </div>
  </td>
  <td class="is-narrow">
    <div class="field">
      <div class="control">
        <div class="select">
          <select v-model="model.unit" required>
            <option value="" disabled selected>Select unit</option>
            <option v-for="unit in units" :key="unit" :value="unit">{{ unit }}</option>
          </select>
        </div>
      </div>
    </div>
  </td>
  <td class="is-narrow">
    <div class="field has-addons is-pulled-right">
      <p class="control">
        <button @click.prevent="onMoveUp" class="button">
          <span class="icon is-small">
            <i class="fas fa-arrow-up"></i>
          </span>
        </button>
      </p>
      <p class="control">
        <button @click.prevent="onMoveDown" class="button">
          <span class="icon is-small">
            <i class="fas fa-arrow-down"></i>
          </span>
        </button>
      </p>
      <p class="control">
        <button @click.prevent="promptRemove = true" class="button is-danger">
          <span class="icon is-small">
            <i class="fas fa-times"></i>
          </span>
        </button>
      </p>
    </div>
    <confirm v-model:open="promptRemove" @confirmed="onRemove" cancel="No" confirm="Yes">
      <span class="title is-size-5 has-text-weight-bold">Remove set</span>
      <div>Are you sure you want to remove set #{{ index + 1 }}?</div>
    </confirm>
  </td>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from "vue";
import { useProfile } from "@/composables/useProfile";
import Confirm from "@/components/confirm.vue";
import { ExerciseSetEntry } from "@/types";
import { units } from "@/utilities/constants";

export default defineComponent({
  name: "ExerciseSetEntryEditor",
  emits: ["update:entry", "moveUp", "moveDown", "remove"],
  components: {
    Confirm,
  },
  props: {
    entry: {
      type: Object as PropType<ExerciseSetEntry>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { profile } = useProfile();

    const model = computed<ExerciseSetEntry>({
      get() {
        return props.entry;
      },
      set(value) {
        emit("update:entry", value);
      },
    });

    if (!model.value.unit) {
      model.value.unit = profile.unit;
    }

    const promptRemove = ref(false);

    const onMoveUp = () => {
      emit("moveUp", model.value);
    };

    const onMoveDown = () => {
      emit("moveDown", model.value);
    };

    const onRemove = () => {
      emit("remove", model.value);
    };

    return {
      model,
      promptRemove,
      units,
      onMoveUp,
      onMoveDown,
      onRemove,
    };
  },
});
</script>