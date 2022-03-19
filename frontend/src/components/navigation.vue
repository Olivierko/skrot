<template>
  <nav class="navbar is-dark block" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      </a>
      <a
        @click="isActive = !isActive"
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': isActive }"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Workout</a>
          <div class="navbar-dropdown">
            <router-link class="navbar-item" to="/workout/new">New</router-link>
            <router-link class="navbar-item" to="/workout/list">History</router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Admin</a>
          <div class="navbar-dropdown">
            <router-link class="navbar-item" to="/category/list">Categories</router-link>
            <router-link class="navbar-item" to="/exercise/list">Exercises</router-link>
            <router-link class="navbar-item" to="/muscle-group/list">Muscle groups</router-link>
          </div>
        </div>
      </div>

      <div v-if="isAuthenticated" class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">User</a>
          <div class="navbar-dropdown is-right">
            <router-link class="navbar-item" to="/user/profile">Profile</router-link>
            <hr class="navbar-divider" />
            <a @click="onLogout" class="navbar-item">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <loading-overlay :visible="isLoading"></loading-overlay>
  <notification v-model:visible="hasNotification" :message="notificationMessage"></notification>
</template>

<script setup lang="ts">
import { ref, Ref, inject } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "@/composables/useApi";
import LoadingOverlay from "@/components/loading-overlay.vue";
import Notification from "@/components/notification.vue";

const isActive = ref(false);
const isLoading = ref(false);
const hasNotification = ref(false);
const notificationMessage = ref("");
const isAuthenticated = inject<Ref<boolean>>("isAuthenticated")!;

const router = useRouter();
const { logout } = useApi();

const onLogout = async () => {
  isLoading.value = true;
  const response = await logout();
  isLoading.value = false;

  if (!response.success) {
    hasNotification.value = true;
    notificationMessage.value = response.error ?? "";
  } 
  else {
    router.go(0);
  }
};
</script>