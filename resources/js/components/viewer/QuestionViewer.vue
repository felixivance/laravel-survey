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

        </div>
       <div v-if="question.type ==='radio'">

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
    updateModelValue(){
      this.$emit('updateModelValue',this.index,this.modelValue);
    }
  },
  mounted(){
    if(this.question.type === 'checkbox'){
      this.model = this.modelValue;
    }
  }
}
</script>
