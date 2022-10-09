import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import masking from './directive/masking'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(masking)

Vue.prototype.$DoFormOptions = {
  upload: {
    action: import.meta.env.VITE_APP_UPLOAD_URL,
    host: import.meta.env.VITE_APP_UPLOAD_HOST,
    fileSize: 1
  }
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
