import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import useUserStore from "../stores/UserStore";
import LogIn from '@pages/LogIn/index.vue';
import SignUp from '@pages/SignUp/index.vue';
import Feedbacks from '@pages/Feedbacks/index.vue';
import FeedbackDetails from '@pages/FeedbackDetail/index.vue';
import CreateFeedback from '@pages/CreateFeedback/index.vue';
import EditFeedback from '@pages/EditFeedback/index.vue';
import Roadmap from '@pages/Roadmap/index.vue';
import Products from '@pages/Products/index.vue';
import CreateProduct from '@pages/CreateProduct/index.vue';

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
    path: '/createProduct',
    name: 'CreateProduct',
    component: CreateProduct,
    meta: {
      requiresCredentials: true,
    }
  },
	{
		path: '/products',
		name: 'Products',
		component: Products,
		meta: {
			requiresCredentials: false
		}
	},
	{
		path: '/feedbacks/:id',
		name: 'Feedbacks',
		component: Feedbacks,
		meta: {
			requiresCredentials: false
		}
	},
	{
		path: '/roadmap/:id',
		name: 'Roadmap',
		component: Roadmap,
		meta: {
			requiresCredentials: false
		}
	},
	{
		path: '/feedbacks/:id/details',
		name: 'FeedbackDetails',
		component: FeedbackDetails,
		meta: {
			requiresCredentials: false
		}
	},
  {
		path: '/feedbacks/:id/details/edit-feedback',
		name: 'EditFeedback',
		component: EditFeedback,
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
				path: '/products'
			}
		}
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
	const userStore = useUserStore();
  userStore.toggleErrorMessage(false, '');
	/*
		Check if 'to' route requires credentials.
		If true and user not logged in, redirect to sign up. 
	*/
	if (to.meta.requiresCredentials && !userStore.token) {
		next({
			name: 'Products'
		})
	}
	else next();
});

export default router;