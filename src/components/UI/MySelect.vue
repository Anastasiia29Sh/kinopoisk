<template>
  <select class="form-select" :value="modelValue" @change="changeOption">
    <option disabled value="">{{ nameSelect }}</option>
    <option v-for="option of options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "MySelect",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
    },
    nameSelect: {
      type: String,
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
$bg: #022a37;
$bg2: #e58a00;
$sm: 576px;
$md: 768px;
$lg: 992px;
$xl: 1200px;
select {
  background-color: $bg;
  color: #fff;
  border: 1px solid #ffffff7c;
}
select:focus {
  border: 1px solid $bg2;
  box-shadow: none;
}
@media screen and (min-width: $sm) and (max-width: $md) {
  select {
    font-size: 14px;
  }
}
@media screen and (max-width: $sm) {
  select {
    font-size: 12px;
  }
}
</style>