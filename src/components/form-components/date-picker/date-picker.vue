<template>
  <el-date-picker
    :type="item.config.type"
    v-model="newValue"
    :value-format="item.config.format"
    v-on="onEvents"
    :placeholder="item.config.placeholder"
    :start-placeholder="item.config.startPlaceholder"
    :end-placeholder="item.config.endPlaceholder"
  />
</template>

<script>
import formMixin from '@/mixins/form-mixin'
export default {
  name: 'DoDatePicker',
  props: {},
  mixins: [formMixin],
  data() {
    return {}
  }
}
</script>

<style scoped></style>
