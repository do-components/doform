<script>
// @ is an alias to /src
import draggable from 'vuedraggable'
import common from '@/utils/common'

import formComponentsMap from '@/components/form-components/'

const GlobalComponent = formComponentsMap
export default {
  name: 'FormPreview',

  props: {
    formItems: { type: Array, required: true },
    formData: { type: Object, required: true }
  },
  data() {
    return {
      baseComponents: this.formItems,
      currentItem: null,
      currentItemPath: null
      // formData: {}
    }
  },
  components: {
    // Rate,
    // Input,
    // MonthPicker,
    // RangePicker,
    // WeekPicker,
    draggable
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
    // 递归函数
    loop(arr, index) {
      const that = this
      const result = arr.map((item, i) => {
        const indexs = index === '' ? String(i) : `${index}-${i}`
        if (item.children) {
          //   const GridInfo = GlobalComponent[common.getComponentName(item.name)]
          //   const grid = that.$createElement(
          //     GridInfo,
          //     { props: { wiget: item, dataID: indexs } },
          //     that.loop(item.children, indexs)
          //   )
          //   return grid
          return (
            <div
              {...item.attr}
              class={`container el-col el-col-${item.config.column}`}
              data-id={indexs}
            >
              <div class="container-block">
                {that.loop(item.children, indexs)}
              </div>
            </div>
          )
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
  render() {
    const result = this.loop(this.baseComponents, '')
    return (
      <div class="form-preview-container">
        <ElForm
          labelWidth="100px"
          ref="previewForm"
          // validateOnRuleChange={false}
          {...{
            props: {
              model: this.formData
              // rules: { name: { required: true, trigger: ['blur'] } }
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
