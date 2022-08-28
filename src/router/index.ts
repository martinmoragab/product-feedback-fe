import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import useUserStore from "../stores/UserStore";
import LogIn from '@pages/LogIn/index.vue';
import SignUp from '@pages/SignUp/index.vue';
import Feedbacks from '@pages/Feedbacks/index.vue';
import FeedbackDetails from '@pages/FeedbackDetail/index.vue';
import CreateFeedback from '@pages/CreateFeedback/index.vue';
import next from 'next';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'LogIn',
		component: LogIn,
		meta: {
			requiresCredentials: false
		}
	},
	{
		path: '/signup',
		name: 'SignUp',
		component: SignUp,
		meta: {
			requiresCredentials: false
		}
	},
	{
		path: '/feedbacks',
		name: 'Feedbacks',
		component: Feedbacks,
		meta: {
			requiresCredentials: true
		}
	},
	{
		path: '/feedbacks/:id/details',
		name: 'FeedbackDetails',
		component: FeedbackDetails,
		meta: {
			requiresCredentials: true
		}
	},
	{
		path: '/feedbacks/:id/create-new-feedback',
		name: 'CreateFeedback',
		component: CreateFeedback,
		meta: {
			requiresCredentials: true
		}
	},
	{
		path: '/:afterEvent(.*)',
		redirect: () => {
			return {
				path: '/feedbacks'
			}
		}
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const userStore = useUserStore();
	/*
		Check if 'to' route requires credentials.
		If true and user not logged in, redirect to sign up. 
	*/
	if (to.meta.requiresCredentials && !userStore.token) {
		next({
			name: 'SignUp'
		})
	}
	else next();
});

export default router;