<script setup lang="ts">
	import { reactive } from 'vue'
	import { useRouter } from 'vue-router';
	import useUserStore from '../../stores/UserStore';

	const userStore = useUserStore();
	const router = useRouter();

	const loginForm = reactive({
		email: '',
		password: '',
	})
	const rules = reactive({
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

	async function login() {
		try {
			await userStore.logIn(loginForm.email, loginForm.password);
			router.push({
				name: 'Feedbacks'
			})
		} catch (e) {
			console.error(e);
		}
	}
</script>

<template>
	<el-card>
    <h1>Log In</h1>
    <el-form
			:model="loginForm"
			:rules="rules"
			label-position="top"
			class="form"
		>
			<el-form-item label="Email" prop="email">
					<el-input v-model="loginForm.email" type="email" />
			</el-form-item>
			<el-form-item label="Password" prop="password" >
					<el-input v-model="loginForm.password" type="password"/>
			</el-form-item>
			<el-button type="primary" @click="login">Log In</el-button>
    </el-form>
		<h6>
			Not registered? <router-link to="/signup">Sign Up!</router-link>
		</h6>
	</el-card>
</template>

<style lang="scss">
	.form {
		margin: auto;
		width: 50vw;
	}
</style>