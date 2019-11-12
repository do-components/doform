import Input from './input'
import Number from './number'

import Textarea from './textarea'
import Radio from './radio'
import Checkbox from './checkbox'
import Grid from './grid'
import FormTable from './form-table'
// 所有组件
const formConfigComponentsMap = {
  [Input.name]: Input,
  [Number.name]: Number,
  [Textarea.name]: Textarea,
  [Radio.name]: Radio,
  [Checkbox.name]: Checkbox,
  [Grid.name]: Grid,
  [FormTable.name]: FormTable
}

export default formConfigComponentsMap
