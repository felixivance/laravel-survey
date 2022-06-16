<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <PageComponent >
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link :to="{name: 'CreateSurvey'}" class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          <span class="flex space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add new survey
          </span>
        </router-link>
      </div>

    </template>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
<!--      <SurveyListItem v-for="survey in _surveys" :key="survey.id" :survey="survey" @delete="deleteSurvey(survey)" />-->
    </div>
  </PageComponent>
</template>

<script>
import PageComponent from "../components/PageComponent.vue"
export default {
  components:{
    PageComponent
  },
  data(){
    return {
      surveys[]
    }
  },
  mounted() {
    console.log("surveys mounted");
  }
}
// import store from "../store";
// import {computed, onMounted, ref, watch,} from "vue";
// import SurveyListItem from "../components/SurveyListItem.vue";
//
// let _surveys = ref([]);
//
// store.dispatch('getSurveys').then((data)=>{
//   _surveys.value = data;
// });
//
//
// // const _surveys =  computed(() => store.state.surveys);
//
// const deleteSurvey= (survey)=>{
//   if(confirm(`Are you sure you want to delete this survey? `)){
//     store.dispatch("deleteSurvey",survey.id).then(()=>{
//       store.dispatch("getSurveys").then((data)=>{
//         _surveys.value = data
//       });
//     });
//   }
// }
</script>
