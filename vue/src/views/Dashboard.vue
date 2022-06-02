<!-- This example requires Tailwind CSS v2.0+ -->
<template>
 <PageComponent title="Dashboard">
   content goes here
   <pre>
     {{test}}
   </pre>
 </PageComponent>
</template>

<script >
import PageComponent from "../components/PageComponent.vue"
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState(['test'])
  }
}
</script>
