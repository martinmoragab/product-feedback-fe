import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn/index.vue';
import SignUp from '../views/SignUp/index.vue';

const routes = [
	{
		path: '/login',
		name: 'LogIn',
		component: LogIn,
	},
	{
		path: '/signup',
		name: 'SignUp',
		component: SignUp,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router;