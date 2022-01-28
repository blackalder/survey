import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpSurvey = [{
  id: 100,
  title: 'tes survey',
  slug: 'tes slug survey',
  status: '',
  image: '',

  description: '',
  created_at: '',
  updated_at: '',
  expired_date: '',
  questions: [{
    id:1,
    type:'select',
    question:'baldkasdkl',
    description:'',
    data:{
      options:[
        {uuid:'asdasdfasf ', text:'usa'},
        {uuid:'asdasdfasf ', text:'belanda'},
        {uuid:'asdasdfasf ', text:'usa'},
      ]
    },

  }],
}]

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN')
    },
    surveys:[...tmpSurvey]
  },
  getters: {},
  actions: {
    register({
      commit
    }, user) {
      return axiosClient.post('/register', user)
        .then(({
          data
        }) => {
          commit('setUser', data);
          return data;
        })
    },
    login({
      commit
    }, user) {
      return axiosClient.post('/login', user)
        .then(({
          data
        }) => {
          commit('setUser', data);
          return data;
        })
    },
    logout({
      commit
    }) {
      console.log('actions');
      return axiosClient.post('/logout')
        .then(res => {
          commit('logout');
          return res;
        })
    }
  },
  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token)
    }
  },
  modules: {},
});


export default store;
