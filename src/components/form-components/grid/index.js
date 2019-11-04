import Grid from './grid.vue'

if (typeof window !== 'undefined' && window.Vue) {
  // 自动加载至全局组件
  window.Vue.component(Grid.name, Grid)
}

export default Grid
