<template>
  <div :class="classes" :data-id="dataID">
    <!-- <el-button type="primary" @click="addItem">Add</el-button> -->
    <!-- <div v-for="(newItem, index) in newItems" :key="index">
      {{ newItem }}
    </div> -->
    <slot></slot>
  </div>
</template>

<script>
import common from '../../../utils/common'
export default {
  name: 'DoFormTable',
  props: {
    item: Object,
    items: Array,
    dataID: String
  },
  data() {
    return {
      temp: { name: 'input', mobile: 'input' },
      newItems: this.items
    }
  },
  computed: {
    classes() {
      return `container el-col el-col-24`
    },
    columns() {
      const items = new Array(parseInt(this.item.config.column))
      console.log(items.length)
      return items
    }
  },
  methods: {
    addItem() {
      let obj = JSON.parse(JSON.stringify(this.temp))
      obj.key = common.getKey('item')
      this.newItems.push(obj)
    }
  },
  watch: {
    newItems: {
      handler(value) {
        console.log(value)
      }
    }
  }
}
</script>

<style scoped></style>
