import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import dashboardComponent from './components/dashboardComponent.vue'
import loginComponent from './components/loginComponent.vue'
import DefaultLayout from "../../vue/src/components/DefaultLayout";
import Dashboard from "../../vue/src/views/Dashboard";
import Surveys from "../../vue/src/views/Surveys";
import SurveyView from "../../vue/src/views/SurveyView";

export default new VueRouter({
  mode: 'history',
  routes: [
    // {
    //   path:'/',
    //   redirect:'/login'
    // },
    {
      path:'/',
      component: loginComponent
    },
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
        // {
        //   path:'/surveys', name:'Surveys', component: Surveys
        // },
        // {
        //   path:'/surveys/create', name:'CreateSurvey', component: SurveyView
        // },
        // {
        //   path:'/surveys/:id', name:'UpdateSurvey', component: SurveyView
        // }
      ]
    },
  ],
});
