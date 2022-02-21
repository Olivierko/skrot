<template>
  <div id="app" class="mt-20">
    <login :isAuthenticated="isAuthenticated"></login>
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import Login from "@/components/login.vue";
import Navigation from "@/components/navigation.vue";

export default defineComponent({
  components: {
    Login,
    Navigation,
  },
  setup() {
    const isAuthenticated = ref(true);
    provide("isAuthenticated", isAuthenticated);

    return {
      isAuthenticated,
    };
  },
});
</script>