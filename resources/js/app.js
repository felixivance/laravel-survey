/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from "vue";
import router from "./router";

require('./bootstrap');

window.Vue = require('vue').default;
import Vuex from 'vuex'

Vue.use(Vuex)
import store from './store/index';

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

router.beforeEach((to, from, next)=>{
  if(store.state.user.token){
    // console.log(" authenticated");
    // next({name:'dashboard'})
    router.push('/dashboard')
      .catch(error => {
        console.info(error.message)
      })
    // next({name:"login"});
  }else if(!store.state.user.token){
    // next({name:'dashboard'})
    console.log(store.state.user.token)
    console.log("authenticated");
  }else{
    // next();
    console.log("proceed");
  }
});

const app = new Vue({
    el: '#app',
    router,
  store: store
});
