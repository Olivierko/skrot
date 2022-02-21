
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/user/profile",
        name: "/user/profile",
        component: () => import("../views/user/profile.vue")
    },
    {
        path: "/workout/new",
        name: "/workout/new",
        component: () => import("../views/workout/create.vue")
    },
    {
        path: "/workout/edit/:id",
        name: "/workout/edit",
        props: true,
        component: () => import("../views/workout/edit.vue")
    },
    {
        path: "/workout/copy/:id",
        name: "/workout/copy",
        props: true,
        component: () => import("../views/workout/copy.vue")
    },
    {
        path: "/workout/list",
        name: "/workout/list",
        component: () => import("../views/workout/list.vue")
    },
    {
        path: "/category/list",
        name: "/category/list",
        component: () => import("../views/category/list.vue")
    },
    {
        path: "/category/new",
        name: "/category/new",
        component: () => import("../views/category/create.vue")
    },
    {
        path: "/category/edit/:id",
        name: "/category/edit",
        props: true,
        component: () => import("../views/category/edit.vue")
    },
    {
        path: "/exercise/list",
        name: "/exercise/list",
        component: () => import("../views/exercise/list.vue")
    },
    {
        path: "/exercise/new",
        name: "/exercise/new",
        component: () => import("../views/exercise/create.vue")
    },
    {
        path: "/exercise/edit/:id",
        name: "/exercise/edit",
        props: true,
        component: () => import("../views/exercise/edit.vue")
    },
    {
        path: "/muscle-group/list",
        name: "/muscle-group/list",
        component: () => import("../views/muscle-group/list.vue")
    },
    {
        path: "/muscle-group/new",
        name: "/muscle-group/new",
        component: () => import("../views/muscle-group/create.vue")
    },
    {
        path: "/muscle-group/edit/:id",
        name: "/muscle-group/edit",
        props: true,
        component: () => import("../views/muscle-group/edit.vue")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;