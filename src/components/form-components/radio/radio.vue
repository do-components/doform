<template>
  <el-radio-group v-model="newValue" v-on="onEvents">
    <el-radio
      :label="option.value"
      v-for="(option, index) in item.options"
      :key="index"
    >
      {{ option.label }}
    </el-radio>
  </el-radio-group>
</template>

<script>
import formMixin from '@/mixins/form-mixin'
export default {
  name: 'DoRadio',
  props: {},
  mixins: [formMixin],
  data() {
    return {}
  }
}
</script>

<style scoped></style>
