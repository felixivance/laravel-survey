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
    surveys:[],
    surveysList:{
      surveys:[],
    },
    surveysLoading:false,
    currentSurvey:{
      loading:false,
      data:{}
    },
    questionTypes:['text','select','radio','checkbox','textarea'],
    notification:{
      show: sessionStorage.getItem("notification_show"),
      message:sessionStorage.getItem("notification_message"),
      type: sessionStorage.getItem("notification_type")
    }
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
    // login({commit}, user) {
    //   return axiosClient.post('/login', user).then(({data}) => {
    //     commit("setUser", data)
    //     return data;
    //   })
    // },
    deleteSurvey({commit},id){
      return axiosClient.delete(`/survey/${id}`)
    },
    getSurveys({commit}){
      commit("setSurveysLoading",true);
      return axios.get(`/survey`).then((res)=>{
        commit("setSurveys", res.data.data);
        console.log("store fetching surveys ",res.data.data);
        commit("setSurveysLoading",false);
        return res.data.data;
      })
    },
    getSurvey({commit}, id){
      commit("setCurrentSurveyLoading", true);
      return axiosClient.get(`/survey/${id}`).then((res)=>{
        console.log("response in fetching survey ", res.data)
        commit("setCurrentSurvey", res.data.data);
        commit("setCurrentSurveyLoading", false);
        return res.data;
      }).catch((err)=>{
        commit("setCurrentSurveyLoading", false);
        throw err;
      })
    },
    saveSurvey({commit}, survey){
      delete survey.image_url; //remove the viewable image src
      console.log("saving survey ",survey);
      console.log(survey.title);
      let response;
      if(survey.id){ //updating
        response = axiosClient.put(`/survey/${survey.id}`, survey).then((res)=>{
          commit("setCurrentSurvey",res.data)
          return res.data;
        })
      }else{
        response = axiosClient.post(`/survey`,survey).then((res)=>{
          commit("setCurrentSurvey", res.data)
          return res.data;
        })
      }
      console.log("after saving in store ");
      console.log(response);
      return response;
    },
    setNotification({commit},title,message){
      commit("setNotification", title,message)
    },
    closeNotification({commit}){
      commit("hideNotifications")
    },
    register({commit},user){
      return axiosClient.post('/register', user).
      then(({data})=>{
        commit("setUser", data)
        return data;
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
    },
    logout({commit}){
      return axiosClient.post('/logout').then(response=>{
        commit('logout')
        return response
      })
    }
  }
});

export default store;
