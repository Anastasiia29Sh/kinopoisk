<template>
  <nav aria-label="Page navigation example" class="pageNav">
    <ul class="pagination">
      <li
        class="page-item"
        @click="page > 1 ? changePage(page - 1) : null"
        :class="{
          'item-disabled': page === 1,
        }"
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
          class="page-link"
          :class="{
            'current-page': page === pageNumber,
          }"
          href="#"
          >{{ pageNumber }}</a
        >
      </li>
      <li
        class="page-item"
        @click="page < totalPages ? changePage(page + 1) : null"
        :class="{
          'item-disabled': page === totalPages,
        }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          :class="{
            'link-disabled': page === totalPages,
          }"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      required: true,
    },
    totalPages: {
      required: true,
    },
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