import { createStore } from 'vuex';
import axios from "axios";
import businessLogicBookmarks from "./modules/BusinessLogicBookmarks";
import businessLogicLike from "./modules/BusinessLogicLike";
import businessLogicDislike from "./modules/BusinessLogicDislike";

export default createStore({
  state: () => ({
    allFilms: [],
  }),
  mutations: {
    setAllFilms(state, allFilms){
      state.allFilms = allFilms;
    },
  },
  actions: {
    async fetchFilms({state, commit}) {
      axios.get("http://localhost:3000/docs").then((res) => {
        commit('setAllFilms', res.data);
      });
    },
  },
  modules:{
    businessLogicBookmarks: businessLogicBookmarks,
    businessLogicLike: businessLogicLike,
    businessLogicDislike: businessLogicDislike
  }
});
