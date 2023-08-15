<template>
  <nav aria-label="Page navigation example" class="pageNav">
    <ul class="pagination">
      <li
        @click="page > 1 ? changePage(page - 1) : null"
        :class="['page-item', page === 1 ? 'item-disabled' : '']"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          :class="{
            'link-disabled': page === 1,
          }"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="changePage(pageNumber)"
        :class="{
          'current-page': page === pageNumber,
        }"
      >
        <a
          :class="['page-link', page === pageNumber ? 'current-page' : '']"
          href="#"
          >{{ pageNumber }}</a
        >
      </li>
      <li
        :class="['page-item', page === totalPages ? 'item-disabled' : '']"
        @click="page < totalPages ? changePage(page + 1) : null"
      >
        <a
          :class="['page-link', page === totalPages ? 'link-disabled' : '']"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "BasePagination",
  props: {
    page: Number,
    totalPages: Number,
  },
  methods: {
    changePage(pageNumber) {
      this.$emit("change", pageNumber);
    },
  },
};
</script>


<style scoped lang="scss">
$bg: #022a37;
$bg2: #e58a00;
ul.pagination {
  justify-content: center;
  padding: 20px 30px !important;
  .item-disabled {
    pointer-events: none;
    cursor: default;
  }
  a.page-link {
    background-color: $bg;
    color: #fff;
  }
  .page-link:focus {
    box-shadow: none;
  }
  .current-page {
    background-color: $bg2 !important;
  }
  .link-disabled {
    color: rgba(255, 255, 255, 0.444) !important;
  }
}
</style>