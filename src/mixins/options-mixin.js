export default {
  computed: {
    // 获取组件名: 去除Do, 并将组件转为 kebab-case
    componentName() {
      let name = this.$options.name
      name = name
        .replace('Do', '')
        .replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, '-$&')
        .toLowerCase()
      if (name.startsWith('-')) name = name.slice(1)
      return name
    },
    // 全局属性
    globalOptions() {
      console.log(this.$DoFormOptions, 'this.$DoFormOptions')
      return this.$DoFormOptions || {}
    },
    // 全局上传组件属性
    globalUploadOptions() {
      return this.globalOptions.upload || {}
    },
    globalComponentOptions() {
      if (this.isUploadComponent) {
        return Object.assign(
          {},
          this.globalUploadOptions,
          this.globalOptions[this.componentName]
        )
      } else {
        return this.globalOptions[this.componentName]
      }
    },
    options() {
      return Object.assign({}, this.globalComponentOptions)
    }
  }
}
