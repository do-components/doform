<script lang="jsx">
// @ is an alias to /src
import draggable from 'vuedraggable'
import common from '@/utils/common'
import cloneDeep from 'lodash.clonedeep'

import formComponentsMap from '@/components/form-components/index.js'
import FormItem from './form-item.vue'
const GlobalComponent = formComponentsMap
export default {
  name: 'FormPreview',
  components: {
    draggable,
    FormItem
  },
  props: {
    formConfig: { type: Object, required: true },
    formData: { type: Object, required: true }
  },
  data() {
    return {
      formItems: this.formConfig.list,
      currentItem: null,
      currentItemPath: null
      // formData: this.data
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
    setValue(key, val) {
      console.log('set val', val)
      this.$set(this.formData, key, val)
    },
    addItemColunn(item) {
      if (item.children.length < 1) {
        alert('模板为空')
        return false
      }
      // alert('ok')
      const temp = cloneDeep(item.children)
      let result = {}
      // if (this.formData[item.key] === undefined) {
      //   this.formData[item.key] = []
      // }

      temp.forEach(elm => {
        result[elm.key] = ''
      })
      this.formData[item.key].push(result)
      item.columns.push(temp)
      console.log('reslt', this.formData)
    },
    // 递归函数
    renderComponents(arr, index) {
      const that = this
      const result = arr.map((item, i) => {
        const indexs = index === '' ? String(i) : `${index}-${i}`
        if (item.children && item.type == 'grid') {
          //   const GridInfo = GlobalComponent[common.getComponentName(item.name)]
          //   const grid = that.$createElement(
          //     GridInfo,
          //     { props: { wiget: item, dataID: indexs } },
          //     that.renderComponents(item.children, indexs)
          //   )
          //   return grid
          return (
            <div
              {...item.attr}
              class={`container el-col el-col-${item.config.column}`}
              data-id={indexs}
            >
              <div class="container-block">
                {that.renderComponents(item.children, indexs)}
              </div>
            </div>
          )
        }
        if (item.type == 'form-table') {
          if (this.formData[item.key] === undefined) {
            this.$set(this.formData, item.key, [])
          }
          // debugger

          // return item.children.map(col => {
          return (
            <div class="form-table-container component-container">
              <el-form-item label={item.config.label}>
                {that.$createElement(FormItem, {
                  props: {
                    item: item,
                    // items: item.children,
                    formData: this.formData
                  }
                })}
              </el-form-item>
            </div>
            // <el-form-item label={item.config.label}>
            //   <el-card class="box-card" shadow="never">
            //     <div>
            //       {that.$createElement(FormItem, {
            //         props: {
            //           item: item,
            //           // items: item.children,
            //           formData: this.formData
            //         }
            //       })}
            //     </div>
            //   </el-card>
            // </el-form-item>
          )
          // return <div>xiao</div>
          // })
        }
        const ComponentInfo =
          GlobalComponent[common.getComponentName(item.type)]
        return (
          <div class="component-container" data-id={indexs}>
            <ElFormItem
              label={item.config.label}
              prop={item.key}
              // required={item.config.required}
              rules={this.rules(item)}
            >
              {that.$createElement(ComponentInfo, {
                props: {
                  item: item,
                  formData: this.formData,
                  value: this.formData[item.key]
                  // setValue: this.setValue
                },
                on: {
                  input: value => {
                    console.log('value change is', value)
                    // that.formData[item.key] = value
                    that.$set(that.formData, item.key, value)
                  }
                }
              })}
            </ElFormItem>
          </div>
        )
      })
      return result
    },
    resetData() {
      this.resetForm()

      this.formConfig.list.forEach(item => {
        if (item.columns) {
          item.columns = []
        }
        delete this.formData[item.key]
      })
      // this.resetForm()
    },
    resetForm() {
      console.log('reset')
      this.$refs.previewForm.resetFields()
    },
    clearForm() {
      // 调用内部方法进行值的重置
      this.$refs.previewForm.fields.forEach(field => {
        this.formData[field.prop] = ''
      })
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs.previewForm.validate(valid => {
          if (valid) {
            resolve(this.formData)
          } else {
            reject(new Error('表单校验失败').message)
          }
        })
      })
    },
    resultDialog(res) {
      this.$msgbox({
        title: '表单数据',
        message: res
      })
    },
    submit() {
      this.getData()
        .then(res => {
          // console.log(res)
          this.resultDialog(res)
        })
        .catch(err => this.$message({ type: 'error', message: err }))
    }
  },
  computed: {},
  mounted() {},
  destroyed() {
    // this.resetData()
  },
  watch: {
    formData: {
      handler(value) {
        console.log('formdata', value)
      },
      deep: true,
      immediate: true
    }
  },
  render() {
    const result = this.renderComponents(this.formItems, '')
    return (
      <div class="form-preview-container">
        <ElForm
          // labelWidth={this.formConfig.config.labelWidth + 'px'}
          // labelPosition={this.formConfig.config.labelPosition}
          // size={this.formConfig.config.size}
          ref="previewForm"
          // validateOnRuleChange={false}
          {...{
            props: {
              model: this.formData
              // rules: { name: { required: true, trigger: ['blur'] } }
            },
            attrs: {
              ...this.formConfig.config,
              labelWidth: this.formConfig.config.labelWidth + 'px'
            }
          }}
        >
          <div class="el-row">{result}</div>
          {this.$slots.default}
        </ElForm>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.component-container {
  clear: both;
  // min-height: 60px;
  // padding-bottom: 1px;
  // margin: 0 10px;
  // box-sizing: border-box;
  position: relative;
  // cursor: move;
}
</style>
