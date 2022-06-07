<template>
 <div class="" >
   <div  v-if='showNotification ' class="fixed w-[300px] left-4 bottom-4 py-2 px-4 text-white animate-fade-in-down rounded-md flex justify-between"
         :class="[notificationType === 'success' ? 'bg-emerald-500' : 'bg-red-500']">
     <p>{{notificationMessage}}</p>
     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          @click="closeNotification()">
       <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
     </svg>
   </div>
 </div>
</template>
<!--<script setup>-->
<!--import { computed } from "vue";-->
<!--// import { useStore } from "vuex";-->
<!--import store from "../store";-->

<!--// const store = useStore();-->

<!--const notification = computed(()=> store.state.notification);-->

<!--const hideNotification = () =>{-->
<!--  store.dispatch("closeNotification")-->

<!--}-->

<!--</script>-->
<script>
import {mapGetters, mapActions} from "vuex";
export default {
  data() {
    return {
      showNotification:false,
      notificationMessage:"",
      notificationType:null
      // Only copied when the component is created

    };
  },
  computed: {
    ...mapGetters({
      notification:'notification',

    }),
    test:'asda',

  },
  methods:{
    // ...mapActions({
    //   closeNotification: 'closeNotification'
    // }),

    closeNotification(){
      this.$store.dispatch('closeNotification')
      this.getNotifications();
    },
    getNotifications(){
      this.showNotification = sessionStorage.getItem("notification_show");
      this.notificationMessage = sessionStorage.getItem("notification_message");
      this.notificationType = sessionStorage.getItem("notification_type");
    }
  },
  mounted() {
  //get notifications
    this.getNotifications();
    setTimeout(function(){
      console.log("timeer running")
      this.getNotifications()
    }.bind(this),1000);


    // sessionStorage.setItem("notification_show","true")
    // sessionStorage.setItem("notification_message","Testing")
    // sessionStorage.setItem("notification_type","success")
  }
};
</script>
