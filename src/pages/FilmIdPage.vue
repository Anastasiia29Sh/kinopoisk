<template>
  <div
    :class="{
      'block-none': searchNameFilm.trim() != '',
    }"
  >
    <h2>Hello</h2>
    <p>{{ $route.params.id }}</p>
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
export default {
  components: {
    MyMain,
  },
  data() {
    return {};
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
h2,
p {
  color: #fff;
}
.block-none {
  display: none;
}
</style>