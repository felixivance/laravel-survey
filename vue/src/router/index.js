import { createRouter} from "vue-router";

const routes = [
  {
    path:'/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path:'/register',
    name: 'Register',
    component: Register
  }
];

const router = createRouter( {
  history: createWebHistory,
  routes
});

export default router
