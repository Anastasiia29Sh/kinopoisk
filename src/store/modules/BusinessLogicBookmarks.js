export default {
  state: () => ({
    bookmarks: JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    ),
  }),
  mutations: {
    pushBookmarks(state, idFilm){
      state.bookmarks.push(idFilm);
    },
    setBookmarks(state, newValue){
      state.bookmarks = newValue;
    },
  },
  actions: {
    addBookmarks({commit, dispatch}, idFilm){
      commit('pushBookmarks', idFilm);
      dispatch('saveLocalStorage');
    },
    deleteBookmarks({state, commit, dispatch}, idFilm){
      commit('setBookmarks', state.bookmarks.filter((e) => e !== idFilm));
      dispatch('saveLocalStorage');
    },
    saveLocalStorage({state}){
      localStorage.setItem(
        "bookmarks",
        JSON.stringify(state.bookmarks)
      );
    },
  }
};