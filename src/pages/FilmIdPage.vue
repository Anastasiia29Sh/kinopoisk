<template>
  <div
    class="film-id-page"
    :class="{
      'block-none': isSearch == 1,
    }"
  >
    <film-card-big :infoFilmId="infoFilmId"></film-card-big>

    <recommendation></recommendation>
  </div>

  <my-main
    :allFilms="allFilms"
    ref="main"
    :class="{
      'block-none': isSearch == 0,
    }"
  ></my-main>
</template>

<script>
import MyMain from "@/pages/Main.vue";
import FilmCardBig from "@/components/FilmCardBig.vue";
import FilmCardSmall from "@/components/FilmCardSmall.vue";
import recommendation from "@/components/recommendationSimilarFilms.vue";
export default {
  components: {
    MyMain,
    FilmCardBig,
    FilmCardSmall,
    recommendation,
  },
  data() {
    return {
      infoFilmId: [],
      filmId: this.$route.params.id,
    };
  },
  props: {
    allFilms: {
      type: Array,
      required: true,
    },
    searchNameFilm: {
      type: String,
    },
  },
  mounted() {
    this.getInfoFilm();
  },
  methods: {
    getInfoFilm() {
      this.infoFilmId = this.allFilms.filter((f) => f.id == this.filmId);
    },
  },
  watch: {
    allFilms() {
      this.getInfoFilm();
    },
    $route(to, from) {
      this.filmId = this.$route.params.id;
      window.location.reload();
    },
    searchNameFilm() {
      let searchNameFilm = this.searchNameFilm;
      searchNameFilm = searchNameFilm.trim();
      searchNameFilm = searchNameFilm.toLowerCase();
      if (searchNameFilm != "") {
        this.isSearch = 1;
        this.$refs.main.searchFilms(searchNameFilm);
      } else this.isSearch = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
$sm: 576px;
$md: 768px;
$lg: 992px;
$xl: 1200px;
.film-id-page {
  padding: 50px 30px !important;
  width: 100%;
}
.block-none {
  display: none;
}
</style>