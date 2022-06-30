<template>
  <div class="py-5 px-8">
     <div class="flex justify-center " v-if="loading">
       Survey Loading...
     </div>
    <form @submit.prevent="submitSurvey" v-else class="mx-auto">
      <div class="grid grid-cols-6 items-center">
        <div class="mr-4">

        </div>
        <div class="col-span-5">

        </div>
      </div>
    </form>
  </div>

</template>
<script>
export default {
  data() {
    return {

    }
  },
  computed:{

  },
  methods:{

  },
  mounted() {

  }
}
</script>
