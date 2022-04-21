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
  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue"

</script>
