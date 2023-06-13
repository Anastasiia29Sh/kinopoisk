<template>
  <div class="app">
    <!-- шапка сайта -->
    <my-header @searchFilms="searchFilms"></my-header>

    <!-- фильтр и сортировка -->
    <div
      class="filter-sort"
      :class="{
        'block-none': isSearch === 1,
      }"
    >
      <div class="filter">
        <my-select
          v-model="selectedFilter"
          :options="typeFilm"
          :nameSelect="nameSelect[0]"
          class="filter-select"
        ></my-select>
      </div>
      <div class="sort">
        <my-select
          v-model="selectedSort"
          :options="sortOptions"
          :nameSelect="nameSelect[1]"
          class="sort-select"
        ></my-select>
      </div>
    </div>

    <p
      class="mess"
      :class="{
        'mess-none': mess === '',
      }"
    >
      {{ mess }}
    </p>

    <!-- список фильмов -->
    <film-list :films="films"></film-list>

    <!-- пагинация -->
    <pagination
      :page="page"
      :totalPages="totalPages"
      @change="changePage"
      :class="{
        'block-none': totalPages <= 1,
      }"
    ></pagination>
  </div>
</template>


<script>
import FilmList from "@/components/FilmList.vue";
import Pagination from "@/components/Pagination.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyHeader from "@/components/MyHeader.vue";
import axios from "axios";
export default {
  components: {
    FilmList,
    Pagination,
    MySelect,
    MyHeader,
  },
  data() {
    return {
      allFilms: [],
      films: [],
      allFilmSort: [],
      page: 1,
      limit: 25,
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
      isSort: 0,
      isFilter: 0,
      isSearch: 0,
      mess: "",
    };
  },
  mounted() {
    this.fetchFilms();
  },
  methods: {
    async fetchFilms() {
      axios.get("http://localhost:3000/docs").then((res) => {
        this.allFilms = res.data;
        this.paginationFilms(this.page, this.allFilms);
        let type = [...new Set(this.allFilms.map((item) => item.type))];
        for (var i = 0; i < type.length; i++) {
          this.typeFilm.push({ value: type[i], name: type[i] });
        }
      });
    },
    paginationFilms(page, allFilms) {
      this.totalPages = Math.ceil(allFilms.length / this.limit);
      let startIndex = (page - 1) * this.limit;
      let endIndex = page * this.limit;
      this.films = allFilms.filter(
        (f) =>
          allFilms.indexOf(f) >= startIndex && allFilms.indexOf(f) < endIndex
      );
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    searchFilms(nameFilm) {
      this.isSearch = 1;
      this.isFilter = 0;
      this.isSort = 0;
      this.selectedSort = "";
      this.selectedFilter = "";
      this.page = 1;
      let allFilmSort = Array.from(this.allFilms);
      nameFilm = String(nameFilm);
      nameFilm = nameFilm.trim();
      nameFilm = nameFilm.toLowerCase();
      this.allFilmSort = allFilmSort.filter(
        (f) => this.checkNameFilm(f.name, nameFilm) > 0
      );
      this.paginationFilms(this.page, this.allFilmSort);
      if (nameFilm.length == 0) {
        this.isSearch = 0;
      }
      if (this.allFilmSort.length == 0)
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
    page() {
      if (this.isSort == 0 && this.isFilter == 0 && this.isSearch == 0) {
        this.paginationFilms(this.page, this.allFilms);
      } else {
        this.paginationFilms(this.page, this.allFilmSort);
      }
    },
    selectedFilter(newValue) {
      this.isFilter = 1;
      let allFilmSort = Array.from(this.allFilms);
      if (newValue != "all") {
        this.allFilmSort = allFilmSort.filter((f) => f.type === newValue);
      } else {
        this.isFilter = 0;
        this.allFilmSort = allFilmSort;
      }
      this.selectedSort = "";
      this.page = 1;
      if (this.allFilmSort.length == 0)
        console.log("По Вашему запросу ничего не найдено");
      this.paginationFilms(this.page, this.allFilmSort);
    },
    selectedSort(newValue) {
      this.isSort = 1;
      let allFilmSort = [];
      if (this.isFilter == 1) {
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
*,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: $bg;
}
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
    background-image: url("./assets/icon-filter.svg");
  }
  .sort-select {
    background-image: url("./assets/icon_sort.png");
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
.mess-none {
  display: none;
}
</style>
