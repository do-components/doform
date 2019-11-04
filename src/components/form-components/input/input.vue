<template>
  <el-input type="text" v-model="newValue" v-on="onEvents" />
</template>

<script>
import formMixin from '@/mixins/form-mixin'
export default {
  name: 'DoInput',
  props: {},
  mixins: [formMixin],
  data() {
    return {}
  }
}
</script>

<style scoped></style>
