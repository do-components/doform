const baseComponent = [
  {
    type: 'input',
    name: '数字输入框',
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
    type: 'grid',
    name: '栅格',
    config: {
      column: 24
    }
  },
  {
    type: 'form-table',
    name: '子表',
    config: {
      column: 1,
      label: '子表项'
    },
    columns: [],
    children: []
  }
  // {
  //   name: 'Input',
  //   attr: {
  //     size: 'default',
  //     value: '第二个'
  //   }
  // },
  // {
  //   name: 'Input',
  //   attr: {
  //     size: 'small',
  //     value: '第三个'
  //   }
  // },
  // {
  //   name: 'Containers',
  //   attr: {
  //     style: {
  //       border: '1px solid red'
  //     }
  //   },
  //   children: [
  //     {
  //       name: 'Input',
  //       attr: {
  //         size: 'small',
  //         value: '嵌套的input'
  //       }
  //     },
  //     {
  //       name: 'Rate',
  //       attr: {
  //         size: 'small',
  //         value: '嵌套的input'
  //       }
  //     },
  //     {
  //       name: 'MonthPicker',
  //       attr: {}
  //     },
  //     {
  //       name: 'RangePicker',
  //       attr: {}
  //     },
  //     {
  //       name: 'WeekPicker',
  //       attr: {}
  //     }
  //   ]
  // }
]
export { baseComponent }
