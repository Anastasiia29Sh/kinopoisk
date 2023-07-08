<template>
  <div
    class="film-id-page"
    :class="{
      'block-none': searchNameFilm.trim() != '',
    }"
  >
    <film-card :infoFilmId="infoFilmId"></film-card>
  </div>

  <my-main
    :allFilms="allFilms"
    ref="main"
    :class="{
      'block-none': searchNameFilm.trim() === '',
    }"
  ></my-main>
</template>

<script>
import MyMain from "@/pages/Main.vue";
import FilmCard from "@/components/FilmCard.vue";
export default {
  components: {
    MyMain,
    FilmCard,
  },
  data() {
    return {
      infoFilmId: [],
      posterFilm: "",
      logoFilm: "",
      ratingFilm: "",
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
      this.infoFilmId = this.globalFilms.filter(
        (f) => f.id == this.$route.params.id
      );
    },
  },
  watch: {
    searchNameFilm() {
      let searchNameFilm = this.searchNameFilm;
      searchNameFilm = searchNameFilm.trim();
      searchNameFilm = searchNameFilm.toLowerCase();
      if (searchNameFilm != "") this.$refs.main.searchFilms(searchNameFilm);
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