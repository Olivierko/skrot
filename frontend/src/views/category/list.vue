<template>
  <div class="container">
    <section class="section has-background-light">
      <div class="container">
        <p class="title">
          Categories
          <router-link class="button is-pulled-right" to="/category/new">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
          </router-link>
        </p>
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>
                <abbr title="Name">Name</abbr>
              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id" class="list-item">
              <td>{{ category.name }}</td>
              <td class="is-narrow">
                <div class="field has-addons is-pulled-right">
                  <p class="control">
                    <button @click="edit(category)" class="button">
                      <span class="icon is-small">
                        <i class="fas fa-edit"></i>
                      </span>
                    </button>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Category } from "@/types";
import { useCategories } from "@/composables/useCategories";

const router = useRouter();
const { categories } = useCategories();

const edit = (category: Category) => {
  router.push({ name: "/category/edit", params: { id: category.id } });
};
</script>