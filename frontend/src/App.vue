<template>
  <div id="app" class="mt-20">
    <login :isAuthenticated="isAuthenticated"></login>
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import Login from "@/components/login.vue";
import Navigation from "@/components/navigation.vue";

const isAuthenticated = ref(true);
provide("isAuthenticated", isAuthenticated);
</script>