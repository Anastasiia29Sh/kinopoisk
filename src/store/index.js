import { createStore } from 'vuex';
import axios from "axios";

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
  }
});
