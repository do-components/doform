import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import masking from './directive/masking'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(masking)

Vue.prototype.$DoFormOptions = {
  upload: {
    action: process.env.VUE_APP_UPLOAD_URL,
    host: process.env.VUE_APP_UPLOAD_HOST,
    fileSize: 1
  }
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
