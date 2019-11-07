<script>
import common from '@/utils/common'
import formComponentsMap from '@/components/form-components/'
const GlobalComponent = formComponentsMap
import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'DoFormTable',
  props: {
    item: Object,
    items: Array,
    dataID: String,
    formData: Object
  },
  data() {
    return {
      temp: { span: 8, list: [] },
      newItems: this.items
    }
  },
  mounted() {
    if (
      this.formData[this.item.key] &&
      this.formData[this.item.key].length > 0
    ) {
      console.log(
        this.item.columns,
        'cols',
        this.formData[this.item.key],
        this.formData
      )
      this.formData[this.item.key].forEach(i => {
        console.log(i, 'i is')
        if (this.item.children.length < 1) {
          alert('模板为空')
          return false
        }
        // alert('ok')
        const temp = cloneDeep(this.item.children)

        this.item.columns.push(temp)
      })
      console.log('this ite', this.item)
    }
  },
  computed: {
    classes() {
      return `container el-col el-col-24`
    },
    columns() {
      const items = new Array(parseInt(this.item.config.column))
      console.log(items.length)
      return items
    }
  },
  methods: {
    rules(item) {
      let rules = []
      if (item.config.required) {
        rules.push({
          required: true,
          message: `${item.config.label}不能为空`,
          trigger: 'blur'
        })
      }
      console.log('rules', rules, item)
      return rules
    },
    addItemColunn(item) {
      if (item.children.length < 1) {
        alert('模板为空')
        return false
      }
      // alert('ok')
      const temp = cloneDeep(item.children)

      item.columns.push(temp)

      let result = {}
      // if (this.formData[item.key] === undefined) {
      //   this.formData[item.key] = []
      // }

      temp.forEach(elm => {
        result[elm.key] = ''
      })
      this.formData[item.key].push(result)

      console.log('reslt', this.formData)
    },
    removeColumn(idx) {
      this.item.columns.splice(idx, 1)
      this.formData[this.item.key].splice(idx, 1)
    },
    addItem() {
      let obj = JSON.parse(JSON.stringify(this.temp))
      obj.key = common.getKey('item')
      this.newItems.push(obj)
    }
  },
  watch: {
    newItems: {
      handler(value) {
        console.log(value, 'value is')
        this.$emit('add-item', value)
      }
    }
  },
  render(h) {
    const item = this.item
    const indexs = this.dataID
    const that = this
    return (
      <div>
        {item.columns.map((cols, idx) => {
          return (
            <table>
              <tr>
                {cols.map(col => {
                  const ComponentInfo =
                    GlobalComponent[common.getComponentName(col.type)]
                  return (
                    <span>
                      <td>
                        {
                          <div class="component-container" data-id={indexs}>
                            <ElFormItem
                              label={col.config.label}
                              prop={`${item.key}.${idx}.${col.key}`}
                              rules={this.rules(col)}
                            >
                              {h(ComponentInfo, {
                                props: {
                                  item: col,
                                  formData: this.formData,
                                  value: this.formData[item.key][idx][col.key]
                                },
                                on: {
                                  input: value => {
                                    console.log('value change is', value)
                                    that.formData[item.key][idx][
                                      col.key
                                    ] = value
                                  }
                                }
                              })}
                            </ElFormItem>
                          </div>
                        }
                      </td>
                    </span>
                  )
                })}
                <td>
                  <ElButton
                    type="danger"
                    onClick={this.removeColumn.bind(this.idx)}
                  >
                    删除
                  </ElButton>
                </td>
              </tr>
            </table>
          )
        })}
        <ElButton type="primary" onClick={this.addItemColunn.bind(this, item)}>
          添加
        </ElButton>
      </div>
    )
  }
}
</script>

<style scoped></style>
