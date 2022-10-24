<script setup lang="ts">
	import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import useUserStore from '../../stores/UserStore';

	const userStore = useUserStore();
  const router = useRouter();

	const signupForm = reactive({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
	})
	const rules = reactive({
		firstName: [
			{
				required: true,
				message: 'First name is required',
				trigger: 'blur'
			}
		],
		lastName: [
			{
				required: true,
				message: 'Last name is required',
				trigger: 'blur'
			}
		],
		username: [
			{ 
				required: true,
				message: 'Username is required',
				trigger: 'blur' 
			}
		],
		email: [
			{
				required: true,
				message: 'Email is required',
				trigger: 'blur' 
			},
			{ 
				type: 'email',
				message: 'Email must be a valid email',
				trigger: 'change'
			}
		],
		password: [
			{ 
				required: true,
				message: 'Password is required',
				trigger: 'blur'
			},
			{ 
				min: 3,
				message: 'Password must be greater than 3 characters',
				trigger: 'change'
			}
		]
	})

	async function signup() {
    try {
      await userStore.signUp(
        signupForm.firstName,
        signupForm.lastName,
        signupForm.username,
        signupForm.email,
        signupForm.password
      );
      router.push({ name: 'Products' })
    } catch (e) {
      console.error(e);
    }
	}
</script>

<template>
	<el-card class="signup-page">
		<h1>Sign Up</h1>
		<el-form
			:model="signupForm"
			:rules="rules"
			label-position="top"
			size="default"
			class="form"
		>
			<el-form-item label="First name" prop="firstName">
				<el-input v-model="signupForm.firstName" type="text" size="default" />
			</el-form-item>
			<el-form-item label="Last name" prop="lastName">
				<el-input v-model="signupForm.lastName" type="text" />
			</el-form-item>
			<el-form-item label="Username" prop="username">
				<el-input v-model="signupForm.username" type="text" />
			</el-form-item>
			<el-form-item label="Email" prop="email">
				<el-input v-model="signupForm.email" type="text" />
			</el-form-item>
			<el-form-item label="Password" prop="password">
				<el-input v-model="signupForm.password" type="password" />
			</el-form-item>
			<el-button type="primary" @click="signup">Sign Up</el-button>
		</el-form>
		<h6>Already have an account? <router-link to="/login">Log In!</router-link></h6>
	</el-card>
</template>

<style lang="scss">
  .signup-page {
    margin: auto;
    max-width: 540px;
  }
	.form {
		margin: auto;
		width: 50vw;
	}
</style>