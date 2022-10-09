import FileUpload from './file-upload.vue'

if (typeof window !== 'undefined' && window.Vue) {
  // 自动加载至全局组件
  window.Vue.component(FileUpload.name, FileUpload)
}

export default FileUpload
