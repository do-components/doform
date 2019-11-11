<template>
  <el-input-number
    v-model="newValue"
    :min="item.config.min"
    :max="item.config.max"
    :step="item.config.step"
    controls-position="right"
    v-on="onEvents"
    v-if="hasMax"
  />
  <el-input-number
    v-model="newValue"
    :min="item.config.min"
    :step="item.config.step"
    controls-position="right"
    v-on="onEvents"
    v-else
  />
</template>

<script>
import formMixin from '@/mixins/form-mixin'
export default {
  name: 'DoNumber',
  props: {},
  mixins: [formMixin],
  data() {
    return {}
  },
  computed: {
    hasMax() {
      let max = this.item.config.max
      return max > 0
    }
  }
}
</script>

<style scoped></style>
