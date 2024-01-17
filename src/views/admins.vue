<template>
  <v-container class="">
    <v-form ref="form" class="d-flex mb-4" method="post" action="/admins">
      <v-text-field type="text" counter="25" :rules="nameRules" placeholder="username" class="pa-1"
        v-model="add_data.name" />
      <v-text-field type="email" placeholder="email" :rules="emailRules" class="mx-1 pa-1" v-model="add_data.email" />
      <v-text-field type="number" :rules="ageRules" placeholder="age" class="mx-1 pa-1" v-model="add_data.age" />
      <v-btn color="success" class="my-4 mx-auto d-block" @click="validate">add admin</v-btn>
    </v-form>
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
            <th class="text-center text-h6">
              <strong></strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row pos-r" v-for="item in names" :key="item.name">
            <td class="text-center">{{ item.name }}</td>
            <td class="text-center">{{ item.email }}</td>
            <td class="text-center">{{ item.age }}</td>
            <td class="text-center">
              <v-btn class="icon-delete pos-a d-none text-error ">
                <v-icon icon="$delete"></v-icon>
              </v-btn>
              <v-btn class="icon-edit pos-a d-none text-primary ">
                <v-icon icon="$edit"></v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      newAdmins: {},
      names: [],
      add_data: {
        name: '',
        email: '',
        age: null
      },
      nameRules: [
        v => !!v || 'name is required',
        v => (v && v.length <= 25) || 'name must be less than 25 characters',
        v => (v && v.length >= 4) || 'name must be more than 4 characters',
      ],
      emailRules: [
        v => !!v || 'email is required'
      ],
      ageRules: [
        v => !!v || 'age is required',
        v => (v && v >= 18) || 'age must be more than 18 years',
        v => (v && v <= 60) || 'age must be less than 60 years',
      ],
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
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.add_admin()
        location.reload()
      }
    },
    async add_admin() {
      try {
        const { data } = await axios.post('http://localhost:5200/admins', {
          name: this.add_data.name,
          email: this.add_data.email,
          age: this.add_data.age
        })
        this.newAdmins = data
        location.reload()
      } catch (error) {
        console.log(`------- ${error} -------`);
      }
    }
  }
}
</script>

<style scoped>
.overlay {
  background-color: aliceblue !important;
}

.table-row:hover {
  background-color: black;
  opacity: 0.75;
  color: aliceblue;
}

.table-row td .icon-delete,.table-row td .icon-edit {
  bottom: 8px;
}

.table-row td .icon-edit{
  right: 75px;
}

.table-row:hover .icon-delete, .table-row:hover .icon-edit{
  display: block !important;
}
</style>