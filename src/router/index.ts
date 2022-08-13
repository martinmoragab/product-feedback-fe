import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../pages/LogIn/index.vue';
import SignUp from '../pages/SignUp/index.vue';
import Feedbacks from '../pages/Feedbacks/index.vue';

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
	},
	{
		path: '/feedbacks',
		name: 'Feedbacks',
		component: Feedbacks,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router;