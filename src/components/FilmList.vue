<template>
  <!-- СПИСОК ФИЛЬМОВ -->
  <div class="list_film">
    <div
      v-for="film of films"
      :key="film.id"
      class="card"
      @click="$router.push(`/film/${film.id}`)"
    >
      <p class="rating">{{ film.rating.imdb }}</p>
      <img :src="film.poster.url" class="card-img-top" alt="" />
      <div class="card-body">
        <h5
          class="card-title"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          :title="film.name"
        >
          {{ film.name }}
        </h5>
        <p class="card-text">{{ film.year }}, {{ film.movieLength }} мин</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmList",
  props: {
    films: {
      type: Array,
      required: true,
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

  .card:hover {
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 10px 5px rgba(229, 138, 0, 1);
    -moz-box-shadow: 0px 0px 10px 5px rgba(229, 138, 0, 1);
    box-shadow: 0px 0px 10px 5px rgba(229, 138, 0, 1);
  }

  .card-body {
    padding: 5px;
    width: auto;
    width: 100%;
    position: absolute;
    bottom: 0;
    h5 {
      font-size: 16px;
      cursor: default;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 14px;
      font-style: italic;
      color: #c5c5c5;
      margin-top: -5px;
    }
  }
  .card {
    border: none;
    .rating {
      color: #fff;
      position: absolute;
      background-color: $bg;
      padding: 2px 7px;
      font-size: 14px;
    }
  }

  @media screen and (max-width: $sm) {
    grid-template-columns: repeat(3, 1fr);
    gap: 13px;
    .card-body {
      h5 {
        font-size: 10px;
      }
      p {
        font-size: 8px;
      }
    }
    .card {
      .rating {
        font-size: 10px;
      }
    }
  }

  @media screen and (min-width: $sm) and (max-width: $md) {
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    .card-body {
      h5 {
        font-size: 12px;
      }
      p {
        font-size: 10px;
      }
    }
    .card {
      .rating {
        font-size: 12px;
      }
    }
  }
  @media screen and (min-width: $md) and (max-width: $xl) {
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    .card-body {
      h5 {
        font-size: 14px;
      }
      p {
        font-size: 12px;
      }
    }
  }
}
</style>
