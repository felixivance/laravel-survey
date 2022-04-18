import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state:{
    user:{
      data: {},
      token: sessionStorage.getItem("TOKEN")
    }
  },
  getters:{ },
  actions:{
    register({commit},user){
      return axiosClient.post('/register', user).
      then(({data})=>{
        commit("setUser", data)
        return data;

      }).catch((error)=>{
        console.log(error)
      })

      //odl method
      // return fetch('http://127.0.0.1:8000/api/register',{
      //   headers:{
      //     "Content-type":'application/json',
      //     "Accept": "application/json",
      //   },
      //   method:"Post",
      //   body: JSON.stringify(user)
      // }).then((res)=> res.json())
      //   .then((result)=>{
      //     commit("setUser", result)
      //     return result;
      //   });
    },
    login({commit}, user){
      return axiosClient.post('/login', user).
        then(({data})=>{
           commit("setUser", data)
          return data;

      }).catch((error)=>{
        console.log(error)
      })
    //   return fetch('http://127.0.0.1:8000/api/login',{
    //     headers:{
    //       "Content-type":"application/json",
    //       "Accept": "application/json"
    //     },
    //     method: "POST",
    //     body: JSON.stringify(user)
    //   }).then((res)=> res.json())
    //     .then((result)=>{
    //       commit("setUser", result)
    //       return result
    //     })
    }
  },
  mutations:{
    logout: (state) =>{
      state.user.data ={};
        state.user.token = null;
        sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userData)=>{
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules:{}
})

export default store;
