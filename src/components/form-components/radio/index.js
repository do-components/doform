import Radio from './radio.vue'

if (typeof window !== 'undefined' && window.Vue) {
  // 自动加载至全局组件
  window.Vue.component(Radio.name, Radio)
}

export default Radio
