<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <button class="button pagination-previous" :disabled="!hasPreviousPage" @click="currentPage--">Previous</button>
    <button class="button pagination-next" :disabled="!hasNextPage" @click="currentPage++">Next</button>
    <ul class="pagination-list">
      <li v-if="!isFirstPage">
        <a class="button pagination-link" @click="currentPage = 1">1</a>
      </li>
      <li v-if="currentPage > 3">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="currentPage - 1 > 1">
        <a class="button pagination-link" @click="currentPage--">{{ currentPage - 1 }}</a>
      </li>
      <li>
        <a class="button pagination-link is-current" :class="{ 'is-loading': isLoading }">{{ currentPage }}</a>
      </li>
      <li v-if="currentPage + 1 < totalPages">
        <a class="button pagination-link" @click="currentPage++">{{ currentPage + 1 }}</a>
      </li>
      <li v-if="totalPages - currentPage > 2">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="!isLastPage">
        <a class="button pagination-link" @click="currentPage = totalPages">{{ totalPages }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Pagination",
  emits: ["update:page"],
  props: {
    page: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const currentPage = computed<number>({
      get() {
        return props.page;
      },
      set(value) {
        emit("update:page", value);
      },
    });

    const hasPreviousPage = computed(() => currentPage.value > 1);
    const hasNextPage = computed(() => currentPage.value < props.totalPages);

    const isFirstPage = computed(() => currentPage.value === 1);
    const isLastPage = computed(() => currentPage.value === props.totalPages);

    return {
      currentPage,
      hasPreviousPage,
      hasNextPage,
      isFirstPage,
      isLastPage,
    };
  },
});
</script>