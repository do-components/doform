<template>
  <div class="config-form">
    <el-form :model="item.config" size="small" label-position="top">
      <el-form-item label="组件Key" v-if="item.key">
        <el-input type="text" v-model="item.key" disabled />
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input
          type="text"
          v-model="item.config.label"
          placeholder="请输入标题"
        />
      </el-form-item>

      <el-form-item prop="required">
        <el-checkbox v-model="item.config.required">必填</el-checkbox>
      </el-form-item>

      <el-form-item label="提示文字" prop="tip">
        <el-input type="text" v-model="item.config.tip" />
      </el-form-item>

      <el-form-item label="最大上传数" prop="limit">
        <el-input-number
          :max="10"
          :min="1"
          :step="1"
          v-model="item.config.limit"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'DoFileUploadConfig',
  props: {
    item: {
      tppe: Object,
      required: true
    }
  },
  computed: {}
}
</script>
