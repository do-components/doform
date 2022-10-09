import DatePicker from './date-picker.vue'

if (typeof window !== 'undefined' && window.Vue) {
  // 自动加载至全局组件
  window.Vue.component(DatePicker.name, DatePicker)
}

export default DatePicker
