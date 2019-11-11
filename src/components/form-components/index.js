import Input from './input'
import Textarea from './textarea'
import Number from './number'

import Grid from './grid'
import FormTable from './form-table'
// 所有组件
const formComponentsMap = {
  [Input.name]: Input,
  [Textarea.name]: Textarea,
  [Number.name]: Number,
  [Grid.name]: Grid,
  [FormTable.name]: FormTable
}

export default formComponentsMap
