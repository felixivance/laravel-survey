<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-50">
    <body class="h-full">
    ```
  -->
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> start your 14-day free trial </a>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit="login">
        <p class="text-white text-center bg-red-500 rounded-md px-3 py-5 flex justify-between items-center " v-if="errorMsg !=='' " >
          {{errorMsg}}
          <span @click="errorMsg =''" class="transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)] rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg></span>
        </p>
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" v-model="user.email" name="email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="user.password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" v-model="user.remember" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <i class="fa fa-lock text-white h-5 w-5  group-hover:text-indigo-400"></i>
            </span>
            Sign in
          </button>
        </div>
      </form>

    </div>
  </div>
</template>
<script>

export default {
  data(){
    return {
      errorMsg:'',
      user:{
        email:'',
        password:'',
        remember:false
      }
    }
  },
  methods:{
    performIncrement(){
      this.$store.commit('increment')

      console.log(this.$store.state.count)
      this.count = this.$store.state.count;
    },
    login(e){
      e.preventDefault();
      console.log("login user");
      this.$store.dispatch('login', this.user ).then((res)=>{
        console.log("logged in user ", res)
        if(res.error){
          return this.errorMsg = res.error
        }
        this.$router.push({
          name:"dashboard"
        })
      }).catch((error)=>{
        console.log(error)
        this.errorMsg = error.response.data.message

      })
    }
  },

  mounted() {
    console.log(this.$store.state.user.token);
  //  check if user is logged in and redirect to dashboard
    if(this.$store.state.user.token !== null){
      this.$router.push({
        name:"dashboard"
      })
    }
  }
}
</script>
