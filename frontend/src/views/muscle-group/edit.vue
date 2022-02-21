<template>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <section class="section has-background-light">
        <div class="container">
          <p class="title">
            Edit muscle group
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
        </div>
      </section>

      <confirm v-model:open="promptRemove" @confirmed="onRemove" cancel="No" confirm="Yes">
        <span class="title is-size-5 has-text-weight-bold">Remove muscle group</span>
        <div>Are you sure you want to remove this muscle group?</div>
      </confirm>

      <div class="box field is-grouped is-grouped-right">
        <div class="control">
          <button type="submit" class="button is-dark">Submit</button>
        </div>
        <div class="control">
          <router-link class="button is-light" to="/muscle-group/list">Cancel</router-link>
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
import { MuscleGroup } from "@/types";
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
    const { get, edit, remove, isLoading } = useMuscleGroups();
    const promptRemove = ref(false);
    const hasNotification = ref(false);
    const notificationMessage = ref("");

    const model = reactive<MuscleGroup>({
      id: props.id,
      name: "",
    });

    const onSubmit = async () => {
      const result = await edit(props.id, model);

      if (result.success) {
        router.push({ name: "/muscle-group/list" });
      } else {
        hasNotification.value = true;
        notificationMessage.value = result.error ?? "";
      }
    };

    const onRemove = async () => {
      const result = await remove(props.id);

      if (result.success) {
        router.push({ name: "/muscle-group/list" });
      } else {
        hasNotification.value = true;
        notificationMessage.value = result.error ?? "";
      }
    };

    onMounted(async () => {
      const muscleGroup = await get(props.id);
      model.name = muscleGroup.name;
    });

    return {
      model,
      isLoading,
      promptRemove,
      hasNotification,
      notificationMessage,
      onSubmit,
      onRemove,
    };
  },
});
</script>