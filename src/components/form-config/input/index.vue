<template>
  <div class="config">
    <el-form
      ref="inputFrom"
      :model="item.config"
      size="small"
      label-position="top"
    >
      <el-form-item label="组件Key" v-if="item.key">
        <el-input type="text" v-model="item.key" disabled />
      </el-form-item>

      <el-form-item label="文本标题" prop="title">
        <el-input
          type="text"
          v-model="item.config.label"
          placeholder="请输入表单标题"
        />
      </el-form-item>

      <el-form-item prop="required">
        <el-checkbox v-model="item.config.required">必填</el-checkbox>
      </el-form-item>

      <el-form-item label="默认值" prop="default">
        <el-input
          type="text"
          v-model="item.config.default"
          placeholder="请输入默认值"
        />
      </el-form-item>

      <el-form-item label="占位内容" prop="placeholder">
        <el-input
          type="text"
          v-model="item.config.placeholder"
          placeholder="请输入占位内容"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'DoInputConfig',
  props: {
    item: {
      tppe: Object,
      required: true
    }
  },
  computed: {}
}
</script>
