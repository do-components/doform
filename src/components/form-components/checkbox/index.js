import Checkbox from './checkbox.vue'

if (typeof window !== 'undefined' && window.Vue) {
  // 自动加载至全局组件
  window.Vue.component(Checkbox.name, Checkbox)
}

export default Checkbox
