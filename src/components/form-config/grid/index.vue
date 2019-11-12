<template>
  <div class="config-form">
    <el-form :model="item.config" size="small" label-position="top">
      <el-form-item label="组件Key" v-if="item.key">
        <el-input type="text" v-model="item.key" disabled />
      </el-form-item>

      <el-form-item label="列数" prop="column">
        <el-radio-group v-model="item.config.column">
          <el-radio-button label="6"></el-radio-button>
          <el-radio-button label="8"></el-radio-button>
          <el-radio-button label="12"></el-radio-button>
          <el-radio-button label="24"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'DoGridConfig',
  props: {
    item: Object
  },
  data() {
    return {
      columns: { 8: '8列', 12: '12列', 24: '24列' }
    }
  },
  computed: {}
}
</script>
