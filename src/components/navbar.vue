<template>
      <v-row justify="space-around" style="min-width: 500px;" no-gutters class="bg-dark border my-5 pa-5">
          <router-link
          class="text-3 px-3 rounded"
          v-for="link in links"
          :key="link"
          :to="link.url">{{ link.name }}</router-link>

      </v-row>
  </template>
  <script>
    export default {
      data: () => ({
        links: [
          {name: 'Todos', url: '/'},
          {name: 'Admins', url: '/admins'},
          {name: 'Bookstore', url: '/books'},
          // {name: 'form', url: '/form'},
          
        ],
      }),
    }
  </script>

<style>
:root{
  --basic: rgb(72,169,166)
}
  .text-3{
    font-size: 1.2em;
  }
  .router-link-exact-active{
    background-color: var(--basic);
    color: #fff;
  }
</style>