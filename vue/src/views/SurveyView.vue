<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <PageComponent >
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">{{ survey.id ? survey.title : "Create Survey"  }}</h1>
        <router-link :to="{name: 'Surveys'}" class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          <span class="flex space-x-2">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
         Back to List
          </span>
        </router-link>
      </div>

    </template>
    <form @submit.prevent="saveSurvey">
      <div class="shadow sm-rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!--            image-->
          <div>
            <label class="block text-sm font-medium text-gray-700">Image</label>
            <div class="mt-1 flex items-center">
              <img v-if="survey.image" :src="survey.image"  :alt="survey.title" class="w-64 h-48 object-cover">
              <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              <button type="button" class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium cursor-pointer">
                <input type="file" class="absolute inset-0 opacity-0 cursor-pointer"/>
                Change
              </button>
            </div>
          </div>
<!--          title-->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" v-model="survey.title" id="title" name="title" autocomplete="false"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="survey.title" id="description" name="title" autocomplete="false" rows="3"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </textarea>
          </div>
        </div>
      </div>

    </form>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue"
import {ref} from "vue";
import {useRoute} from "vue-router";
import store from "../store";

const route = useRoute();

let survey= ref({
  title:'',
  status:false,
  description:false,
  image:null,
  expire_date:null,
  questions:[]
})

if(route.params.id){
  survey.value = store.state.surveys.find((survey)=>survey.id === parseInt(route.params.id))
}

const saveSurvey=()=>{

}

</script>
