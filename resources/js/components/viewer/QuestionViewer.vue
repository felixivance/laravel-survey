<template>
  <div>
   <fieldset class="mb-4">
      <div>
        <legend class="text-base font-medium text-gray-900">
          {{ index + 1 }}. {{ question.question }}
        </legend>
        <p class="text-gray-500 text-sm">
          {{ question.description }}
        </p>
      </div>
     <div class="mt-3">
        <div v-if="question.type ==='select'">
          <select name="" :value="modelValue"
                  @change="updateModelValue(event.target.value)"
                  id="" class="mt-1 block-w-full py-2 px-3 border border-gray-300
                  bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Please select</option>
            <option value="" :id="index" :key="option.uuid" v-for="(option,index) in question.data.options">{{option.text}}</option>
          </select>
        </div>
       <div v-if="question.type ==='radio'">
         <div class="flex items-center"
         v-for="(option,id) of question.data.options"
         :key="option.uuid">
           <input :id="option.uuid"
           :name="question"+question.id
           type="radio"
           class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
         </div>
       </div>
       <div v-if="question.type ==='checkbox'">

       </div>
       <div v-if="question.type ==='text'">

       </div>
       <div v-if="question.type ==='textarea'">

       </div>
     </div>
   </fieldset>
  </div>
</template>
<script>
export default {
  props:{
    question: Object,
    index:Number,
    modelValue:[String,Array],
  },
  data(){
    return {
      model:''
    }
  },
  computed:{

  },
  methods:{
    updateModelValue(value){
      this.$emit('updateModelValue',value);
    }
  },
  mounted(){
    if(this.question.type === 'checkbox'){
      this.model = this.modelValue;
    }
  }
}
</script>
