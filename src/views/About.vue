<template>
  <div class="about">
    <FormPreview :formItems="formItems" :formData="formData">
      <el-form-item>
        <el-button type="primary">xiao</el-button>
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
          config: { label: 'name', default: '', required: true },
          key: 'input_1572851949468',
          id: 'input_1572851949468'
        },
        {
          type: 'input',
          name: '单行文本',
          attr: { size: 'large', value: '第一个' },
          config: { label: '单行文本', default: '', required: false },
          key: 'input_1572851956466',
          id: 'input_1572851956466'
        },
        {
          type: 'grid',
          name: '栅格',
          config: { column: '8' },
          children: [
            {
              type: 'input',
              name: '单行文本',
              attr: { size: 'large', value: '第一个' },
              config: { label: '单行文本', default: '', required: true },
              key: 'input_1572851975371',
              id: 'input_1572851975371'
            }
          ],
          key: 'grid_1572851979813',
          id: 'grid_1572851979813'
        },
        {
          type: 'grid',
          name: '栅格',
          config: { column: '12' },
          children: [
            {
              type: 'input',
              name: '单行文本',
              attr: { size: 'large', value: '第一个' },
              config: { label: '单行文本', default: '', required: false },
              key: 'input_1572852054457',
              id: 'input_1572852054457'
            }
          ],
          key: 'grid_1572851990674',
          id: 'grid_1572851990674'
        },
        {
          type: 'input',
          name: '单行文本',
          attr: { size: 'large', value: '第一个' },
          config: { label: '单行文本', default: '', required: false },
          key: 'input_1572851903847',
          id: 'input_1572851903847'
        }
      ],
      formData: {}
    }
  }
}
</script>
