<template>
  <el-form v-model="config" size="small" label-position="top">
    <el-form-item label="标签对齐方式" prop="labelPosition">
      <el-radio-group v-model="config.labelPosition">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶对齐</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标签对齐宽度" prop="labelWidth">
      <el-input-number
        type="number"
        :step="1"
        step-strictly
        v-model="config.labelWidth"
        :min="20"
        :max="200"
      />
    </el-form-item>
    <el-form-item label="组件尺寸" prop="size">
      <el-radio-group v-model="config.size">
        <el-radio-button label="medium"></el-radio-button>
        <el-radio-button label="small"></el-radio-button>
        <el-radio-button label="mini"></el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    config: Object
  }
}
</script>
