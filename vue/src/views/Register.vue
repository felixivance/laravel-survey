<!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <div>
    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for free</h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      {{ ' ' }}
      <router-link :to="{name:'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500"> login to your account</router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit="register">
    <p class="text-white text-center bg-red-500 rounded-md px-3 py-5">{{errorMsg}}</p>
    <p class="text-white bg-red-500 rounded-md px-3 py-5" v-if="errors" >
      <span v-for="(error,i) in errors.password"> * {{error}} <br> </span>
    </p>
    <input type="hidden" name="remember" value="true" />
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="fullname" class="sr-only">Full Name</label>
        <input id="fullname" name="fullname" type="text"  required="" v-model="user.name" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Full Name" />
      </div>
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email"  v-model="user.email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password"  v-model="user.password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
      </div>
      <div>
        <label for="password_confirmation" class="sr-only">Confirm Password</label>
        <input id="password_confirmation" name="password_confirmation" type="password"  v-model="user.password_confirmation" autocomplete="current-password_confirmation" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password Confirmation" />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
        <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
      </div>

      <div class="text-sm">
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
      </div>
    </div>

    <div>
      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
        Sign Up
      </button>
    </div>
  </form>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import store from "../store";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
const router = useRouter();

const user = {
  name: "",
  email:"",
  password:"",
  password_confirmation:"",

};
let errorMsg = ref("")
let errors = ref("");


function register(e){
  e.preventDefault();
  store.dispatch('register',user).then((result)=>{


    router.push({
      name:"Dashboard"
    })
  }).catch((error)=>{
    errorMsg.value = error.response.data.message
    errors.value = error.response.data.errors

  })
}

onMounted(()=>{
  console.log("mounted");
});

</script>
