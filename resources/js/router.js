import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import dashboardComponent from './components/dashboardComponent.vue'
import loginComponent from './components/loginComponent.vue'

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
      path: '/dashboard',
      component: dashboardComponent,
      name: 'dashboard'
    },
  ],
});
