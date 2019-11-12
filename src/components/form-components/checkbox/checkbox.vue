<template>
  <el-checkbox-group v-model="newValue" v-on="onEvents">
    <el-checkbox
      :label="option.value"
      v-for="(option, index) in item.options"
      :key="index"
    >
      {{ option.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import formMixin from '@/mixins/form-mixin'
export default {
  name: 'DoCheckbox',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mixins: [formMixin],
  data() {
    return {
      type: 'Array'
    }
  }
}
</script>

<style scoped></style>
