<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
 <div class="h-full bg-gray-100">
   <div class="min-h-full">
     <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
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
           <div class="hidden md:block">
             <div class="ml-4 flex items-center md:ml-6">
               <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                 <span class="sr-only">View notifications</span>
                 <BellIcon class="h-6 w-6" aria-hidden="true" />
               </button>

               <!-- Profile dropdown -->
               <Menu as="div" class="ml-3 relative">
                 <div>
                   <MenuButton class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                     <span class="sr-only">Open user menu</span>
<!--                     <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />-->
                     <span class="text-white bg-gray-500 rounded-full p-1">
                       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                     </span>
                   </MenuButton>
                 </div>
                 <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                   <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                     <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                       <a :href="item.href"
                                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>

                     </MenuItem>
                     <a href="#"  @click="logout" class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Sign Out</a>
                   </MenuItems>
                 </transition>
               </Menu>
             </div>
           </div>
           <div class="-mr-2 flex md:hidden">
             <!-- Mobile menu button -->
             <DisclosureButton class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
               <span class="sr-only">Open main menu</span>
               <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
               <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
             </DisclosureButton>
           </div>
         </div>
       </div>

       <DisclosurePanel class="md:hidden">
         <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
           <router-link v-for="item in navigation" :key="item.name" :to="item.to"
                        active-class="bg-gray-900 text-white"
                        :class="[this.$route.name === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']">{{ item.name }}</router-link>
         </div>
         <div class="pt-4 pb-3 border-t border-gray-700">
           <div class="flex items-center px-5">
             <div class="flex-shrink-0">
<!--               <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />-->
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
             </div>
             <div class="ml-3">
               <div class="text-base font-medium leading-none text-white">{{ user.name }}</div>
               <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
             </div>
             <button type="button" class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
               <span class="sr-only">View notifications</span>
               <BellIcon class="h-6 w-6" aria-hidden="true" />
             </button>
           </div>
           <div class="mt-3 px-2 space-y-1">
             <a v-for="item in userNavigation" :key="item.name" :href="item.href" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">{{ item.name }}</a>
             <a href="#"  @click="logout" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Sign Out</a>
           </div>
         </div>
       </DisclosurePanel>
     </Disclosure>

     <router-view></router-view>
     <Notification />
   </div>
 </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import Notification from './Notification.vue';

const navigation = [
  { name: 'Dashboard', to: {name:'Dashboard'} },
  { name: 'Surveys', to: {name:'Surveys'}, },
  // { name: 'About Us', href: '#', },
  // { name: 'Pricing', href: '#',  },
  // { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href:'' },
  { name: 'Settings', href:'' },

]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,Notification
  },
  setup() {

    return {
      // user: computed(()=> store.state.user.data),
      navigation,
      userNavigation,
    }
  },
  computed:{
    user(){
      return this.$store.state.user.data
    }
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
