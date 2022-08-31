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
          <select id="" :value="modelValue"
                  class="mt-1 block-w-full py-2 px-3 border border-gray-300
                  bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="" @change="updateModelValue(event.target.value)">
            <option value="">Please select</option>
            <option v-for="(option,index) in question.data.options" :id="index" :key="option.uuid" value="">
              {{option.text}}
            </option>
          </select>
        </div>
        <div v-if="question.type ==='radio'">
          <div v-for="(option,id) of question.data.options"
               :key="option.uuid"
               class="flex items-center">
            <input :id="option.uuid"
                   +question.id :name="question"
                   class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                   type="radio">
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
  props: {
    question: Object,
    index: Number,
    modelValue: [String, Array],
  },
  data() {
    return {
      model: ''
    }
  },
  computed: {},
  methods: {
    updateModelValue(value) {
      this.$emit('updateModelValue', value);
    }
  },
  mounted() {
    if (this.question.type === 'checkbox') {
      this.model = this.modelValue;
    }
  }
}
</script>
