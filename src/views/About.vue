<template>
  <div class="about">
    <FormPreview :formItems="formItems" :formData="formData" ref="formPreview">
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
      formItems: [
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
          config: { column: 1 },
          columns: [],
          children: [
            {
              type: 'input',
              name: '标题2',
              attr: { size: 'large', value: '第一个' },
              config: { label: '标题2', default: '', required: true },
              key: 'input_157302898049022',
              id: 'input_157302898049022'
            },
            {
              type: 'input',
              name: '标题',
              attr: { size: 'large', value: '第一个' },
              config: { label: '标题', default: '', required: true },
              key: 'input_15730289804902',
              id: 'input_15730289804902'
            }
          ],
          key: 'form-table_1573029062825',
          id: 'form-table_1573029062825'
        }
      ],
      formData: {
        'form-table_1573029062825': [
          { input_15730289804902: 1, input_157302898049022: '123' },
          { input_15730289804902: 1, input_157302898049022: '123' }
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
