<template>
  <el-table :data="cols">
    <el-table-column prop="date" label="日期" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.type }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    cols: Array
  }
}
</script>
