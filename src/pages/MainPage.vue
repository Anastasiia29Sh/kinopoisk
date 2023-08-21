<template>
  <div>
    <!-- фильтр и сортировка -->
    <div :class="['filter-sort', isSearch ? 'block-none' : '']">
      <div class="filter">
        <SelectWithDisabledOption
          v-model="selectedFilter"
          :options="typeFilm"
          :nameSelect="nameSelect[0]"
          class="filter-select"
        />
      </div>
      <div class="sort">
        <SelectWithDisabledOption
          v-model="selectedSort"
          :options="sortOptions"
          :nameSelect="nameSelect[1]"
          class="sort-select"
        />
      </div>
    </div>

    <p :class="['mess', mess === '' ? 'block-none' : '']">
      {{ mess }}
    </p>

    <!-- список фильмов -->
    <FilmList :films="films" />

    <!-- пагинация -->
    <BasePagination
      :page="page"
      :totalPages="totalPages"
      @change="changePage"
      :class="{
        'block-none': totalPages <= 1,
      }"
    ></BasePagination>
  </div>
</template>


<script>
import FilmList from "@/components/FilmList.vue";
import BasePagination from "@/components/BasePagination.vue";
import SelectWithDisabledOption from "@/components/UI/SelectWithDisabledOption.vue";
import MyHeader from "@/components/MyHeader.vue";
export default {
  components: {
    FilmList,
    BasePagination,
    SelectWithDisabledOption,
    MyHeader,
  },
  data() {
    return {
      films: [],
      allFilmSort: [],
      page: 1,
      filmsPerPage: 25,
      totalPages: 0,
      typeFilm: [{ value: "all", name: "all" }],
      selectedFilter: "",
      selectedSort: "",
      nameSelect: ["Тип", "Сортировка"],
      sortOptions: [
        { value: "year", name: "По году" },
        { value: "rating", name: "По рейтингу" },
        { value: "movieLength", name: "По хронометражу" },
      ],
      isSort: false,
      isFilter: false,
      isSearch: false,
      mess: "",
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
    this.outputListFilms();
  },
  computed: {
    getTotalPages() {
      if (this.isSort || this.isFilter || this.isSearch)
        this.totalPages = Math.ceil(
          this.allFilmSort.length / this.filmsPerPage
        );
      else
        this.totalPages = Math.ceil(this.allFilms.length / this.filmsPerPage);
    },
  },
  methods: {
    paginationFilms(page, allFilms) {
      this.getTotalPages;
      let startIndex = (page - 1) * this.filmsPerPage;
      let endIndex = page * this.filmsPerPage;
      this.films = allFilms.filter(
        (f) =>
          allFilms.indexOf(f) >= startIndex && allFilms.indexOf(f) < endIndex
      );
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    outputListFilms() {
      this.paginationFilms(this.page, this.allFilms);
      let type = [...new Set(this.allFilms.map((item) => item.type))];
      for (let i = 0; i < type.length; i++) {
        this.typeFilm.push({ value: type[i], name: type[i] });
      }
    },
    searchFilms(nameFilm) {
      this.isSearch = true;
      this.isFilter = false;
      this.isSort = false;
      this.page = 1;
      let allFilmSort = Array.from(this.allFilms);
      this.allFilmSort = allFilmSort.filter(
        (f) => this.checkNameFilm(f.name, nameFilm) > 0
      );
      this.paginationFilms(this.page, this.allFilmSort);
      if (this.allFilmSort.length === 0)
        this.mess = "По Вашему запросу ничего не найдено";
      else this.mess = "";
    },
    checkNameFilm(originalNameFilm, nameFilm) {
      let s = 0;
      for (let el of originalNameFilm.toLowerCase().split(" ")) {
        if (el.length > 1) {
          s = el.startsWith(nameFilm) ? s + 1 : s;
        }
      }
      return s;
    },
  },
  watch: {
    searchNameFilm() {
      let searchNameFilm = this.searchNameFilm;
      searchNameFilm = searchNameFilm.trim();
      searchNameFilm = searchNameFilm.toLowerCase();
      if (searchNameFilm !== "") this.searchFilms(searchNameFilm);
      else {
        this.isSearch = false;
        this.mess = "";
        this.paginationFilms(this.page, this.allFilms);
      }
    },
    allFilms() {
      this.outputListFilms();
    },
    page() {
      if (!this.isSort && !this.isFilter && !this.isSearch) {
        this.paginationFilms(this.page, this.allFilms);
      } else {
        this.paginationFilms(this.page, this.allFilmSort);
      }
    },
    selectedFilter(newValue) {
      this.isFilter = true;
      let allFilmSort = Array.from(this.allFilms);
      if (newValue !== "all" && newValue !== "") {
        this.allFilmSort = allFilmSort.filter((f) => f.type === newValue);
      } else {
        this.isFilter = false;
        this.allFilmSort = allFilmSort;
      }
      this.selectedSort = "";
      this.page = 1;
      if (this.allFilmSort.length === 0)
        this.mess = "По Вашему запросу ничего не найдено";
      this.paginationFilms(this.page, this.allFilmSort);
    },
    selectedSort(newValue) {
      this.isSort = true;
      let allFilmSort = [];
      if (this.isFilter) {
        allFilmSort = Array.from(this.allFilmSort);
      } else allFilmSort = Array.from(this.allFilms);
      if (newValue === "year") {
        this.allFilmSort = allFilmSort.sort((f1, f2) =>
          f1.year < f2.year ? 1 : -1
        );
      } else if (newValue === "rating") {
        this.allFilmSort = allFilmSort.sort((f1, f2) =>
          f1.rating.imdb < f2.rating.imdb ? 1 : -1
        );
      } else if (newValue === "movieLength") {
        this.allFilmSort = allFilmSort.sort((f1, f2) =>
          f1.movieLength < f2.movieLength ? 1 : -1
        );
      }
      this.paginationFilms(this.page, this.allFilmSort);
    },
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

//  фильтр и сортировка
.filter-sort {
  display: flex;
  flex-direction: row;
  padding: 30px 30px 10px 30px !important;
  justify-content: space-between;
  div {
    width: 250px;
  }
  .filter-select {
    background-image: url("../assets/icon-filter.svg");
  }
  .sort-select {
    background-image: url("../assets/icon_sort.png");
  }
  @media screen and (min-width: $sm) and (max-width: $md) {
    div {
      width: 200px;
    }
  }
  @media screen and (max-width: $sm) {
    div {
      width: 130px;
    }
  }
}
.block-none {
  display: none;
}
.mess {
  color: #fff;
  padding: 30px 30px 10px 30px !important;
  text-align: center;
}
</style>