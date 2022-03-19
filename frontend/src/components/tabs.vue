<template>
  <div class="tabs is-fullwidth">
    <ul>
      <li
        v-for="tab in tabs"
        :key="tab.title"
        @click="selectedTitle = tab.title"
        :class="{ 'is-active': tab.title === selectedTitle }"
      >
        <a>
          <span v-if="tab.icon" class="icon is-small">
            <i class="fa" :class="tab.icon" aria-hidden="true"></i>
          </span>
          {{ tab.title }}
        </a>
      </li>
    </ul>
  </div>
  <slot></slot>
</template>

<script setup lang="ts">
import { ref, useSlots, provide } from "vue";

interface Tab {
  title: string;
  icon: string;
}

const slots = useSlots();

const tabs = ref(
  slots.default!().map<Tab>((tab) => {
    const item: Tab = {
      title: tab.props!.title,
      icon: tab.props!.icon
    };

    return item;
  })
);

const selectedTitle = ref(tabs.value[0].title);
provide("selectedTitle", selectedTitle);
</script>

<style scoped>
.tabs li.is-active a {
  border-bottom-color: #000;
  color: #000;
}
</style>