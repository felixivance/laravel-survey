import Vue from 'vue';
import Vuex from 'vuex';
import axiosClient from "../axios/axios";

Vue.use(Vuex);

const tmpSurveys = [
  {
    id:100,
    title:'Felix',
    slug:'Felix is a G',
    status:'draft',
    image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
    description:'My name is Felix, i am a web developer with 8+ years of experience',
    created_at: "2021-12-20 18:00:00",
    updated_at:"2021-12-20 18:00:00",
    expiry_date: "2021-12-31 18:00",
    questions:[
      {
        id: 1,
        type: "select",
        question:"from which country are you?",
        description: null,
        data:{
          options:[
            {
              uuid: "1",
              text:"kenya"
            },
            {
              uuid: "2",
              text:"Nigeria"
            },
            {
              uuid: "4",
              text:"Sudan"
            }
          ]
        }
      },
      {
        id: 2,
        type: "checkbox",
        question:"which language videos do you prefer",
        description: "itakua ngori sana checkbox",
        data:{
          options:[
            {
              uuid: "1",
              text:"Kiswa"
            },
            {
              uuid: "2",
              text:"Ngoso"
            },
            {
              uuid: "4",
              text:"Kikuyu"
            }
          ]
        }
      },
      {
        id: 3,
        type: "checkbox",
        question:"which language videos do you prefer 2",
        description: "itakua ngori sana checkbox",
        data:{
          options:[
            {
              uuid: "1",
              text:"Kiswa"
            },
            {
              uuid: "2",
              text:"Ngoso"
            },
            {
              uuid: "4",
              text:"Kikuyu"
            }
          ]
        }
      },
      {
        id: 4,
        type: "radio",
        question:"which language videos do you prefer",
        description: "itakua ngori sana checkbox",
        data:{
          options:[
            {
              uuid: "1",
              text:"Kiswa"
            },
            {
              uuid: "2",
              text:"Ngoso"
            },
            {
              uuid: "4",
              text:"Kikuyu"
            }
          ]
        }
      },
      {
        id: 5,
        type: "radio",
        question:"which language videos do you prefer 2",
        description: "itakua ngori sana checkbox",
        data:{
          options:[
            {
              uuid: "1",
              text:"Kiswa"
            },
            {
              uuid: "2",
              text:"Ngoso"
            },
            {
              uuid: "4",
              text:"Kikuyu"
            }
          ]
        }
      },
      {
        id: 6,
        type: "text",
        question:"which language videos do you prefer 2",
        description: null,
        data:{ }
      },
      {
        id: 7,
        type: "textarea",
        question:"which language videos do you prefer 2",
        description: "text area description",
        data:{ }
      },
    ]

  },
  {
    id:200,
    title:'Felix ',
    slug:'Runye is a G',
    status:'draft',
    image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
    description:'My name is Felix, i am a web developer with 8+ years of experience',
    created_at: "2021-12-20 18:00:00",
    updated_at:"2021-12-20 18:00:00",
    expiry_date: "2021-12-31 18:00",
    questions:[]
  },
  {
    id:200,
    title:'Felix',
    slug:'Ivance is a G',
    status:'draft',
    image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
    description:'My name is Felix, i am a web developer with 8+ years of experience',
    created_at: "2021-12-20 18:00:00",
    updated_at:"2021-12-20 18:00:00",
    expiry_date: "2021-12-31 18:00",
    questions:[]
  }
];

const store = new Vuex.Store({
  state: {
    count: 0,
    user:{
      data: {},
      token: sessionStorage.getItem("TOKEN")
    },
    surveys:{
      links:[],
      data:[]
    },
    // surveys:[...tmpSurveys],
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
      show: false,
      message:null,
      type: null
    }
  },
  getters:{
    surveys(state) {
      return state.surveys
    },
    notification(state){
      return state.notification
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
    logout: (state) =>{
      state.user.data ={};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },
    // saveSurvey:(state, survey)=>{
    //   state.surveys = [...state.surveys, survey.data]
    // },
    // updateSurvey:(state,survey)=>{
    //   state.surveys = state.surveys.map((s)=>{
    //     if(survey.data.id ===s.id){
    //       return survey.data
    //     }else{
    //       return s
    //     }
    //   })
    // },
    setCurrentSurveyLoading:(state, loadingStatus)=>{
      state.currentSurvey.loading = loadingStatus
    },
    setSurveysLoading: (state, loadingStatus)=>{
      state.surveysLoading =   loadingStatus
    },
    setCurrentSurvey:(state, survey)=>{
      state.currentSurvey.data = survey
    },
    setSurveys:(state,surveys)=>{
      state.surveys.data = surveys.data;
      state.surveys.links = surveys.links
    },
    setNotification:(state, {type, message})=>{

      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;

      setTimeout(()=>{
        state.notification.show=false
        state.notification.message = null;
        state.notification.type=null;
      },5000);
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
      return axios.delete(`/api/survey/${id}`)
    },
    getSurveys({commit}, {url = null} = {}){
      url = url || '/api/survey';

      commit("setSurveysLoading",true);
      return axios.get(url).then((res)=>{
        commit("setSurveys", res.data);
        console.log("store fetching surveys ",res.data.data);
        commit("setSurveysLoading",false);
        return res.data.data;
      })
    },
    getSurvey({commit}, id){
      commit("setCurrentSurveyLoading", true);
      return axios.get(`/api/survey/${id}`).then((res)=>{
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
        response = axios.put(`/api/survey/${survey.id}`, survey).then((res)=>{
          commit("setCurrentSurvey",res.data)
          return res.data;
        })
      }else{
        response = axios.post(`/api/survey`,survey).then((res)=>{
          commit("setCurrentSurvey", res.data)
          return res.data;
        })
      }
      console.log("after saving in store ");
      console.log(response);
      return response;
    },
    getSurveyBySlug({commit}, slug){
      return axios.get(`/api/getSurveyBySlug/${slug}`).then((res)=>{
          commit("setCurrentSurvey", res.data)
         commit("setCurrentSurveyLoading", false);
            return res.data;
          }).catch((err)=>{
            commit("setCurrentSurveyLoading", false);
            throw err;
          });

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
