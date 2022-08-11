import { createRouter, createWebHashHistory } from 'vue-router'
import SignUp from '../pages/SignUp/index.vue';

const routes = [
    {
        path: '/signup', // Url to get here
        name: 'SignUp', // Name of the route
        component: SignUp, // Imported the file containing home
    }
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router;