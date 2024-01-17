<template>
  <v-form ref="form" class="mb-5 pa-2">
    <v-row>
      <v-col>
        <v-text-field v-model="title" :counter="25" :rules="titleRules" label="Todo Title" required></v-text-field>
        <v-text-field v-model.number="duration" :rules="durationRules" label="Duration (mins)" required></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="description" :counter="50" :rules="descriptionRules" label="Description"
          required></v-text-field>
        <v-select v-model="priority" :items="['Low', 'Medium', 'High']" :rules="[v => !!v || 'Priority is required']"
          label="Priority" required />
      </v-col>
    </v-row>
    <v-btn color="success" class="my-4 mx-auto d-block" @click="validate">add todo</v-btn>
  </v-form>
  <h1 class="text-decoration-underline text-center"><strong>My Todo List</strong></h1>
  <transition-group>
    <v-card v-for="(todo, index) in todos" :key="index" :class="`bg-${todo.priority.toLowerCase()}`"
      class="mx-auto my-3 w-75" hover>
      <div class="main pos-r" :class="`priority-${todo.priority.toLowerCase()}`">
        <div class="parent pos-a">
          <v-btn class="button_main" :class="{ 'bg-grey': todo.status }"
            @click="mark_done(todos, index)">done<v-icon icon="$check"></v-icon></v-btn>
          <v-btn class="delete-todo mx-2 bg-error" @click="delete_todo(todo._id, todos, todo)">delete<v-icon
              icon="$delete"></v-icon></v-btn>
        </div>
        <v-card-item>
          <v-card-title :class="{ 'todo-done': todo.status }">
            <h3>{{ todo.title }}</h3>
          </v-card-title>
          <div>
            <div v-if="todo.status" class="done">
              <strong>Status:</strong>
              <span class="text-white px-1 mx-1 bg-success">Done</span>
            </div>
            <div v-if="!todo.status" class="undone">
              <strong>Status:</strong>
              <span class="text-white px-1 mx-1 bg-error">Undone</span>
            </div>
          </div>
          <v-card-subtitle>
            <strong>Duration:</strong> {{ todo.duration }} minutes
          </v-card-subtitle>
          <v-card-subtitle>
            <strong>priority:</strong> {{ todo.priority }}
          </v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <strong>Description:</strong> {{ todo.description }}
        </v-card-text>
      </div>
    </v-card>
  </transition-group>
  <v-card-title class="mt-5" v-if="todos.length == 0">
    <h3 class="text-center">no todos to display</h3>
  </v-card-title>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    button_done_color: false,
    text_done: false,
    all_todos: [],
    todos: [],
    title: '',
    duration: null,
    description: '',
    priority: null,
    task_done: false,
    newTodo: {},
    titleRules: [
      v => !!v || 'title is required',
      v => (v && v.length <= 25) || 'title must be less than 25 characters',
      v => (v && v.length >= 4) || 'title must be more than 4 characters',
    ],

    descriptionRules: [
      v => !!v || 'Description is required',
      v => (v && v.length <= 50) || `Description must be less than 50 characters`,
      v => (v && v.length >= 4) || 'Description must be more than 4 characters',
    ],
    durationRules: [
      // v => !!v || 'duration is required',
      v => (v && v >= 0) || 'duration must be more than 1 min',
    ],
  }),
  mounted() {
    axios.get('http://localhost:5200/')
      .then(data => {
        this.todos = data.data.all_todos
      })
      .catch(err => console.log(err.message + '-----'))
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.add_todo()
      }
    },
    async add_todo() {
      try {
        await axios.post('http://localhost:5200/', {
          title: this.title,
          duration: this.duration,
          priority: this.priority,
          description: this.description,
          status: this.task_done
        })
          .then(
            this.todos.push({
              title: this.title,
              duration: this.duration,
              priority: this.priority,
              description: this.description,
              status: this.task_done
            })
          )
          .then(this.$refs.form.reset())
        console.log('---- todo is added ----');
      } catch (err) {
        console.log(`------- ${err} -------`);
      }
    },
    delete_todo(todo_id, arr, item) {
      axios.delete(`http://localhost:5200/${todo_id}`)
        .then(console.log('todo is deleted!'))
        .then(this.todos.splice(arr.indexOf(item), 1))
        .catch(err => { 'error deleting a todo', err })
    },
    mark_done(arr, target) {
      this.task_done = !this.task_done
      arr[target].status = !arr[target].status
      this.button_done_color = !this.button_done_color
      // console.log('todo is done -------');
    }
  },
}
</script>
<style>
body {
  height: 3000px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;

}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


.priority-low {
  border-right: 15px solid #ffdd00;
  background-color: rgba(255, 221, 0, 0.1) !important;
}



.priority-medium {
  border-right: 15px solid #ffa500;
  background-color: rgba(255, 221, 0, 0.1) !important;
}

.priority-high {
  border-right: 15px solid #e80303;
}

.parent {
  display: flex;
  justify-content: center;
  transition: 0.25s;
  width: 80%;
  bottom: -60px;
  padding-left: 5px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.main:hover .parent {
  bottom: -12px;
}

.todo-done {
  text-decoration: line-through;
  color: grey
}

</style>