const formBuiltInNames = ['input', 'grid', 'form-table', 'textarea', 'number']
import formComponentsMap from '@/components/form-components'
import formConfigComponentssMap from '@/components/form-config'

export default {
  clearAndUpper(text) {
    return text.replace(/-/, '').toUpperCase()
  },
  getPascalCase(text) {
    return text.replace(/(^\w|-\w)/g, this.clearAndUpper)
  },
  getComponentName(typeName) {
    if (formBuiltInNames.includes(typeName)) {
      // 内置组件
      return 'Do' + this.getPascalCase(typeName)
    } else {
      // 外部组件
      return typeName
    }
  },
  getComponent(typeName) {
    return formComponentsMap[this.getComponentName(typeName)]
  },
  getComponentConfig(typeName) {
    const config = this.getComponentName(typeName) + 'Config'
    return formConfigComponentssMap[config]
  },
  getKey(prefix = 'input') {
    const number = Date.parse(new Date()) + Math.ceil(Math.random() * 99999)
    return prefix + '_' + number
  },
  deepClone(obj) {
    let o

    if (typeof obj === 'object') {
      if (obj === null) {
        o = null
      } else {
        if (obj instanceof Array) {
          o = []
          for (var i = 0, len = obj.length; i < len; i++) {
            o.push(this.deepClone(obj[i]))
          }
        } else {
          o = {}
          for (var j in obj) {
            o[j] = this.deepClone(obj[j])
          }
        }
      }
    } else {
      o = obj
    }
    return o
  },
  getGuid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    )
  },
  // 是否没定义
  isUnDef(val) {
    return val === null || val === undefined
  },
  // 是否定义
  isDef(val) {
    return !this.isUnDef(val)
  },
  // 判断类型
  is(val, type) {
    const typeArr = Array.isArray(type) ? type : [type]
    const valType = Object.prototype.toString.call(val)
    return typeArr.some(type => `[object ${type}]` === valType)
  },

  // 查找obj
  findItem(obj, arr) {
    const result = arr.filter(item => item.key == obj.key)
    return result
  },

  dfs(obj, targetId) {
    if (obj.id === targetId) {
      return obj
    }
    if (obj.children) {
      for (let item of obj.children) {
        let check = this.dfs(item, targetId)
        if (check) {
          return check
        }
      }
    }
    return null
  },

  findUIDObj(uid, arr) {
    if (!arr) return
    const idx = arr.findIndex(obj => obj.id === uid)
    if (idx > -1) return [arr, idx]
    for (const obj of arr) {
      const result = this.findUIDObj(uid, obj.children)
      if (result) return result
    }
  }
}
