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

      <el-form-item label="最小值" prop="min">
        <el-input-number :min="0" v-model="item.config.min" />
      </el-form-item>

      <el-form-item label="最大值" prop="max">
        <el-input-number :min="0" v-model="item.config.max" />
      </el-form-item>
      <el-form-item label="步长" prop="step">
        <el-input-number :min="1" v-model="item.config.step" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'DoNumberConfig',
  props: {
    item: {
      tppe: Object,
      required: true
    }
  },
  computed: {}
}
</script>
