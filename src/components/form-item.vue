<script>
import common from '@/utils/common'
import formComponentsMap from '@/components/form-components/'
const GlobalComponent = formComponentsMap
import cloneDeep from 'lodash.clonedeep'

export default {
  props: {
    item: Object,
    dataID: String,
    formData: Object
  },
  data() {
    return {
      temp: { span: 8, list: [] },
      newItems: []
    }
  },
  mounted() {
    if (
      this.formData[this.item.key] &&
      this.formData[this.item.key].length > 0
    ) {
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
      const items = this.item.columns
      console.log(items.length)
      return items
    }
  },
  methods: {
    onInput(e) {
      console.log(e, 'eeeeee')
    },
    getComponent(type) {
      return GlobalComponent[common.getComponentName(type)]
    },
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
      console.log(idx, 'idxs is')
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
    // const indexs = this.dataID
    // const that = this
    return (
      <div>
        <el-table data={this.item.columns} fit={true} border>
          {this.item.children.map((col, idx) => {
            const ComponentInfo =
              GlobalComponent[common.getComponentName(col.type)]
            console.log(ComponentInfo, idx)
            return h('el-table-column', {
              props: {
                label: col.config.label
              },
              scopedSlots: {
                // 表头对应的内容， 里面可根据需求自定义
                default: scope => {
                  const com =
                    GlobalComponent[
                      common.getComponentName(scope.row[idx].type)
                    ]
                  const index = scope.$index
                  return (
                    <el-form-item
                      // label={col.config.label}
                      labelWidth="0px"
                      prop={`${item.key}.${index}.${col.key}`}
                      rules={this.rules(col)}
                    >
                      {h(com, {
                        props: {
                          item: col,
                          formData: this.formData,
                          value: this.formData[item.key][index][col.key]
                        },
                        on: {
                          input: value => {
                            console.log('value change is', value)
                            this.formData[item.key][index][col.key] = value
                          }
                        }
                      })}
                    </el-form-item>
                  )
                }
              }
            })
          })}
          <el-table-column
            label="操作"
            {...{
              // slots: {
              //   header: () => {
              //     return <div>xiaojin</div>
              //   }
              // },
              scopedSlots: {
                default: scope => {
                  console.log(scope)
                  return (
                    <el-form-item labelWidth="0px">
                      <el-button
                        type="text"
                        size="small"
                        onClick={this.removeColumn.bind(this, scope.$index)}
                      >
                        删除
                      </el-button>
                    </el-form-item>
                  )
                }
              }
            }}
          >
            <el-button
              slot="header"
              type="text"
              size="small"
              // icon="el-icon-plus"
              onClick={this.addItemColunn.bind(this, this.item)}
            >
              添加项
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    )
    // return (
    //   <div>
    //     {item.columns.map((cols, idx) => {
    //       return (
    //         <table>
    //           <tr>
    //             {cols.map(col => {
    //               const ComponentInfo =
    //                 GlobalComponent[common.getComponentName(col.type)]
    //               return (
    //                 <span>
    //                   <td>
    //                     {
    //                       <div class="component-container" data-id={indexs}>
    //                         <ElFormItem
    //                           label={col.config.label}
    //                           prop={`${item.key}.${idx}.${col.key}`}
    //                           rules={this.rules(col)}
    //                         >
    //                           {h(ComponentInfo, {
    //                             props: {
    //                               item: col,
    //                               formData: this.formData,
    //                               value: this.formData[item.key][idx][col.key]
    //                             },
    //                             on: {
    //                               input: value => {
    //                                 console.log('value change is', value)
    //                                 that.formData[item.key][idx][
    //                                   col.key
    //                                 ] = value
    //                               }
    //                             }
    //                           })}
    //                         </ElFormItem>
    //                       </div>
    //                     }
    //                   </td>
    //                 </span>
    //               )
    //             })}
    //             <td>
    //               <ElButton
    //                 type="danger"
    //                 onClick={this.removeColumn.bind(this, idx)}
    //               >
    //                 删除
    //               </ElButton>
    //             </td>
    //           </tr>
    //         </table>
    //       )
    //     })}
    //     <ElButton type="primary" onClick={this.addItemColunn.bind(this, item)}>
    //       添加
    //     </ElButton>
    //   </div>
    // )
  }
}
</script>

<style></style>
