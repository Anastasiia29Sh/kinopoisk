<template>
  <!-- СПИСОК ФИЛЬМОВ -->
  <div class="list_film">
    <FilmCardSmall v-for="film of films" :key="film.id" :film="film" />
  </div>
</template>

<script>
import FilmCardSmall from "@/components/FilmCardSmall.vue";
export default {
  name: "FilmList",
  components: {
    FilmCardSmall,
  },
  props: {
    films: {
      type: Array,
      default: () => [],
    },
  },
};
</script>


<style scoped lang="scss">
$bg: #e58a00;
$sm: 576px;
$md: 768px;
$lg: 992px;
$xl: 1200px;
.list_film {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  padding: 20px 30px !important;
  color: #fff;
  position: relative;
  @media screen and (max-width: $sm) {
    grid-template-columns: repeat(3, 1fr);
    gap: 13px;
  }
  @media screen and (min-width: $sm) and (max-width: $md) {
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }
  @media screen and (min-width: $md) and (max-width: $xl) {
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }
}
</style>