import Input from './input/index.vue'
import Number from './number/index.vue'

import Textarea from './textarea/index.vue'
import Radio from './radio/index.vue'
import Checkbox from './checkbox/index.vue'
import Select from './select/index.vue'
import DatePicker from './date-picker/index.vue'
import FileUpload from './file-upload/index.vue'

import Grid from './grid/index.vue'
import FormTable from './form-table/index.vue'
// 所有组件
const formConfigComponentsMap = {
  [Input.name]: Input,
  [Number.name]: Number,
  [Textarea.name]: Textarea,
  [Radio.name]: Radio,
  [Checkbox.name]: Checkbox,
  [Select.name]: Select,
  [DatePicker.name]: DatePicker,
  [FileUpload.name]: FileUpload,
  [Grid.name]: Grid,
  [FormTable.name]: FormTable
}

export default formConfigComponentsMap
