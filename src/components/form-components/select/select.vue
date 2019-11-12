<template>
  <el-select
    v-model="newValue"
    v-on="onEvents"
    clearable
    filterable
    :placeholder="item.config.placeholder"
  >
    <el-option
      :label="option.label"
      :value="option.value"
      v-for="(option, index) in item.options"
      :key="index"
    >
      {{ option.label }}
    </el-option>
  </el-select>
</template>

<script>
import formMixin from '@/mixins/form-mixin'
export default {
  name: 'DoSelect',
  props: {},
  mixins: [formMixin],
  data() {
    return {
      type: ['Boolean', 'Number', 'String', 'Array']
    }
  }
}
</script>

<style scoped></style>
