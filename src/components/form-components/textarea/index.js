import Textarea from './textarea.vue'

if (typeof window !== 'undefined' && window.Vue) {
  // 自动加载至全局组件
  window.Vue.component(Textarea.name, Textarea)
}

export default Textarea
