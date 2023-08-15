<template>
  <div class="form-search d-flex">
    <input
      v-model="nameFilm"
      @keyup.enter="searchFilm"
      @update:model-value="searchFilm"
      class="form-control mr-2"
      type="text"
      placeholder="поиск..."
      aria-label="Search"
      name="nameFilm"
      id="search"
    />
    <button @click="searchFilm" class="btn btn-outline-success">Найти</button>
  </div>
</template>

<script>
export default {
  name: "FormSearch",
  data() {
    return {
      nameFilm: "",
      isSearch: this.isSearch,
    };
  },
  methods: {
    searchFilm() {
      this.isSearch = 1;
      this.$emit("search", this.nameFilm);
    },
  },
};
</script>

<style scoped lang="scss">
$bg: #022a37;
$bg2: #e58a00;
$fontNav: 16px;
$sm: 576px;
$md: 768px;
$lg: 992px;
$xl: 1200px;
.form-search input {
  background-color: #01232e9c;
  border: none;
  margin-right: 5px;
  width: 300px;
  color: #fff;
  font-size: 18px;
  -webkit-box-shadow: 8px 4px 8px 4px rgba(0, 0, 0, 0.3) inset;
  -moz-box-shadow: 8px 4px 8px 4px rgba(0, 0, 0, 0.3) inset;
  box-shadow: 8px 4px 8px 4px rgba(0, 0, 0, 0.3) inset;
}
.form-search button {
  color: #fff;
  border: none;
  font-size: 18px;
  background-color: $bg2;
}
.form-search button:hover {
  background-color: $bg2;
}
@media screen and (min-width: $md) and (max-width: $xl) {
  .form-search input {
    width: 200px;
    font-size: 16px;
  }
  .form-search button {
    font-size: 16px;
  }
}
@media screen and (min-width: $sm) and (max-width: $md) {
  .form-search {
    justify-content: space-between;
  }
  .form-search input {
    width: 100%;
    font-size: 16px;
  }
  .form-search button {
    font-size: 14px;
  }
}
@media screen and (max-width: $sm) {
  .form-search {
    justify-content: space-between;
  }
  .form-search input {
    width: 100%;
    font-size: 14px;
  }
  .form-search button {
    font-size: 12px;
  }
}
</style>