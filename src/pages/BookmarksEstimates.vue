<template>
  <div
    :class="[
      'bookmarks-estimates',
      searchNameFilm.trim() !== '' ? 'block-none' : '',
    ]"
  >
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button
          class="nav-link active"
          id="nav-bookmarks-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-bookmarks"
          type="button"
          role="tab"
          aria-controls="nav-bookmarks"
          aria-selected="true"
        >
          Закладки
        </button>
        <button
          class="nav-link"
          id="nav-estimates-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-estimates"
          type="button"
          role="tab"
          aria-controls="nav-estimates"
          aria-selected="false"
        >
          Оценки
        </button>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="nav-bookmarks"
        role="tabpanel"
        aria-labelledby="nav-bookmarks-tab"
        tabindex="0"
      >
        <MyMain :allFilms="bookmarks" ref="main" class="bookmarksFilms" />
      </div>
      <div
        class="tab-pane fade"
        id="nav-estimates"
        role="tabpanel"
        aria-labelledby="nav-estimates-tab"
        tabindex="0"
      >
        <MyMain :allFilms="estimates" ref="main" class="myEstimatesFilms" />
      </div>
    </div>
  </div>

  <MyMain
    :allFilms="allFilms"
    ref="main"
    :class="{
      'block-none': searchNameFilm.trim() === '',
    }"
  />
</template>

<script>
import MyMain from "@/pages/Main.vue";
export default {
  components: {
    MyMain,
  },
  data() {
    return {
      masLocalStorage: { bookmarks: [], like: [], dislike: [] },
      bookmarks: [],
      estimates: [],
    };
  },
  props: {
    allFilms: {
      type: Array,
      default: () => [],
    },
    searchNameFilm: String,
  },
  mounted() {
    this.masLocalStorage["bookmarks"] = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    this.masLocalStorage["like"] = JSON.parse(
      localStorage.getItem("like") || "[]"
    );
    this.masLocalStorage["dislike"] = JSON.parse(
      localStorage.getItem("dislike") || "[]"
    );
    this.getBookmarks();
    this.getEstimates();
  },
  methods: {
    getBookmarks() {
      this.bookmarks = this.allFilms.filter((f) =>
        this.masLocalStorage["bookmarks"].includes(f.id)
      );
    },
    getEstimates() {
      this.estimates = this.allFilms.filter(
        (f) =>
          this.masLocalStorage["like"].includes(f.id) ||
          this.masLocalStorage["dislike"].includes(f.id)
      );
    },
  },
  watch: {
    allFilms() {
      this.getBookmarks();
      this.getEstimates();
    },
    searchNameFilm() {
      let searchNameFilm = this.searchNameFilm;
      searchNameFilm = searchNameFilm.trim();
      searchNameFilm = searchNameFilm.toLowerCase();
      if (searchNameFilm !== "") this.$refs.main.searchFilms(searchNameFilm);
    },
  },
};
</script>

<style lang="scss" >
$sm: 576px;
$md: 768px;
$lg: 992px;
$xl: 1200px;
.bookmarks-estimates {
  padding: 30px 30px !important;
  width: 100%;
  color: #fff;
  .filter-sort {
    padding: 30px 0px 10px 0px !important;
  }
  .filter {
    display: none !important;
  }
  .sort {
    margin-left: auto;
    margin-right: 0;
  }
  .list_film {
    padding: 20px 0 !important;
  }
  .bookmarksFilms {
    .delete {
      display: block;
    }
  }
  .myEstimatesFilms {
    .myEstimates {
      display: block;
    }
  }
}
#nav-bookmarks-tab,
#nav-estimates-tab {
  background-color: #ffffff00;
  color: #fff;
}
.block-none {
  display: none;
}
</style>