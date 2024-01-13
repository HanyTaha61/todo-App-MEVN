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
      <v-btn color="success" class="my-4 mx-auto d-block" @click="validate">Validate & Submit</v-btn>
    </v-form>
    <h1 class="text-center"><strong class="text-decoration-underline">My Todo List</strong></h1>
    <v-card v-for="(todo, index) in todos" :key="index" class="mx-auto my-3 w-75" hover>
      <div class="main pos-r" :class="`priority-${todo.priority.toLowerCase()}`">
        <div class="parent pos-a w-fit">
          <v-btn class="mark-read bg-success">done</v-btn>
          <v-btn class="delete-todo mx-2 bg-error">Delete</v-btn>
        </div>
        <v-card-item>
          <v-card-title>
            {{ todo.title }}
          </v-card-title>
          <v-card-subtitle>
            Duration: {{ todo.duration }} minutes
          </v-card-subtitle>
          <v-card-subtitle>
            priority: {{ todo.priority }}
          </v-card-subtitle>
        </v-card-item>
        <v-card-text>
          {{ todo.description }}
        </v-card-text>
      </div>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    all_todos: [],
    todos: [],
    title: '',
    duration: null,
    description: '',
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
    priority: null,
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
        location.reload()
      }
    },
    async add_todo() {
      const { data } = await axios.post('http://localhost:5200/', {
        title: this.title,
        duration: this.duration,
        priority: this.priority,
        description: this.description
      })
      this.newTodo = data
      this.$refs.form.reset()
    }
  },
}
</script>
<style>
body {
  height: 3000px;
}

.priority-low {
  border-right: 15px solid #ffdd00;
  background-color: rgba(255, 221, 0, 0.1) !important;
}

.priority-medium {
  border-right: 15px solid #ffa500;
  background-color: rgba(255, 136, 0, 0.1) !important;
}

.priority-high {
  border-right: 15px solid #e80303;
  background-color: rgba(232, 3, 3, 0.1) !important;
}

.parent {
  transition: 0.25s;
  bottom: -60px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.main:hover .parent{
  bottom: 30px;
}

.main:hover{
  background-color: rgba(0,0,0,0.4) !important;
}

.pos-a{
  position: absolute !important; 
}

.pos-r{
  position: relative !important; 
}

.w-fit {
  width: fit-content !important;
}

.w-100 {
  width: 100% !important;
}

.w-75 {
  width: 75% !important;
}

.w-50 {
  width: 50% !important;
}</style>