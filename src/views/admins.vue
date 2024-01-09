<template>
  <v-container class="">
    <form class="d-flex mb-4" method="post" action="/admins">
      <input type="text" placeholder="username" class="border pa-1" v-model="add_data.name">
      <input type="email" placeholder="email" class="border mx-1 pa-1" v-model="add_data.email">
      <input type="number" placeholder="age" class="border mx-1 pa-1" v-model="add_data.age">
      <a href="/admins"><v-btn color="green" @click="add_admin">add admin</v-btn></a>
    </form>
    <hr>
    <h1 class="text-center">admins' data</h1>
    <hr>
    <div class="table">
      <v-table>
        <thead class="overlay border">
          <tr>
            <th class="text-center text-h6">
              <strong>Name</strong>
            </th>
            <th class="text-center text-h6">
              <strong>email</strong>
            </th>
            <th class="text-center text-h6">
              <strong>age</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row"
          :class="{overlay: show}"
          v-for="item in names" :key="item.name"
          
          
          >

            <td class="text-center">{{ item.name }}</td>
            <td class="text-center">{{ item.email }}</td>
            <td class="text-center">{{ item.age }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  components:{},
  data() {
    return {
      show: false,
      newAdmins:{},
      names: [],
      add_data: {
        name: '',
        email: '',
        age: null
      }
    }
  },
  mounted() {
    axios.get('http://localhost:5200/admins')
      .then(data => {
        this.names = data.data.all_admins
      })
      .catch(err => console.log(err.message + '-----'))
  },
  methods: {
   async add_admin() {
    try {
      const { data } = await axios.post('http://localhost:5200/admins', {
      name: this.add_data.name,
      email: this.add_data.email,
      age: this.add_data.age
     })
     this.newAdmins = data
    } catch (error) {
      console.log(`------- ${error} -------`);
    }
    }
  }
}
</script>

<style>
.bg-dark{
  background-color: beige !important;
}
.overlay{
  background-color: aliceblue !important;
}
</style>