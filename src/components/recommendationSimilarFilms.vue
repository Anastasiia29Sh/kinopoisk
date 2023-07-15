<template>
  <div class="recommendation">
    <h3>Рекомендуем посмотреть</h3>
    <carousel :items-to-show="1.5">
      <slide v-for="films of similarFilms" :key="similarFilms.indexOf(films)">
        <film-list
          :films="films"
          class="recommendationSimilarFilms"
        ></film-list>
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import FilmList from "@/components/FilmList.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "recommendationSimilarFilms",
  components: {
    Carousel,
    Slide,
    Navigation,
    FilmList,
  },
  data() {
    return {
      infoFilmId: [],
      similarFilms: [],
      sizeWimdow: window.innerWidth,
    };
  },
  mounted() {
    this.fetchFilms();
  },
  methods: {
    ...mapActions({
      fetchFilms: "fetchFilms",
    }),
    sliceIntoChunks(arr, chunkSize) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
      }
      return res;
    },
    getSimilarFilms() {
      this.infoFilmId = this._allFilms.filter(
        (f) => f.id == this.$route.params.id
      );
      var similarFilms = this.recommendationSimilarFilms();
      let n = 0;
      if (this.sizeWimdow <= 576) n = 3;
      else if (this.sizeWimdow > 576 && this.sizeWimdow <= 768) n = 4;
      else if (this.sizeWimdow > 768 && this.sizeWimdow <= 1200) n = 5;
      else n = 6;
      this.similarFilms = this.sliceIntoChunks(similarFilms, n);
    },
    RatingLengthSimilarFilms(similarFilmsId) {
      let rating = this.infoFilmId[0].rating.imdb;
      let movieLength = this.infoFilmId[0].movieLength;
      let RatingLengthSimilarFilms = this._allFilms.filter(
        (f) =>
          !similarFilmsId.includes(f.id) &&
          f.id != this.infoFilmId[0].id &&
          ((f.rating.imdb >= rating - 1.0 && f.rating.imdb <= rating + 1.0) ||
            (f.movieLength >= movieLength - 10 &&
              f.movieLength <= movieLength + 10))
      );
      return RatingLengthSimilarFilms;
    },
    recommendationSimilarFilms() {
      var txtMain = [
        this.infoFilmId[0].description,
        this.infoFilmId[0].shortDescription,
      ].join(" ");
      var similarFilmsMap = new Map();
      for (let i = 0; i < this._allFilms.length; i++) {
        if (this._allFilms[i].id == this.infoFilmId[0].id) continue;
        var cosSimilarity = this.textCosineSimilarity(
          txtMain,
          [
            this._allFilms[i].description,
            this._allFilms[i].shortDescription,
          ].join(" ")
        );
        if (cosSimilarity >= 0.15)
          similarFilmsMap.set(this._allFilms[i].id, cosSimilarity);
      }
      similarFilmsMap = new Map(
        [...similarFilmsMap].sort((a, b) => b[1] - a[1])
      );
      let similarFilmsId = [];
      let c = 0;
      for (var [key, value] of similarFilmsMap) {
        if (c < 10) similarFilmsId.push(key);
        c++;
      }
      var similarFilms = [];
      similarFilms = this._allFilms.filter((f) =>
        similarFilmsId.includes(f.id)
      );
      // рекомендации по рейтингу и хронометражу
      if (similarFilms.length != 10) {
        let RatingLengthSimilarFilms =
          this.RatingLengthSimilarFilms(similarFilmsId);
        RatingLengthSimilarFilms.forEach((el) => {
          if (similarFilms.length != 10) similarFilms.push(el);
        });
      }
      return similarFilms;
    },
    textCosineSimilarity(txt1, txt2) {
      var txt1 = this.cleanText(txt1);
      var txt2 = this.cleanText(txt2);
      const wordCount1 = this.wordCountMap(txt1);
      const wordCount2 = this.wordCountMap(txt2);
      // объединение слов из txt1 и txt2 в один словарь dict
      let dict = {};
      this.addWordsToDict(wordCount1, dict);
      this.addWordsToDict(wordCount2, dict);
      // векторизация
      const vector1 = this.vectorization(wordCount1, dict);
      const vector2 = this.vectorization(wordCount2, dict);
      // вычисление косинусного сходства векторов
      return this.cosineSimilarity(vector1, vector2);
    },
    cleanText(txt) {
      txt = txt.toLowerCase();
      txt = txt.replace(/[^а-яa-z\s]/g, "");
      return txt;
    },
    // сопоставление каждому слову в тексте его частоту
    wordCountMap(str) {
      let words = str.split(" ");
      let wordCount = {};
      words.forEach((w) => {
        wordCount[w] = (wordCount[w] || 0) + 1;
      });
      return wordCount;
    },
    addWordsToDict(wordCount, dict) {
      for (let key in wordCount) {
        dict[key] = true;
      }
    },
    // векторизация
    vectorization(wordCount, dict) {
      let wordCountVector = [];
      for (let term in dict) {
        wordCountVector.push(wordCount[term] || 0);
      }
      return wordCountVector;
    },
    // вычисление косинусного сходства векторов
    cosineSimilarity(vector1, vector2) {
      let scalarProduct = 0;
      for (let i = 0; i < vector1.length; i++) {
        scalarProduct += vector1[i] * vector2[i];
      }
      let norm1 = 0;
      let norm2 = 0;
      for (let i = 0; i < vector1.length; i++) {
        norm1 += vector1[i] * vector1[i];
        norm2 += vector2[i] * vector2[i];
      }
      norm1 = Math.sqrt(norm1);
      norm2 = Math.sqrt(norm2);
      return scalarProduct / (norm1 * norm2);
    },
    updateWidth() {
      this.sizeWimdow = window.innerWidth;
    },
  },
  created() {
    window.addEventListener("resize", this.updateWidth);
  },
  watch: {
    _allFilms() {
      this.getSimilarFilms();
    },
    sizeWimdow() {
      this.getSimilarFilms();
    },
  },
  computed: {
    ...mapState({
      _allFilms: (state) => state.allFilms,
    }),
  },
};
</script>


<style scoped lang="scss">
$bg: #e58a00;
$sm: 576px;
$md: 768px;
$lg: 992px;
$xl: 1200px;
.recommendation {
  margin-top: 30px;
  h3 {
    color: #fff;
    font-size: 15px;
  }
}
.carousel {
  margin-top: 20px;
}
.recommendationSimilarFilms {
  padding: 7px 7px !important;
  gap: 10px;
  // margin-right: 3px;
}
</style>