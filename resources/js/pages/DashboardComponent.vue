<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <PageComponent title="Dashboard">
    <div class="text-center">
      content goes here
    </div>
  </PageComponent>
</template>

<script >
import PageComponent from "../components/PageComponent";
export default {
  components:{
    PageComponent
  },
  mounted() {
    // console.log("dashboard mounted");
  }
}
</script>
