<template>
  <el-input
    type="textarea"
    v-model="newValue"
    v-on="onEvents"
    :rows="item.config.rows"
    :placeholder="item.config.placeholder"
  />
</template>

<script>
import formMixin from '@/mixins/form-mixin'
export default {
  name: 'DoTextarea',
  props: {},
  mixins: [formMixin],
  data() {
    return {}
  }
}
</script>

<style scoped></style>
