<template>
  <div class="config-form">
    <el-form :model="item.config" size="small" label-position="top">
      <el-form-item label="组件Key" v-if="item.key">
        <el-input type="text" v-model="item.key" disabled />
      </el-form-item>

      <el-form-item label="名称" prop="label">
        <el-input type="text" v-model="item.config.label" />
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
