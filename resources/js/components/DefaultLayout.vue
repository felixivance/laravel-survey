<template>
  <div class="h-full bg-gray-100">
    <div class="min-h-full">
      <div class="bg-gray-800" v-slot="{open}">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <router-link v-for="item in navigation" :key="item.name" :to="item.to"
                               :class="[this.$route.name === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']">{{ item.name }}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      navigation:[
        { name: 'Dashboard', to: {name:'Dashboard'} },
        { name: 'Surveys', to: {name:'Surveys'}, },
        // { name: 'About Us', href: '#', },
        // { name: 'Pricing', href: '#',  },
        // { name: 'Reports', href: '#', current: false },
      ],
      userNavigation : [
        { name: 'Your Profile', href:'' },
        { name: 'Settings', href:'' },
      ]
    }
  },
  computed:{

  },
  methods:{
    logout(){
      this.$store.dispatch('logout').then(()=>{
        this.$router.push({
          name:'Login'
        });
      });

    }
  }
}
</script>
