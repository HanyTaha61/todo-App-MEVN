
<template>
  <form class="d-flex mb-4" justify="space-around" method="post" action="/">
    <input type="text" placeholder="todo title" class="rounded mx-2 border pa-2 outline-none" v-model="add_data.title">
    <input type="number" placeholder="todo duration" class="rounded mx-2 border mx-1 pa-2 outline-none" v-model="add_data.duration">
      <input type="text" placeholder="responsible preson" class="rounded mx-2 border mx-1 pa-2 outline-none" v-model="add_data.responsible">
      <v-select label="Priority" :items="['High', 'Medium', 'Low']"></v-select>
      <input type="text" placeholder="todo description" class="rounded mx-2 border mx-1 pa-2 outline-none" v-model="add_data.description">
      <a class="mx-2" href="/"><v-btn color="green" @click="add_todo">add todo</v-btn></a>
    </form>
  <h1 class="text-center"><strong class="text-decoration-underline">My Todo List</strong></h1>
  <v-card v-for="(todo, index) in todos" :key="index" class="mx-auto my-3" max-width="344" hover>
    <v-card-item>
      <v-card-title>
        {{ todo.title }}
      </v-card-title>
      <v-card-subtitle>
        Duration: {{ todo.duration }} minutes
      </v-card-subtitle>
      <v-card-subtitle>
        <strong>Responsible: {{ todo.responsible }}</strong>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{ todo.description }}
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      all_todos: [],
      todos: [],
      newTodo: {},
      add_data: {
        title: '',
        duration: null,
        responsible: '',
        description: ''
      }
    }
  },
  mounted() {
    axios.get('http://localhost:5200/')
      .then(data => {
        this.todos = data.data.all_todos
      })
      .catch(err => console.log(err.message + '-----'))
  },
  methods: {
    async add_todo() {
      try {
        const { data } = await axios.post('http://localhost:5200/', {
          title: this.add_data.title,
          duration: this.add_data.duration,
          responsible: this.add_data.responsible,
          description: this.add_data.description
        })
        this.newTodo = data
      } catch (error) {
        console.log(`------- ${error} -------`);
      }
    }
  }
}
</script>
<style>
.outline-none {
  outline: none;
}
</style>