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
