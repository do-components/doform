import Vue from 'vue'
import FormDesign from '@/components/form-design.vue'
import FormPreview from '@/components/form-preview.vue'
import masking from './directive/masking/index.js'

Vue.use(masking)

FormDesign.install = function(Vue) {
  Vue.component(FormDesign.name, FormDesign)
}

FormPreview.install = function(Vue) {
  Vue.component(FormPreview.name, FormPreview)
}

const components = [FormDesign, FormPreview]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { install, FormPreview, FormDesign }

export default {
  install,
  FormPreview,
  FormDesign
}
