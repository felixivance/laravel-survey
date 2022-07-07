<template>
  <div>
    <p>QuestionViewer</p>
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
