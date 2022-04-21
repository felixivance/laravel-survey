import {createRouter, createWebHistory} from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import Surveys from "../views/Surveys.vue";
import store from "../store";
import AuthComponent from "../components/AuthComponent.vue";

const routes = [

  {
    path:'/',
    name: 'Dashboard',
    redirect: '/dashboard',
    component: DefaultLayout,
    meta: {requiresAuth:true},
    children: [
      {
        path:'/dashboard', name:'Dashboard', component: Dashboard
      },
      {
        path:'/surveys', name:'Surveys', component: Surveys
      },
      {
        path:'/surveys', name:'CreateSurvey', component: Surveys
      }
    ]
  },
  {
    path:'/auth',
    name:'Auth',
    component: AuthComponent,
    meta:{requiresAuth:false},
    children: [
      {
        path:'/auth/register',
        name: 'Register',
        component: Register
      },
      {
        path:'/auth/login',
        name: 'Login',
        component: Login
      },
    ]
  },

];

const router = createRouter( {
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next)=>{
    if(to.meta.requiresAuth && !store.state.user.token){
      next({name:'Login'});
    }else if(store.state.user.token && !to.meta.requiresAuth){
      next({name:'Dashboard'});
     }else{
      next();
    }
});

export default router
