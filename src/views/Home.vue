<script>
import common from '@/utils/common'

export default {
  name: 'Home',
  data() {
    return {
      formData: {},
      currentItem: null,
      formItems: []
    }
  },
  render(h) {
    const items = this.formItems.map(item => {
      const component = common.getComponent(item.type)
      const com = h(component, {
        props: {
          item: item,
          formData: this.formData
        },
        on: {
          input: value => {
            this.$set(this.formData, item.key, value)
          }
        }
      })
      return (
        <div
          style="padding: 15px;"
          onClick={e => {
            console.log(e)
            this.currentItem = item
          }}
        >
          <el-form-item label={item.config.label}>{com}</el-form-item>
        </div>
      )
    })
    let config = <div>请先选择组件</div>
    if (this.currentItem) {
      config = h(common.getComponentConfig(this.currentItem.type), {
        props: {
          item: this.currentItem
        }
      })
    }
    return h('div', {}, [<el-form>{items}</el-form>, config])
  }
}
</script>
