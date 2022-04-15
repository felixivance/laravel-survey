import {createRouter, createWebHistory} from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import Surveys from "../views/Surveys.vue";

const routes = [
  {
    path:'/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/',
    name: 'Dashboard',
    redirect: '/dashboard',
    component: DefaultLayout,
    children: [
      {
        path:'/dashboard', name:'Dashboard', component: Dashboard
      },
      {
        path:'/surveys', name:'Surveys', component: Surveys
      }
    ]
  },
  {
    path:'/register',
    name: 'Register',
    component: Register
  }
];

const router = createRouter( {
  history: createWebHistory(),
  routes
});

export default router
