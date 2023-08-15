<template>
  <div class="all-info-film">
    <div class="row1">
      <div class="logo-infa">
        <div class="logo-film">
          <img :src="logoFilm" alt="" />
        </div>
        <div class="infa">
          <p>
            {{ ratingFilm }} {{ infoFilmId.year }}г. {{ infoFilmId.type }}
            {{ infoFilmId.movieLength }}мин.
          </p>
          <h2>{{ infoFilmId.name }} ( {{ infoFilmId.alternativeName }} )</h2>
          <p>{{ infoFilmId.shortDescription }}</p>
          <p class="description">Описание:</p>
          <p class="description">{{ infoFilmId.description }}</p>
        </div>
        <ActionsFilm :idFilm="infoFilmId.id" class="actions-film"></ActionsFilm>
      </div>
      <div class="poster">
        <img :src="posterFilm" alt="" />
        <ActionsFilm :idFilm="infoFilmId.id" class="actions-film"></ActionsFilm>
      </div>
    </div>
    <div class="small-block-info">
      <p class="description1">Описание:</p>
      <p class="description1">{{ infoFilmId.description }}</p>
    </div>
  </div>
</template>

<script>
import ActionsFilm from "@/components/ActionsFilm.vue";
export default {
  name: "FilmCardBig",
  components: {
    ActionsFilm,
  },
  data() {
    return {
      logoFilm: "",
      ratingFilm: 0,
      posterFilm: "",
    };
  },
  props: {
    infoFilmId: Object,
  },
  watch: {
    infoFilmId() {
      this.logoFilm = this.infoFilmId.logo.url;
      this.ratingFilm = this.infoFilmId.rating.imdb;
      this.posterFilm = this.infoFilmId.poster.url;
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

.all-info-film {
  color: #fff;
  .row1 {
    display: flex;
    flex-direction: row !important;
    gap: 15px;
    justify-content: space-between;
    .logo-infa {
      position: relative;
      padding-right: 20px;
      width: 80%;
      .logo-film {
        height: 48px;
        max-width: 56%;
        img {
          height: 100%;
          max-width: 100%;
        }
      }
      .infa {
        margin-top: 30px;
        p {
          font-size: 18px;
        }
        p:nth-child(1) {
          margin-top: 40px;
          color: rgb(213, 213, 213);
          word-spacing: 1rem;
        }
        h2 {
          font-size: 28px;
        }
        p:nth-child(4) {
          margin-top: 40px;
        }
        p:nth-child(5) {
          font-size: 16px;
        }
      }
    }
    .poster {
      height: 550px;
      text-align: right;
      img {
        height: 100%;
      }
      .actions-film {
        display: none;
      }
    }
  }
  .actions-film {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .small-block-info {
    display: none;
  }
}
@media screen and (min-width: $lg) and (max-width: $xl) {
  .all-info-film {
    .row1 {
      .logo-infa {
        .logo-film {
          height: 50px;
          max-width: 60%;
        }
        .infa {
          p {
            font-size: 16px;
          }
          p:nth-child(1) {
            margin-top: 30px;
          }
          h2 {
            font-size: 26px;
          }
          p:nth-child(4) {
            margin-top: 30px;
          }
          p:nth-child(5) {
            font-size: 14px;
          }
        }
      }
      .poster {
        height: 450px;
      }
    }
  }
}
@media screen and (min-width: $md) and (max-width: $lg) {
  .all-info-film {
    .row1 {
      gap: 7px;
      .logo-infa {
        .logo-film {
          height: 40px;
          max-width: 58%;
        }
        .infa {
          p {
            font-size: 14px;
          }
          p:nth-child(1) {
            margin-top: 20px;
          }
          h2 {
            font-size: 24px;
          }
          p:nth-child(4) {
            margin-top: 20px;
          }
          p:nth-child(5) {
            font-size: 12px;
          }
        }
      }
      .poster {
        height: 350px;
      }
    }
  }
}
@media screen and (min-width: $sm) and (max-width: $md) {
  .all-info-film {
    margin-top: -15px;
    .row1 {
      gap: 5px;
      .logo-infa {
        .logo-film {
          height: 46px;
          max-width: 76%;
        }
        .infa {
          p {
            font-size: 14px;
          }
          p:nth-child(1) {
            margin-top: 10px;
          }
          h2 {
            font-size: 24px;
          }
        }
      }
      .poster {
        height: 250px;
        .actions-film {
          display: flex;
          position: relative;
          top: 15px;
          right: 0px;
          justify-content: end;
        }
      }
    }
    .actions-film {
      display: none;
    }
    .small-block-info {
      display: block;
      margin-top: 25px;
      p:nth-child(2) {
        font-size: 14px;
      }
    }
    .description {
      display: none;
    }
  }
}
@media screen and (max-width: $sm) {
  .all-info-film {
    margin-top: -15px;
    .row1 {
      display: flex;
      flex-direction: column !important;
      gap: 10px;
      .logo-infa {
        width: 100%;
        order: 2;
        .logo-film {
          display: none;
        }
        .infa {
          p {
            font-size: 12px;
          }
          p:nth-child(1) {
            margin-top: 0px;
            font-size: 14px;
          }
          h2 {
            font-size: 22px;
          }
        }
      }
      .poster {
        margin: auto;
        order: 1;
        width: 60%;
        height: auto;
        img {
          width: 100%;
          height: auto;
        }
        .actions-film {
          display: flex;
          position: relative;
          top: 15px;
          right: 0px;
          justify-content: center;
        }
      }
    }
    .actions-film {
      display: none;
    }
    .small-block-info {
      display: block;
      margin-top: 0px;
      p:nth-child(2) {
        font-size: 12px;
      }
    }
    .description {
      display: none;
    }
  }
}
</style>