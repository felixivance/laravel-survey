import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import dashboardComponent from 'components/dashboardComponent'


export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path:'/',
      redirect:'/main/dashboard'
    },
    {
      path: '/main/dashboard',
      component: dashboardComponent,
      name: 'dashboard'
    },
  ],
});
