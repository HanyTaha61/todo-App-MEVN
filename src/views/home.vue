<template>
    <div class="text-h2 text-capitalize text-center pa-3">todo guru</div>


    <!-- signup form -->
    <!----------------->

    <v-card class="mx-auto" style="max-width: 500px;">
        <v-toolbar color="secondary" cards dark flat>
            <v-card-title class="text-h w-100 text-center font-weight-regular">
                <p v-if="signup">Sign up</p>
                <p v-else>Login</p>
            </v-card-title>
        </v-toolbar>
        <v-form v-if="signup" ref="form" v-model="isValid" class="pa-4 pt-6">
            <v-text-field v-model="username" :rules="[rules.required, rules.minLength(4), rules.maxLength(14)]"
                variant="filled" color="deep-purple" label="Username" counter="14" type="text"></v-text-field>
            <v-text-field v-model="signup_email" :rules="[rules.email]" variant="filled" color="deep-purple"
                label="Email address" type="email"></v-text-field>
            <v-text-field v-model="signup_password" :rules="[rules.password, rules.minLength(6)]" variant="filled"
                color="deep-purple" label="Password" style="min-height: 96px" type="password"></v-text-field>
        </v-form>

        <v-form v-else ref="form" v-model="isValid" class="pa-4 pt-6">
            <v-text-field v-model="login_email" :rules="[rules.email]" variant="filled" color="deep-purple"
                label="Email address" type="email"></v-text-field>
            <v-text-field v-model="login_password" :rules="[rules.password, rules.minLength(6)]" variant="filled"
                color="deep-purple" label="Password" style="min-height: 96px" type="password"></v-text-field>
        </v-form>
        <v-divider></v-divider>
        <p class="text-center text-h5">or</p>
        <div v-if="signup" class="pa-4 ">if you already have account,
            <span class="login-link text-teal cursor-pointer" @click="signup = false">Login</span>
        </div>
        <div v-else class="pa-4 ">if you don't have account,
            <span class="login-link text-teal cursor-pointer" @click="signup = true">Sign up</span>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn v-if="signup" :disabled="!isValid" :loading="isLoading" @click="validate" class="bg-secondary"
                color="teal-accent-4">
                sign up
            </v-btn>
            <v-btn v-else :disabled="!isValid" :loading="isLoading" @click="validate" class="bg-secondary"
                color="teal-accent-4">
                Login
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import axios from 'axios'

export default {
    data: () => ({
        signup: true,
        username: '',
        login_email: undefined,
        signup_email: undefined,
        isValid: false,
        isLoading: false,
        login_password: undefined,
        signup_password: undefined,
        phone: undefined,
        rules: {
            email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
            minLength: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
            maxLength: max => v => (v || '').length <= max || `Invalid character length, maximum ${max}`,
            password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
                'Password must contain an upper case letter, a numeric character, and a special character',
            required: v => !!v || 'This field is required',
        },
    }),
    methods: {
        async validate() {
            // if (window.navigator.onLine) {
            const { valid } = await this.$refs.form.validate()
            if (valid && this.signup == true) {
                this.signUp()
            }
            else if (valid && this.signup == false) {
                this.logIn()
            }
            // } 
            // else {
                // 	alert('please check your internet connection')
                // }
            },
        signUp() {
            axios.post("http://localhost:5200/users",{
                username: this.username,
                email: this.signup_email,
                password: this.signup_password
            })
            .then(response => alert("user with id# " + response.data.insertedId + " was added to the database successfully")
            )
            .then(() => {
					this.$refs.form.reset()
				})
        },
        logIn(){
            alert('function login is running')
            
        }
    }
}
</script>

<style>
.cursor-pointer {
    cursor: pointer !important;
}</style>