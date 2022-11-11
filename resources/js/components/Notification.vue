<template>
  <div v-if="notification.show" class="fixed w-[300px] left-4 bottom-4 py-4 text-white animate-fade-in-down rounded-md px-4"
  :class="[notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']">
    {{notification.message}}
  </div>
</template>
<script>
export default {
  computed:{
    notification(){
      return this.$store.state.notification
    }
  }
}
</script>
