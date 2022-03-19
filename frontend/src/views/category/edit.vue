<template>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <section class="section has-background-light">
        <div class="container">
          <p class="title">
            Edit category
            <button
              @click.prevent="promptRemove = true"
              class="button is-pulled-right is-danger"
            >
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
        <span class="title is-size-5 has-text-weight-bold">Remove category</span>
        <div>Are you sure you want to remove this category?</div>
      </confirm>

      <div class="box field is-grouped is-grouped-right">
        <div class="control">
          <button type="submit" class="button is-dark">Submit</button>
        </div>
        <div class="control">
          <router-link class="button is-light" to="/category/list">Cancel</router-link>
        </div>
      </div>
    </div>
    <loading-overlay :visible="isLoading"></loading-overlay>
    <notification v-model:visible="hasNotification" :message="notificationMessage"></notification>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Category } from "@/types";
import { useCategories } from "@/composables/useCategories";
import Confirm from "@/components/confirm.vue";
import LoadingOverlay from "@/components/loading-overlay.vue";
import Notification from "@/components/notification.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const { get, edit, remove, isLoading } = useCategories();
const promptRemove = ref(false);
const hasNotification = ref(false);
const notificationMessage = ref("");

const model = reactive<Category>({
  id: props.id,
  name: "",
});

const onSubmit = async () => {
  const result = await edit(props.id, model);

  if (result.success) {
    router.push({ name: "/category/list" });
  }
  else {
    hasNotification.value = true;
    notificationMessage.value = result.error ?? "";
  }
};

const onRemove = async () => {
  const result = await remove(props.id);

  if (result.success) {
    router.push({ name: "/category/list" });
  }
  else {
    hasNotification.value = true;
    notificationMessage.value = result.error ?? "";
  }
};

onMounted(async () => {
  const category = await get(props.id);
  model.name = category.name;
});
</script>