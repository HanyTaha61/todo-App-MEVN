<template>
  <v-container class="border">
    <form class="d-flex mb-4" method="post" action="/users">
      <input type="text" placeholder="book title" class="border pa-1" v-model="add_data.title">
      <input type="text" placeholder="author name" class="border mx-1 pa-1" v-model="add_data.author">
      <input type="number" placeholder="book price" class="border mx-1 pa-1" v-model="add_data.price">
      <a href="/books"><v-btn color="green" @click="add_book">add book</v-btn></a>
    </form>
    <hr>
    <h1 class="text-center">books' data</h1>
    <hr>
    <div class="table">
      <v-table>
        <thead class="overlay border">
          <tr>
            <th class="text-center text-h6">
              <strong>title</strong>
            </th>
            <th class="text-center text-h6">
              <strong>author</strong>
            </th>
            <th class="text-center text-h6">
              <strong>price</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row"
          :class="{overlay: show}"
          v-for="item in books" :key="item.title"
          
          
          >

            <td class="text-center">{{ item.title }}</td>
            <td class="text-center">{{ item.author }}</td>
            <td class="text-center">{{ item.price }}</td>
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
      newBook:{},
      books: [],
      add_data: {
        title: '',
        author: '',
        price: null
      }
    }
  },
  mounted() {
    axios.get('http://localhost:5200/books')
      .then(data => {
        this.books = data.data.all_books
      })
      .catch(err => console.log(err.message + '-----'))
  },
  methods: {
   async add_book() {
    try {
      const { data } = await axios.post('http://localhost:5200/books', {
      title: this.add_data.title,
      author: this.add_data.author,
      price: this.add_data.price
     })
     this.newBook = data
    } catch (error) {
      console.log(`------- ${error} -------`);
    }
    }
  }
}
</script>

<style scoped>
.bg-dark{
  background-color: beige !important;
}
.overlay{
  background-color: aliceblue !important;
}
</style>