<template>
 <div>
   <!-- Question index -->
   <div class="flex items-center justify-between">
     <h3 class="text-lg font-bold">
       {{ index + 1 }}. {{ survey.question }}
     </h3>


     <div class="flex items-center">
       <!-- Add new question -->
       <button class=" flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700" type="button"
               @click="addQuestion()">
         <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
           <path clip-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                 fill-rule="evenodd"/>
         </svg>
         Add
       </button>
       <!--/ Add new question -->

       <!-- Delete question -->
       <button
         class=" flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500  hover:border-red-600"
         type="button" @click="deleteQuestion()" >
         <svg class="h-4 w-4"  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
           <path clip-rule="evenodd"  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                 fill-rule="evenodd"/>
         </svg>
         Delete
       </button>
       <!--/ Delete question -->
     </div>
   </div>
   <!--/ Question index -->
   <div class="grid gap-3 grid-cols-12">
     <!-- Question -->
     <div class="mt-3 col-span-9">
       <label :for="'question_text_' + survey.data" class="block text-sm font-medium text-gray-700">Question Text</label>
       <input :id="'question_text_' + survey.data" v-model="survey.question" :name="'question_text_' + survey.data"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md "
              type="text" @change="dataChange"/>
     </div>
     <!--/ Question -->

     <!-- Question Type -->
     <div class="mt-3 col-span-3">
       <label class="block text-sm font-medium text-gray-700" for="question_type">Select Question Type</label>
       <select id="question_type" v-model="survey.type"
               class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md
          shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               name="question_type" @change="typeChange">
         <option v-for="type in questionTypes" :key="type" :value="type">
           {{ upperCaseFirst(type) }}
         </option>
       </select>
     </div>
     <!--/ Question Type -->
   </div>

   <!-- Question Description -->
   <div class="mt-3 col-span-9">
     <label :for="'question_description_' + survey.id" class="block text-sm font-medium text-gray-700">Description</label>
     <textarea :id="'question_description_' + survey.id" v-model="survey.description" :name="'question_description_' + survey.id"
               class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300
        rounded-md" @change="dataChange" />
   </div>
   <!--/ Question Description -->

   <!-- Data -->
   <div>
     <div v-if="shouldHaveOptions()" class="mt-2">
       <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
         Options
         <!-- Add new option -->
         <button class="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                 type="button" @click="addOption()">
           <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
             <path clip-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" fill-rule="evenodd"/>
           </svg>
           Add Option
         </button>
         <!--/ Add new option -->
       </h4>

       <div v-if="!survey.data.options.length" class="text-xs text-gray-600 text-center py-3">
         You don't have any options defined
       </div>
       <!-- Option list -->
       <div v-for="(option, index) in survey.data.options" :key="index" class="flex items-center mb-1">
         <span class="w-6 text-sm"> {{ index + 1 }}. </span>
         <input v-model="option.text" class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
                tabindex="1" type="text" @change="dataChange" />
         <!-- Delete Option -->
         <button class="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100"
                 type="button" @click="removeOption(option)">
           <svg class="h-3 w-3 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
             <path clip-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                   fill-rule="evenodd"/>
           </svg>
         </button>
         <!--/ Delete Option -->
       </div>
       <!--/ Option list -->
     </div>
   </div>
   <!--/ Data -->

   <hr class="my-4"/>
 </div>
</template>

<script >
import {v4 as uuidv4} from "uuid";
// import {computed, ref} from "@vue/reactivity";
// import store from "../../store";
export default {
  props:{
    question: Object,
    index: Number,
  },
  data(){
    return{
      survey:{}
    }
  },
  computed:{
    questionTypes(){
      return this.$store.state.questionTypes
    }
  },
  methods:{

    upperCaseFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    getOptions() {
      console.log(this.survey.data.options)
      return this.survey.data.options;
    },
    setOptions(options) {

      this.survey.data.options = options;
      this.survey = {
        ...this.survey
      }
      // console.log("here")
      // console.log(this.survey)
    },
    shouldHaveOptions() {
      console.log(this.survey.type)
      return ["select", "radio", "checkbox"].includes(this.survey.type);
    },
    addOption() {
      console.log("Clicked add option");
      this.setOptions([
        ...this.getOptions(),
        {uuid: uuidv4(), text: ""},
      ]);

      this.dataChange();
    },
    removeOption(op) {
      this.setOptions(this.getOptions().filter((opt) => opt !== op));
      this.dataChange();
    },
    typeChange() {
      if (this.shouldHaveOptions()) {
        this.setOptions(this.getOptions() || []);
      }
      this.dataChange();
    },
    dataChange() {
      // const data = survey.value;
      const data = JSON.parse(JSON.stringify(this.survey)); //create clone of model value ie the survey
      if (!this.shouldHaveOptions()) {
        delete data.data.options;
      }
      this.$emit("change", data);
    },
    addQuestion() {
      this.$emit("addQuestion", this.index + 1);
    },
    deleteQuestion() {
      this.$emit("deleteQuestion", this.question);
    }
  },
  mounted(){
    // Re-create the whole question data to avoid unintentional reference change
    this.survey = JSON.parse(JSON.stringify(this.question))
  },
}

// const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);
// Re-create the whole question data to avoid unintentional reference change
// const survey= ref(JSON.parse(JSON.stringify(props.question)));
// Get question types from vuex
// const questionTypes = computed(() => store.state.questionTypes);

// function upperCaseFirst(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// function getOptions() {
//   return survey.value.data.options;
// }

// function setOptions(options) {
//   survey.value.data.options = options;
// }

// Check if the question should have options
// function shouldHaveOptions() {
//   return ["select", "radio", "checkbox"].includes(survey.value.type);
// }

// Add option
// function addOption() {
//   setOptions([
//     ...getOptions(),
//     {uuid: uuidv4(), text: ""},
//   ]);
//   dataChange();
// }

// Remove option
// function removeOption(op) {
//   setOptions(getOptions().filter((opt) => opt !== op));
//   dataChange();
// }

// function typeChange() {
//   if (shouldHaveOptions()) {
//     setOptions(getOptions() || []);
//   }
//   dataChange();
// }

// Emit the data change
// function dataChange() {
//   // const data = survey.value;
//   const data = JSON.parse(JSON.stringify(survey.value)); //create clone of model value ie the survey
//   if (!shouldHaveOptions()) {
//     delete data.data.options;
//   }
//   emit("change", data);
// }

// function addQuestion() {
//   emit("addQuestion", props.index + 1);
// }

// function deleteQuestion() {
//   emit("deleteQuestion", props.question);
// }
</script>

<style></style>
