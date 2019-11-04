import common from '@/utils/common'
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {}
  },
  data() {
    return {
      // 默认事件
      defaultOn: {
        input: this.handleChange
      },
      styles: [],
      rules: [],
      newValue: this.value
    }
  },
  computed: {
    onEvents() {
      return Object.assign({}, this.defaultOn)
    }
  },
  mounted() {
    this.triggerDefault()
  },
  methods: {
    triggerDefault() {
      const value = this.value
      const isArr = Array.isArray(value)
      // 值为空
      if (
        common.isUnDef(value) ||
        value === '' ||
        (isArr && value.length === 0)
      ) {
        // 默认值不为空
        // console.log('值为空，下面判断默认')
        if (common.isDef(this.item.config.default)) {
          // console.log('有默认值', this.item.config.default)
          let defaultValue = this.item.config.default
          //   // 判断是否有格式化函数
          //   if (this.desc.displayFormatter) {
          //     defaultValue = this.desc.displayFormatter(defaultValue)
          //   }

          // 默认值类型检查
          if (this.checkType && !this.checkType(defaultValue, true)) {
            return
          }

          this.newValue = defaultValue
          this.handleChange(this.newValue)
        }
      }
    },
    handleChange(value) {
      this.$emit('input', value)
    },
    handleChangeEvent(e) {
      console.log('envet is', e)
      this.handleChange(e.target.value)
    },
    // 检查类型
    checkType(val, isDefault = false) {
      if (this.type && common.isDef(val)) {
        const isOk = common.is(val, this.type)
        if (!isOk) {
          console.error(
            `[doform warn]: ${this.item.labelText} 的${
              isDefault ? '默认' : ''
            }值类型错误, 期望 [${this.type}] 类型, 但`,
            val,
            '不是该类型, 请检查'
          )
        }
        return isOk
      } else {
        return true
      }
    },
    // 初始化数据
    handleValueChanged(value) {
      // if (this.desc.displayFormatter) {
      //   value = this.desc.displayFormatter(value)
      // }

      if (this.checkType(value)) {
        // if (this.customInit) {
        //   value = this.customInit(value)
        // }
        this.newValue = value
      }
    }
  },
  watch: {
    value: {
      handler(value) {
        this.handleValueChanged(value)
        // if (this.checkType(value)) {
        //   this.newValue = value
        //   this.handleChange(value)
        // }
      },
      immediate: true
    }
  }
}
