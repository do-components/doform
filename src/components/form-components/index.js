import Input from './input'
import Textarea from './textarea'
import Number from './number'
import Radio from './radio'
import Checkbox from './checkbox'
import Select from './select'
import DatePicker from './date-picker'

import Grid from './grid'
import FormTable from './form-table'
// 所有组件
const formComponentsMap = {
  [Input.name]: Input,
  [Textarea.name]: Textarea,
  [Number.name]: Number,
  [Radio.name]: Radio,
  [Checkbox.name]: Checkbox,
  [Select.name]: Select,
  [DatePicker.name]: DatePicker,
  [Grid.name]: Grid,
  [FormTable.name]: FormTable
}

export default formComponentsMap
