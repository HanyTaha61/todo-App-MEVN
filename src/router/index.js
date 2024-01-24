import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home.vue"),
    },
    {
      path: "/todos",
      name: "todo",
      component: () => import("../views/todos.vue"),
    },
    {
      path: "/books",
      name: "books",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/books.vue"),
    },
    // {
    //   path: "/books/:id",
    //   name: "single-book",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../components/single-book.vue"),
    // },
    {
      path: "/admins",
      name: "admins",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/admins.vue"),
    },
    // {
    //   path: '/form',
    //   name: 'form',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/form.vue')
    // },
  ],
});

export default router;
