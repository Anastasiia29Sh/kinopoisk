export default {
  state: () => ({
    like: JSON.parse(
      localStorage.getItem("like") || "[]"
    ),
  }),
  mutations: {
    pushLike(state, idFilm){
      state.like.push(idFilm);
    },
    setLike(state, newValue){
      state.like = newValue;
    },
  },
  actions: {
    addLike({commit, dispatch}, idFilm){
      commit('pushLike', idFilm);
      dispatch('saveLocalStorage');
    },
    deleteLike({state, commit, dispatch}, idFilm){
      commit('setLike', state.like.filter((e) => e !== idFilm));
      dispatch('saveLocalStorage');
    },
    saveLocalStorage({state}){
      localStorage.setItem(
        "like",
        JSON.stringify(state.like)
      );
    },
  }
};