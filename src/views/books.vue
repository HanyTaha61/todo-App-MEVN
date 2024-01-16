<template>
  <v-container class="border">
    <v-form ref="form" class="d-flex mb-4" method="post" action="/books">
      <v-text-field :rules="nameRules" counter="25" type="text" placeholder="book title" class="pa-1"
        v-model="add_data.title" />
      <v-text-field :rules="authorRules" counter="25" type="text" placeholder="author name" class="mx-1 pa-1"
        v-model="add_data.author" />
      <!-- <v-text-field :rules="authorRules" counter="25" type="text" placeholder="genres" class="mx-1 pa-1" v-model="add_data.genres" /> -->
      <v-select v-model="add_data.genres" multiple :items="['horror', 'fantasy', 'Sci-Fi', 'technology', 'physics']"
        label="genres" />
      <v-text-field :rules="priceRules" type="number" placeholder="book price" class="mx-1 pa-1"
        v-model="add_data.price" />
      <v-btn color="success" class="my-4 mx-auto d-block" @click="validate">add book</v-btn>
    </v-form>
    <hr>
    <h1 class="text-center">books' data</h1>
    <hr>
    <div class="table">
      <v-table>
        <thead class="overlay border">
          <tr>
            <th class="text-left text-h6">
              <strong>title</strong>
            </th>
            <th class="text-left text-h6">
              <strong>author</strong>
            </th>
            <th class="text-left text-h6">
              <strong>genres</strong>
            </th>
            <th class="text-left text-h6 border" colspan="2">
              <strong>price</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <transition-group>
            <tr class="table-row pos-r" v-for="(item, i) in books" :key="i">
              <td class="text-left">{{ item.title }}</td>
              <td class="text-left">{{ item.author }}</td>
              <td class="text-left">
                <ul>
                  <li class="text-left" v-for="(genre, i) in item.genres" :key="i">
                    {{ genre }}
                  </li>
                </ul>
              </td>
              <td class="text-left">{{ parseInt(item.price) }}</td>
              <td class="text-left">
                <v-btn @click="delete_book(item._id, books, item)" class="icon-delete pos-a d-none text-error ">
                  <v-icon icon="$delete"></v-icon>
                </v-btn>
                <v-btn class="icon-edit pos-a d-none text-primary ">
                  <v-icon icon="$edit"></v-icon>
                </v-btn>
              </td>
            </tr>
          </transition-group>
        </tbody>
        <transition-group name="dance">
          <tbody v-if="books.length == 0">
            <tr>
              <td colspan="4">
                <h3 class="mt-5 text-center">no books to display</h3>
              </td>
            </tr>
          </tbody>
        </transition-group>
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
      newBook: {},
      books: [],
      add_data: {
        title: '',
        author: '',
        genres: null,
        price: null
      },
      nameRules: [
        v => !!v || 'book title is required',
        v => (v && v.length <= 25) || 'book title must be less than 25 characters',
        v => (v && v.length >= 4) || 'book title must be more than 4 characters',
      ],
      authorRules: [
        v => !!v || 'author name is required',
        v => (v && v.length <= 25) || 'author name must be less than 25 characters',
        v => (v && v.length >= 4) || 'author name must be more than 4 characters',
      ],
      genresRules: [
        v => !!v || 'genre is required'
      ],
      priceRules: [
        v => !!v || 'book price is required',
        v => (v && v >= 1) || 'book price must be more than 1 USD',
      ],
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
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.add_book()
      }
    },
    async add_book() {
      try {
        await axios.post('http://localhost:5200/books', {
          title: this.add_data.title,
          author: this.add_data.author,
          genres: this.add_data.genres,
          price: this.add_data.price
        })
          .then(
            this.books.push({
              title: this.add_data.title,
              author: this.add_data.author,
              genres: this.add_data.genres,
              price: this.add_data.price
            })
          )
          .then(this.$refs.form.reset())
        console.log('---- book is added ----');
      } catch (error) {
        console.log(`------- ${error} -------`);
      }
    },
    delete_book(book_id, arr, item) {
      axios.delete(`http://localhost:5200/books/${book_id}`)
        .then(console.log('book is deleted!'))
        .then(this.books.splice(arr.indexOf(item), 1))
        .catch(err => { 'error deleting a book', err })
    }
  }
}
</script>

<style scoped>
@keyframes new_row {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.01);
  }

  100% {
    transform: scale(1);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;

}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

.bg-dark {
  background-color: beige !important;
}

.overlay {
  background-color: aliceblue !important;
}

.table-row:hover {
  background-color: black;
  opacity: 0.75;
  color: aliceblue;
}

.table-row td .icon-delete,
.table-row td .icon-edit {
  bottom: 8px;
}

.table-row td .icon-delete {
  right: 5px;
}

.table-row td .icon-edit {
  right: 75px;
}

.table-row:hover .icon-delete,
.table-row:hover .icon-edit {
  display: block !important;
}</style>