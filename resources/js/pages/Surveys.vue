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
    <div v-if="surveysLoading" class="flex justify-center">Loading...</div>
    <div  v-else>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

        <SurveyListItem v-for="(survey,index) in surveys.data" :key="survey.id" :survey="survey" @delete="deleteSurvey(survey)"
                        class="opacity-0 animate-fade-in-down" :style="{animationDelay:`${index * 0.1}s`}"/>
      </div>

<!--      pagination-->
      <div class="flex justify-center mt-5">
        <nav class="relative z-0 inline-flex justify-center rounded-md shadow-sm" aria-label="pagination">
          <a v-for="(link,i) in surveys.links" :key="i" :disabled="!link.url" v-html="link.label"></a>
        </nav>
      </div>
    </div>

  </PageComponent>
</template>

<script>
import PageComponent from "../components/PageComponent.vue"
import SurveyListItem from "../components/SurveyListItem.vue"
export default {
  components: {
    PageComponent, SurveyListItem
  },
  data() {
    return {

    }
  },
  computed:{
    surveys(){
      return this.$store.state.surveys
    },
    surveysLoading (){
      return this.$store.state.surveysLoading
    }
  },
  methods: {
    deleteSurvey(survey) {
      if (confirm(`Are you sure you want to delete this survey? `)) {
        this.$store.dispatch("deleteSurvey", survey.id).then(() => {
          this.$store.dispatch("getSurveys").then((data) => {
            this.surveys = data
          });
        });
      }
    },

  },
  mounted() {
    console.log("surveys mounted");
    this.$store.dispatch('getSurveys')
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

// }
</script>
