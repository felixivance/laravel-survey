<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <PageComponent >
   <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link :to="{name: 'CreateSurvey'}" class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          Add new survey
        </router-link>
      </div>

   </template>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue"

</script>
