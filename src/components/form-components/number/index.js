import Number from './number.vue'

if (typeof window !== 'undefined' && window.Vue) {
  // 自动加载至全局组件
  window.Vue.component(Number.name, Number)
}

export default Number
