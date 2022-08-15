import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LogIn from '../pages/LogIn/index.vue';
import SignUp from '../pages/SignUp/index.vue';
import Feedbacks from '../pages/Feedbacks/index.vue';
import FeedbackDetails from '../pages/FeedbackDetail/index.vue';
import CreateFeedback from '../pages/CreateFeedback/index.vue';

const routes: Array<RouteRecordRaw> = [
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
	},
	{
		path: '/feedbacks/:id/details',
		name: 'FeedbackDetails',
		component: FeedbackDetails,
	},
	{
		path: '/feedbacks/:id/create-new-feedback',
		name: 'CreateFeedback',
		component: CreateFeedback,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router;