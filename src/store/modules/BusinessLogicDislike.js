export default {
  state: () => ({
    dislike: JSON.parse(
      localStorage.getItem("dislike") || "[]"
    ),
  }),
  mutations: {
    pushDislike(state, idFilm){
      state.dislike.push(idFilm);
    },
    setDislike(state, newValue){
      state.dislike = newValue;
    },
  },
  actions: {
    addDislike({commit, dispatch}, idFilm){
      commit('pushDislike', idFilm);
      dispatch('saveLocalStorage');
    },
    deleteDislike({state, commit, dispatch}, idFilm){
      commit('setDislike', state.dislike.filter((e) => e !== idFilm));
      dispatch('saveLocalStorage');
    },
    saveLocalStorage({state}){
      localStorage.setItem(
        "dislike",
        JSON.stringify(state.dislike)
      );
    },
  }
};