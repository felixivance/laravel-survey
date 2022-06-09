import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import dashboardComponent from './components/dashboardComponent'
import loginComponent from './components/loginComponent'

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
      path: '/main/dashboard',
      component: dashboardComponent,
      name: 'dashboard'
    },
  ],
});
