<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <PageComponent >
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">{{ route.params.id ? "Editing: "+survey.title : "Create Survey"  }}</h1>
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

    <div class="flex justify-center" v-if="surveyLoading.loading">Loading...</div>
    <form @submit.prevent="saveSurvey" v-else>
      <div class="shadow sm-rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!--            image-->
          <div>
            <label class="block text-sm font-medium text-gray-700">Image</label>
            <div class="mt-1 flex items-center">
              <img v-if="survey.image_url" :src="survey.image_url"  :alt="survey.title" class="w-64 h-48 object-cover">
              <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              <button type="button" class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium cursor-pointer">
                <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" @change="onImageChange"/>
                Change
              </button>
            </div>
          </div>
<!--          title-->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" v-model="survey.title" id="title" name="title" autocomplete="false" placeholder="Survey Title"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="survey.description" id="description" name="title" autocomplete="false" rows="3" placeholder="Survey description"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </textarea>
          </div>
          <div>
            <label for="expireDate" class="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input type="date" v-model="survey.expiry_date" id="expireDate" name="title" autocomplete="false" placeholder="Survey Expiry Date"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input type="checkbox" id="status" v-model="survey.status" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700">Active</label>
            </div>
          </div>
          <!--          questions-->
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="text-2xl font-semibold flex items-center justify-between">
              Questions
              <button type="button" @click="addQuestion" class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">Add Question</button>
            </div>
          </div>
          <div class="text-center text-gray-600">
<!--             v-if="!survey.questions.length" -->
            You dont have any questions created
          </div>
          <div v-for="(question, index) in survey.questions" :key="question.id">
            <QuestionEditor  :question="question" :index="index" @change="questionChange" @addQuestion="addQuestion" @deleteQuestion="deleteQuestion"  />
          </div>

          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
            text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span v-if="editMode">Update Survey</span>
              <span v-if="!editMode">Save</span>
            </button>
          </div>
        </div>

      </div>

    </form>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue"
import QuestionEditor from "../components/editor/QuestionEditor.vue"
import {computed, ref, watch,} from "vue";
import {useRoute, useRouter} from "vue-router";
import store from "../store";
import {v4 as uuidv4} from "uuid";

const route = useRoute();
const router = useRouter();

let survey= ref({
  title:'',
  status:false,
  description:'',
  image:null,
  image_url:null,
  expiry_date:null,
  questions:[]
})

let editMode = false;

let data = {}

// survey.value = computed(() => store.state.currentSurvey.data)

const surveyLoading = computed(()=> store.state.currentSurvey);



// watch current survey to data change and update local data
console.log("watch running");
watch(
  ()=> store.state.currentSurvey.data,
  (newVal, oldVal) => {
    console.log("new value ", newVal);
    console.log("old value ",oldVal);
    data = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: newVal.status
    }
  },
  {
    deep:true //makes newVal and oldVal same
  }
);
console.log("end watch running ", data);

if(route.params.id){
  // survey.value = store.state.surveys.find((survey)=>survey.id === parseInt(route.params.id))
  store.dispatch('getSurvey', route.params.id).then((data)=>{
    survey.value = JSON.parse(JSON.stringify(data));
  });

  editMode = true;
}

const addQuestion=(index)=>{
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question:"",
    description: null,
    data:{}
  }
  survey.value.questions.splice(index, 0, newQuestion) //adds nw element to thr array
}

const deleteQuestion=(question)=>{
  survey.value.questions = survey.value.questions.filter((q)=> q!== question)
}

function questionChange(question){
  survey.value.questions = survey.value.questions.map((q)=>{
    if(q.id === question.id){
      return JSON.parse(JSON.stringify(question))
    }
    return q;
  })
}

function saveSurvey(){

  store.dispatch("saveSurvey", survey.value).then((res)=>{
    console.log("after saving ", res);
    console.log(res.id);
    survey.value = JSON.parse(JSON.stringify(res));

    router.push({
      name:"UpdateSurvey",
      params:{ id: res.id}
    })
  });
}

function onImageChange(event){
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () =>{
    //field to send to backend
    survey.value.image = reader.result
    //image to display
    survey.value.image_url = reader.result
  }

}
</script>
