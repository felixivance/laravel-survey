<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <PageComponent >
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">{{ model.id ? model.title : "Create Survey"  }}</h1>
        <router-link :to="{name: 'Surveys'}" class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          <span class="flex space-x-2">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
         Back to List
          </span>
        </router-link>
      </div>

      <form @submit.prevent="saveSurvey">
        <div class="shadow sm-rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
<!--            image-->
            <div>
              <label class="block text-sm font-medium text-gray-700">Image</label>
              <div class="mt-1 flex items-center">

              </div>
            </div>
          </div>
        </div>

      </form>

    </template>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue"
import {ref} from "vue";
import {useRoute} from "vue-router";
import store from "../store";

const route = useRoute();

let model= ref({
  title:'',
  status:false,
  description:false,
  image:null,
  expire_date:null,
  questions:[]
})

if(route.params.id){
  model.value = store.state.surveys.find((survey)=>survey.id === parseInt(route.params.id))
}

const saveSurvey=()=>{

}

</script>
