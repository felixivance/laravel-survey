<template>
  <div>
   <fieldset class="mb-4">
      <div>
        <legend class="text-base font-medium text-gray-900">
          {{ index + 1 }}. {{ question.question }}
        </legend>
      </div>
     <div class="mt-3">

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
