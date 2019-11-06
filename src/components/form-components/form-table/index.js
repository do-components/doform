import FormTable from './form-table.vue'

if (typeof window !== 'undefined' && window.Vue) {
  // 自动加载至全局组件
  window.Vue.component(FormTable.name, FormTable)
}

export default FormTable
