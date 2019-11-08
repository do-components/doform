<template>
  <div class="about">
    <FormPreview
      :formConfig="formConfig"
      :formData="formData"
      ref="formPreview"
    >
      <el-form-item label="附加的" prop="name">
        <el-input type="text" v-model="formData.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">xiao</el-button>
      </el-form-item>
    </FormPreview>
  </div>
</template>
<script>
import FormPreview from '@/components/form-preview'
export default {
  components: {
    FormPreview
  },
  data: function() {
    return {
      formConfig: {
        list: [
          {
            type: 'input',
            name: '单行文本',
            attr: { size: 'large', value: '第一个' },
            config: { label: '标题内人', default: '', required: true },
            key: 'input_15730289804930',
            id: 'input_15730289804930'
          },
          {
            type: 'form-table',
            name: '子表',
            config: { column: 1, label: '子表单' },
            columns: [],
            children: [
              {
                type: 'input',
                name: '标题2',
                attr: { size: 'large', value: '第一个' },
                config: { label: '标题2', default: '', required: false },
                key: 'input_157302898049022',
                id: 'input_157302898049022'
              },
              {
                type: 'input',
                name: '标题',
                attr: { size: 'large', value: '第一个' },
                config: { label: '标题', default: 'ok', required: true },
                key: 'input_15730289804902',
                id: 'input_15730289804902'
              }
            ],
            key: 'form-table_1573029062825',
            id: 'form-table_1573029062825'
          }
        ],
        config: { labelWidth: 100, labelPosition: 'right', size: 'small' }
      },
      formData: {
        name: '',
        'form-table_1573029062825': [
          { input_15730289804902: 1, input_157302898049022: '123' },
          { input_15730289804902: 2, input_157302898049022: '333' }
          // { input_15730289804902: 3, input_157302898049022: '333' }
        ],
        input_15730289804930: '12312'
      }
      // formData: {}
    }
  },
  methods: {
    getData() {
      this.$refs.formPreview.submit()
    }
  }
}
</script>
<style>
/* .el-form-item .el-form-item {
  margin-bottom: 22px !important;
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
} */
/* .el-table td {
  border-bottom: 0 !important;
}
.el-form-item .el-form-item {
  margin-bottom: 22px !important;
} */
.el-table th {
  /* padding: 0 10px !important; */
}
</style>
