import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Dashboard from "./pages/DashboardComponent";
import DefaultLayout from "./components/DefaultLayout";
import AuthComponent from "./components/AuthComponent";
import Register from "./pages/RegisterComponent";
import Login from "./pages/LoginComponent";
import Surveys from "./pages/Surveys";
import SurveyView from "./pages/SurveyView";

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path:'/',
      name: 'dashboard',
      redirect: '/dashboard',
      component: DefaultLayout,
      meta: { requiresAuth:true },
      children: [
        {
          path:'/dashboard', name:'Dashboard', component: Dashboard
        },
        {
          path:'/dashboard/surveys', name:'surveys', component: Surveys
        },
        {
          path:'/dashboard/surveys/create', name:'CreateSurvey', component: SurveyView
        },
        // {
        //   path:'/surveys/:id', name:'UpdateSurvey', component: SurveyView
        // }
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
          name: 'register',
          component: Register
        },
        {
          path:'/auth/login',
          name: 'login',
          component: Login
        },
      ]
    },
  ],
});
