import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id:100,
    title:'Felix',
    slug:'Felix is a G',
    status:'draft',
    image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
    description:'My name is Felix, i am a web developer with 8+ years of exeperience',
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
    description:'My name is Felix, i am a web developer with 8+ years of exeperience',
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
    description:'My name is Felix, i am a web developer with 8+ years of exeperience',
    created_at: "2021-12-20 18:00:00",
    updated_at:"2021-12-20 18:00:00",
    expiry_date: "2021-12-31 18:00",
    questions:[]
  }
];

const store = createStore({
  state:{
    user:{
      data: {},
      token: sessionStorage.getItem("TOKEN")
    },
    surveys:[...tmpSurveys],
    questionTypes:['text','select','radio','checkbox','textarea']
  },
  getters:{ },
  actions:{
    saveSurvey({commit}, survey){
      delete survey.image_url; //remove the viewwable image src

      let response;
      if(survey.id){ //updating
        response = axiosClient.put(`/survey/${survey.id}`, survey).then((res)=>{
          commit("updateSurvey",res.data)
        })
      }else{
        response = axiosClient.post(`/survey`,survey).then((res)=>{
          commit("saveSurvey", res.data)
        })
      }
      return response;
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
  },
  mutations:{

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
    saveSurvey:(state, survey)=>{
      state.surveys = [...state.surveys, survey.data]
    },
    updateSurvey:(state,survey)=>{
      state.surveys = state.surveys.map((s)=>{
        if(survey.data.id ===s.id){
          return survey.data
        }else{
          return s
        }
      })
    }
  },
  modules:{}
})

export default store;
