<template>
  <div :class="classes" :data-id="dataID">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DoGrid',
  props: {
    item: Object,
    dataID: String
  },
  data() {
    return {}
  },
  computed: {
    classes() {
      return `container el-col el-col-${this.item.config.column}`
    }
  },
  methods: {}
}
</script>

<style scoped></style>
