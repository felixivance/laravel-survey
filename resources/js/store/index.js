import Vue from 'vue';
import Vuex from 'vuex';
// import axiosClient from "../../../vue/src/axios";
import axiosClient from "../axios";

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
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
