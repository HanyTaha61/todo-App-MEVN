<template>
	<div id="app" class="container">
		<div class="card mt-3">
			<div class="card-header text-center">
				<div class="card-body">
					<h3>Registeration Form</h3>
					<form @submit.prevent="form_submit">
						<div class="form-row">

							<!-- First Name -->
							<div class="form-group col-md-6">
								<label>First Name</label>
								<input type="text" class="form-control" placeholder="John" v-model.trim="$v.first_name.$model" :class="{
									'is-valid': !$v.first_name.$invalid,
									'is-invalid': $v.first_name.$error
								}">
								<div class="valid-feedback">Your first name is valid</div>
								<div class="invalid-feedback">
									<span class="d-block" v-if="!$v.first_name.required">Your first name is required</span>
									<span class="d-block" v-if="!$v.first_name.minLength">
										First Name must be at least {{$v.first_name.$params.minLength.min}} Characters 
									</span>
									<span class="d-block" v-if="!$v.first_name.maxLength">First Name must not exceed {{$v.first_name.$params.maxLength.max}} Characters</span>
									<span class="d-block" v-if="!$v.first_name.alpha">First Name must contain only alphabeticals chars</span>
								</div>
							</div>

							<!-- Last Name -->
							<div class="form-group col-md-6">
								<label>Last Name</label>
								<input type="text" class="form-control" placeholder="Doee" v-model.trim="$v.last_name.$model" :class="{
									'is-valid': !$v.last_name.$invalid,
									'is-invalid': $v.last_name.$error
								}">
								<div class="valid-feedback">Last Name is valid</div>
								<div class="invalid-feedback">
									<span class="d-block" v-if="!$v.last_name.required">Last name is required</span>
									<span class="d-block" v-if="!$v.last_name.minLength">Last name must be at least {{$v.last_name.$params.minLength.min}} Characters</span>
									<span class="d-block" v-if="!$v.last_name.maxLength">Last name must not exceed {{$v.last_name.$params.maxLength.max}} Characters</span>
									<span class="d-block" v-if="!$v.last_name.alpha">Last Name must contain only alphabeticals chars</span>
								</div>
							</div>

							<!-- Age -->
							<div class="form-group col-md-6">
								<label>Age</label>
								<input type="number" class="form-control" placeholder="your age" v-model.number="$v.age.$model" :class="{
									'is-valid': !$v.age.$invalid,
									'is-invalid': $v.age.$error
								}">
								<div class="valid-feedback">Your Age is valid</div>
								<div class="invalid-feedback">
									<span class="d-block" v-if="!$v.age.required">Your Age is required</span>
									<span class="d-block" v-if="!$v.age.between">Your Age Must be between {{$v.age.$params.between.min}} years and {{$v.age.$params.between.max}} years</span>
								</div>
							</div>

							<!-- Email -->
							<div class="form-group col-md-6">
								<label>Email</label>
								<input type="email" class="form-control" placeholder="example@domain.com" v-model.trim="$v.email.$model" :class="{
									'is-valid': !$v.email.$invalid,
									'is-invalid': $v.email.$error
								}">
								<div class="valid-feedback">Your Email is valid</div>
								<div class="invalid-feedback">
									<span class="d-block" v-if="!$v.email.required">Your emain is required</span>
									<span class="d-block" v-if="!$v.isUnique">This isn't a valid email address</span>
								</div>
							</div>

							<!-- Phone Number -->
							<div class="form-group col-md-6">
								<label>Phone Number</label>
								<input type="number" class="form-control" placeholder="XXX-XXX-XX-XX-XX" v-model="$v.phone.$model" :class="{
									'is-valid': !$v.phone.$invalid,
									'is-invalid': $v.phone.$error
								}">
								<div class="valid-feedback">Phone Number is valid</div>
								<div class="invalid-feedback">
									<span v-if="!$v.phone.required" class="d-block">phone Number is required</span>
									<span v-if="!$v.phone.numeric" class="d-block">This isn't a valid phone Number</span>
									<span v-if="!$v.phone.minLength">Phone Number must be more than {{$v.phone.$params.minLength.min}} digits</span>
								</div>
							</div>
							<div class="col-md-6"></div>
							<div class="form-group col-md-6">
								<label>Password</label>
								<input class="form-control" id="show_pwd" type="password" v-model.trim="$v.password.$model" :class="{
									'is-valid': !$v.password.$invalid,
									'is-invalid': $v.password.$error
								}">
								<div class="valid-feedback">Your Password is valid</div>
								<div class="invalid-feedback">
									<span class="d-block" v-if="!$v.password.required">Password is required</span>
									<span class="d-block" v-if="!$v.password.minLength">Password must be more than {{$v.password.$params.minLength.min}} Characters</span>
								</div>
							</div>
							<div class="form-group col-md-6">
								<label>Repeat Password</label>
								<input class="form-control" id="repeat_pwd" type="password" v-model.trim="$v.repeatPassword.$model" :class="{
									'is-valid': !$v.repeatPassword.$invalid,
									'is-invalid': $v.repeatPassword.$error
								}">
								<div class="valid-feedback">Your Passwords are Identical</div>
								<div class="invalid-feedback">
									<span class="d-block" v-if="!$v.repeatPassword.required">Repeat your password</span>
									<span class="d-block" v-if="!$v.repeatPassword.sameAs">Passwords must be Identical</span>
								</div>
							</div>
							<div class="form-group col-md-12 text-left ml-4">
								<input type="checkbox" id="showpassword" class="form-check-input" v-model="showPassword" @input="toggleShowPassword">
								<label class="form-check-label" for="showpassword">{{toggle_show}} password</label>
							</div>
						</div>
						<div class="col-12">
							<button class="btn btn-success" type="submit">Submit {{submitStatus}}</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style>

</style>

<script>
import {required, numeric, sameAs, email, alpha, alphaNum, minLength, maxLength, between} from '@vuelidate/validators'

export default {
	data(){
		return{
			first_name: '',
			last_name: '',
			age: null,
			email: '',
			phone: '',
			submitStatus: '',
			password: '',
			repeatPassword: '',
			showPassword: false,
			toggle_show: 'show'
		}
	},
	validations:{
		first_name:{
			required,
			alpha,
			minLength: minLength(4),
			maxLength: maxLength(12)
		},

		last_name:{
			required,
			alpha,
			minLength: minLength(4),
			maxLength: maxLength(12)
		},

		age:{
			required,
			numeric,
			between: between(18, 60)
		},

		email:{
			required,
			email,
			isUnique(value){
				if (value === '') return true

				var mail_sanitation = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

				return mail_sanitation.test(value)
			}
		},

		phone:{
			required,
			numeric,
			minLength: minLength(11)
		},

		password:{
			required,
			minLength: minLength(8)
		},

		repeatPassword:{
			required,
			sameAs: sameAs('password')
		}
	},
	methods:{
		form_submit(){
			this.$v.$touch();

			if(this.$v.$invalid){
				this.submitStatus = 'Failed!'
			}else{
			setTimeout(()=>{
				this.submitStatus = 'Success!'
			},1000)}
		},
		toggleShowPassword(){
			var show = document.getElementById('show_pwd')
			var repeat = document.getElementById('repeat_pwd')
			if (this.showPassword == false){
				this.showPassword == true
				show.type = 'text'
				repeat.type = 'text'
				this.toggle_show = 'hide'
			}else{
				this.showPassword == false
				show.type = 'password'
				repeat.type = 'password'
				this.toggle_show = 'show'

			}
		}
	}
}
</script>
