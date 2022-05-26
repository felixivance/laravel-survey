<template>
  <div  v-if="notification.show" class="fixed w-[300px] left-4 bottom-4 py-2 px-4 text-white animate-fade-in-down rounded-md flex justify-between"
  :class="[notification.type=== 'success' ? 'bg-emerald-500' : 'bg-red-500']">
    <p>{{notification.message}}</p>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
</template>
<script setup>
import { computed } from "vue";
// import { useStore } from "vuex";
import store from "../store";

// const store = useStore();

const notification = computed(()=> store.state.notification);

</script>
