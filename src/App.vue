<template>
  <div class="app">
    <!-- шапка сайта -->
    <my-header @searchFilms="searchFilms"></my-header>
    <router-view
      :allFilms="_allFilms"
      :searchNameFilm="searchNameFilm"
    ></router-view>
  </div>
</template>


<script>
import MyHeader from "@/components/MyHeader.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    MyHeader,
  },
  data() {
    return {
      searchNameFilm: "",
    };
  },
  mounted() {
    this.fetchFilms();
  },
  methods: {
    ...mapActions({
      fetchFilms: "fetchFilms",
    }),
    searchFilms(nameFilm) {
      this.searchNameFilm = nameFilm;
      this.isSearch = 1;
    },
  },
  computed: {
    ...mapState({
      _allFilms: (state) => state.allFilms,
    }),
  },
};
</script>

<style lang="scss">
$bg: #022a37;
$bg2: #e58a00;
$fontNav: 16px;
$sm: 576px;
$md: 768px;
$lg: 992px;
$xl: 1200px;
*,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: $bg;
}
</style>
