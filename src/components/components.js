const baseComponent = [
  {
    type: 'input',
    name: '单行文本',
    config: {
      label: '单行文本',
      default: '',
      required: false,
      placeholder: ''
    }
  },
  {
    type: 'number',
    name: '数字输入框',
    config: {
      label: '数字输入框',
      default: 0,
      required: false,
      min: 0,
      max: 0,
      step: 1
    }
  },
  {
    type: 'textarea',
    name: '多行文本',
    config: {
      label: '多行文本',
      default: '',
      required: false,
      placeholder: '',
      rows: 3
    }
  },
  {
    type: 'radio',
    name: '单选框',
    config: {
      label: '单选框',
      default: '选项1',
      required: false,
      placeholder: ''
    },
    options: [
      { label: '选项1', value: '选项1' },
      { label: '选项2', value: '选项2' }
    ]
  },
  {
    type: 'checkbox',
    name: '多选框',
    config: {
      label: '多选框',
      default: ['选项1'],
      required: false,
      placeholder: ''
    },
    options: [
      { label: '选项1', value: '选项1' },
      { label: '选项2', value: '选项2' }
    ]
  },
  {
    type: 'select',
    name: '下拉列表',
    config: {
      label: '下拉列表',
      default: '',
      required: false,
      placeholder: ''
    },
    options: [
      { label: '选项1', value: '选项1' },
      { label: '选项2', value: '选项2' }
    ]
  },
  {
    type: 'date-picker',
    name: '日期选择',
    config: {
      label: '日期选择',
      default: '',
      required: false,
      type: 'date',
      format: 'yyyy-MM-dd',
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: ''
    }
  }
]
const containerComponent = [
  {
    type: 'grid',
    name: '栅格布局',
    config: {
      column: 24
    }
  },
  {
    type: 'form-table',
    name: '明细子表',
    config: {
      column: 1,
      label: '明细子表'
    },
    columns: [],
    children: []
  }
]
export { baseComponent, containerComponent }
