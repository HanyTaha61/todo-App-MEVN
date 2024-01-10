
<template>
  <form class="mb-4" method="post" action="/">
      <v-text-field
      class="mx-1 d-block"
        v-model="add_data.title"
        :error-messages="v$.add_data.title.$errors.map(e => e.$message)"
        :counter="10"
        label="title"
        required
        @input="v$.add_data.title.$touch"
        @blur="v$.add_data.title.$touch"
        ></v-text-field>
        
        <v-text-field
        class="mx-1 d-block"
        v-model="add_data.duration"
        :error-messages="v$.add_data.duration.$errors.map(e => e.$message)"
        label="duration (mins)"
        required
        @input="v$.add_data.duration.$touch"
        @blur="v$.add_data.duration.$touch"
        ></v-text-field>
        
        <v-select
        v-model="add_data.priority"
        :items="['High', 'Medium', 'Low']"
        :error-messages="v$.add_data.priority.$errors.map(e => e.$message)"
        label="priority"
        required
        @change="v$.add_data.priority.$touch"
        @blur="v$.add_data.priority.$touch"
        ></v-select>
        
        <v-text-field
        class="mx-1 d-block"
        v-model="add_data.responsible"
        :counter="12"
        :error-messages="v$.add_data.responsible.$errors.map(e => e.$message)"
        label="responsible"
        required
        @input="v$.add_data.responsible.$touch"
        @blur="v$.add_data.responsible.$touch"
        ></v-text-field>
        
        <v-text-field
        class="mx-1 d-block"
        v-model="add_data.description"
        :counter="50"
        :error-messages="v$.add_data.description.$errors.map(e => e.$message)"
        label="description"
        required
        @input="v$.add_data.description.$touch"
        @blur="v$.add_data.description.$touch"
      ></v-text-field>
    <!-- <input placeholder="todo duration" type="number" class="rounded mx-2 border mx-1 pa-2 outline-none"
      v-model="add_data.duration">

    <input placeholder="responsible preson" type="text" class="rounded mx-2 border mx-1 pa-2 outline-none"
      v-model="add_data.responsible"> -->

    <!-- <v-select
        label="Priority" 
        :items="['High', 'Medium', 'Low']">
    </v-select> -->

    <!-- <input placeholder="todo description" type="text" class="rounded mx-2 border mx-1 pa-2 outline-none"
      v-model="add_data.description"> -->
      <div class="text-center">
      
          <v-btn class="" color="green" @click="add_todo">add todo</v-btn>
        </div>
  </form>
  <h1 class="text-center"><strong class="text-decoration-underline">My Todo List</strong></h1>
  <v-card v-for="(todo, index) in todos" :key="index" class="mx-auto my-3" hover>
    <div class="bordered-div" :style="{borderRight: '10px solid #f00'  }">

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
        <v-card-subtitle>
        <strong>Responsible: {{ todo.responsible }}</strong>
      </v-card-subtitle>
    </v-card-item>
    
    <v-card-text>
      {{ todo.description }}
    </v-card-text>
  </div>
  </v-card>
</template>

<script>
// import axios
import axios from 'axios'

// import Vuelidate
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, minValue, maxValue } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      test: '',
      all_todos: [],
      todos: [],
      newTodo: {},
      add_data: {
        title: '',
        duration: null,
        priority: null,
        responsible: '',
        description: ''
      }
    }
  },
  validations() {
    return {
      test:{required},
      add_data: {
        title: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(20)
        },
        duration: {
          required,
          minValue: minValue(1),
          maxValue: maxValue(999)
        },
        priority:{
          required
        },
        responsible: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(12)
        },
        description: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(30)
        },
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
            priority: this.add_data.priority,
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
.priority-low{
  border-right: 10px solid #f00
}
.priority-medium{
  border-right: 10px solid orange
}
.priority-high{
  border-right: 10px solid limegreen
}
</style>