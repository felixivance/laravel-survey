import Vue from 'vue';
import Vuex from 'vuex';
import axiosClient from "../axios/axios";

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    count: 0,
    user:{
      data: {},
      token: sessionStorage.getItem("TOKEN")
    },
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setUser: (state, userData)=>{
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },
  },
  actions: {
    login({commit}, user) {
      return axiosClient.post('/login', user).then(({data}) => {
        commit("setUser", data)
        return data;

      })
    }
  }
});

export default store;
