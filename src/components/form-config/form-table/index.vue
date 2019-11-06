<template>
  <div class="config">
    <el-form :model="item.config" label-position="top">
      <el-form-item label="组件Key" v-if="item.key">
        <el-input type="text" v-model="item.key" disabled />
      </el-form-item>

      <el-form-item label="列数" prop="column">
        <el-input type="text" v-model="item.config.column" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'DoFormTableConfig',
  props: {
    item: Object
  },
  data() {
    return {}
  },
  computed: {}
}
</script>
