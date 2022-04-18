import { createStore } from "vuex";

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
      return fetch('http://127.0.0.1:8000/api/register',{
        headers:{
          "Content-type":'application/json',
          "Accept": "application/json",
        },
        method:"Post",
        body: JSON.stringify(user)
      }).then((res)=> res.json())
        .then((result)=>{
          commit("setUser", result)
          return result;
        });
    }
  },
  mutations:{
    logout: (state) =>{
      state.user.data ={};
        state.user.token = null;
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
