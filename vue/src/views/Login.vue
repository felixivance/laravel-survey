
<template>
  <div>

  </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import store from "../store";
import {useRouter} from "vue-router";
import {ref} from "vue";
const router = useRouter();

const user = {
  'email':'',
  'password':'',
  'remember':false
}

let errorMsg = ref("");


function login(e){
  e.preventDefault();
  console.log("login user");
  store.dispatch('login', user ).then((res)=>{
    console.log("logged in user ", res)
    if(res.error){
      return errorMsg.value = res.error
    }
    router.push({
      name:"Dashboard"
    })
  }).catch((error)=>{
    console.log(error)
    errorMsg.value = error.response.data.message


  })
}


</script>
