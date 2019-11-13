<template>
  <div class="config-form">
    <el-form :model="item.config" size="small" label-position="top">
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

      <!-- <el-form-item label="默认值" prop="default">
        <el-input
          type="text"
          v-model="item.config.default"
          placeholder="请输入默认值"
        />
      </el-form-item> -->

      <el-form-item label="类型" prop="type">
        <el-select v-model="item.config.type">
          <el-option
            v-for="option in options"
            :label="option.label"
            :value="option.value"
            :key="option.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="占位内容"
        prop="placeholder"
        v-if="!item.config.type.includes('range')"
      >
        <el-input
          type="text"
          v-model="item.config.placeholder"
          placeholder="请输入占位内容"
        />
      </el-form-item>
      <el-form-item
        label="开始时间占位内容"
        prop="start-placeholder"
        v-if="item.config.type.includes('range')"
      >
        <el-input
          type="text"
          v-model="item.config.startPlaceholder"
          placeholder="开始时间占位内容"
        />
      </el-form-item>
      <el-form-item
        label="结束时间占位内容"
        prop="end-placeholder"
        v-if="item.config.type.includes('range')"
      >
        <el-input
          type="text"
          v-model="item.config.endPlaceholder"
          placeholder="结束时间占位内容"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'DoDatePickerConfig',
  props: {
    item: {
      tppe: Object,
      required: true
    }
  },
  data() {
    return {
      options: [
        {
          label: '日期',
          value: 'date'
        },
        {
          label: '日期范围',
          value: 'daterange'
        }
      ]
    }
  },
  computed: {}
}
</script>
