<script>
import { baseComponent } from '@/components/components'
import draggable from 'vuedraggable'
import uniqueId from 'lodash.uniqueid'
import cloneDeep from 'lodash.clonedeep'
import common from '@/utils/common'

import { isPath, getCloneItem, itemRemove } from '@/utils/utils'
import formComponentsMap from '@/components/form-components'
import formConfigComponentsMap from '@/components/form-config'
import FormPreview from '../FormPreview/FormPreview'

const GlobalComponent = formComponentsMap
export default {
  name: 'FormDesign',
  data() {
    return {
      baseComponents: [],
      componentList: baseComponent,
      currentItem: null,
      currentItemPath: null,
      formData: {},
      opened: false
    }
  },
  components: {
    draggable
  },
  methods: {
    mouseenter(e) {
      const block = e.target.dataset.block
      if (block && block === 'container') {
        e.target.style = 'border: 2px dotted blueviolet !important;'
      }
    },
    mouseleave(e) {
      const block = e.target.dataset.block
      if (block && block === 'container') {
        e.target.style = 'border: 2px dotted #409eff!important;'
      }
    },
    selectContainer(item, e) {
      e.stopPropagation()
      console.log(e, item)
      // const item = getItem(indexs, this.baseComponents)
      // console.log(indexs, item)
      this.setCurrent(item)

      // this.currentItem = item
    },

    showPreview(e) {
      console.log(e)
      this.opened = true
      // const content = this.$createElement(FormPreview, {
      //   props: {
      //     formItems: this.baseComponents,
      //     fotmData: {}
      //   }
      // })
      // console.log(content)
      // this.$Modal({
      //   title: '可要',
      //   component: {
      //     vue: FormPreview,
      //     datas: {
      //       formItems: this.baseComponents,
      //       formData: {}
      //     }
      //   }
      // })
      // this.$Modal({
      //   title: '预览',
      //   width: 1000,
      //   component: {
      //     // 这里也可以定义异步调用
      //     // vue: (resolve) => {
      //     //   require(['./modalTest'], resolve);
      //     // },
      //     vue: FormPreview,
      //     datas: { formItems: this.baseComponents, formData: {} } // 子组件使用props params参数获取数据，建议使用datas
      //   }
      // })
    },
    // 递归函数
    loop(arr, index) {
      const that = this
      const directives = [{ name: 'masking' }]

      // const h = this.$createElement;

      const result = arr.map((item, i) => {
        const indexs = index === '' ? String(i) : `${index}-${i}`
        if (item.children) {
          const GridInfo = GlobalComponent[common.getComponentName(item.name)]
          return that.$createElement(
            GridInfo,
            { props: { wiget: item, dataID: indexs } },
            [
              <draggable
                key={uniqueId()}
                // class="container-block"
                class={
                  this.currentItem && item.key === this.currentItem.key
                    ? `container-block container-current`
                    : `container-block`
                }
                list={item.children}
                ref={c => c && (this.sortable = c.sortable)}
                group={{
                  name: 'formItem',
                  pull: true,
                  put: true
                }}
                // handle=".masking__drag"
                animation={150}
                nativeOnAdd={e => this.sortableAdd(e)}
                data-block="container"
                nativeOnClick={this.selectContainer.bind(this, item)}
              >
                {that.loop(item.children, indexs)}
              </draggable>,
              <div class="container-actions">
                <div
                  class="delete"
                  onClick={that.deleteItem.bind(this, indexs)}
                >
                  <i class="h-icon-trash"></i>
                </div>
              </div>
            ]
          )
        }
        const ComponentInfo =
          GlobalComponent[common.getComponentName(item.name)]
        return (
          <div
            // class="component-container"
            class={
              this.currentItem && item.key === this.currentItem.key
                ? 'component-container active'
                : 'component-container'
            }
            data-id={indexs}
            {...{ directives }}
            onClick={e => this.handleItemClick(indexs, item, e)}
          >
            <FormItem label={item.config.label} required={item.config.required}>
              {that.$createElement(ComponentInfo, {
                // domProps: { ...item.attr },
                props: {
                  wiget: item,
                  value: item.config.defaultValue,
                  formData: this.formData
                }
              })}
            </FormItem>
          </div>
        )
      })
      return result
    },

    onAdd(e) {
      console.log(e, 'add')
    },
    sortableAdd2(evt) {
      console.log(evt)
    },
    sortableAdd(evt) {
      // evt.stopPropagation()
      // 组件名或路径
      const nameOrIndex = evt.clone.getAttribute('data-id')
      // 父节点路径
      const parentPath = evt.path[1].getAttribute('data-id')
      // 拖拽元素的目标路径
      const { newIndex } = evt
      // 新路径 为根节点时直接使用index
      const newPath = parentPath ? `${parentPath}-${newIndex}` : newIndex
      console.log(
        evt,
        'adedd',
        nameOrIndex,
        parentPath,
        newPath,
        isPath(nameOrIndex)
      )
      // 判断是否为路径 路径执行移动，非路径为新增
      if (isPath(nameOrIndex)) {
        // 旧的路径index
        const oldIndex = nameOrIndex
        // 克隆要移动的元素
        const dragItem = getCloneItem(oldIndex, this.baseComponents)
        // 比较路径的上下位置 先执行靠下的数据 再执行考上数据
        // if (indexToArray(oldIndex) > indexToArray(newPath)) {
        //   // 删除元素 获得新数据
        //   let newTreeData = itemRemove(oldIndex, this.baseComponents)
        //   // 添加拖拽元素
        //   itemAdd(newPath, newTreeData, dragItem)
        //   // 更新视图
        //   // this.setState({ Data: newTreeData })
        //   this.baseComponents = newTreeData
        //   return
        // }
        // // 添加拖拽元素
        // let newData = itemAdd(newPath, this.baseComponents, dragItem)
        // // 删除元素 获得新数据
        // newData = itemRemove(oldIndex, newData)

        // this.baseComponents = newData
        console.log(dragItem, oldIndex, newPath)
        return
      }

      // // 新增流程 创建元素 => 插入元素 => 更新视图
      // const id = nameOrIndex

      // const newItem = cloneDeep(componentList.find(item => item.name === id))

      // // 为容器或者弹框时增加子元素
      // if (newItem.name === 'grid') {
      //   // const ComponentsInfo = cloneDeep(GlobalComponent[newItem.name])
      //   // 判断是否包含默认数据
      //   newItem.children = []
      // }

      // let Data = itemAdd(newPath, this.baseComponents, newItem)

      // this.baseComponents = Data
      this.$nextTick(() => (this.currentItemPath = newPath))
      // this.currentItemPath = newPath
    },
    getJSON() {
      // console.log(JSON.stringify(this.baseComponents))
      const jsonData = JSON.stringify(this.baseComponents)
      this.$Modal({
        title: 'JSON',
        content: `<textarea>${jsonData}</textarea>`
      })
    },
    cloneCom(original) {
      const element = cloneDeep(original)
      // element.id = uniqueId('element_')
      if (element.name == 'grid') {
        element.children = []
      }
      const key = common.getKey(element.name)
      element['key'] = key
      // element['id'] = key.split('_')[key.split('_').length - 1]
      element['id'] = key
      // console.log(original, 'original', element)

      return element
    },
    deleteItem(index) {
      itemRemove(index, this.baseComponents)
      this.currentItem = null
    },
    handleItemClick(indexs, item, e) {
      e.stopPropagation()

      const that = this
      const action = e.target.dataset.action

      console.log(indexs, e, 'din', action)
      switch (action) {
        case 'del': {
          that.deleteItem(indexs)
          break
        }

        default: {
          // const currentItem = getItem(indexs, this.baseComponents)
          // console.log('default', currentItem)
          // this.currentItem = currentItem
          this.setCurrent(item)
          break
        }
      }
    },

    setCurrent(item) {
      const result = common.findUIDObj(item.id, this.baseComponents)
      const [arr, idx] = result || []

      if (arr) {
        // // arr.splice(idx, 1) // Remove object from its parent array
        this.currentItem = arr[idx]
      }
    }
  },
  computed: {
    uniqueID() {
      const uid = uniqueId()
      console.log(uid)
      return uid
    }
  },
  mounted() {
    console.log(GlobalComponent)
  },
  render() {
    // const sortableOption = {
    //   animation: 150,
    //   fallbackOnBody: true,
    //   swapThreshold: 0.65,
    //   group: {
    //     name: "formItem",
    //     pull: true,
    //     put: true
    //   }
    // };

    const side = (
      <draggable
        group={{ name: 'formItem', pull: 'clone', put: false }}
        sort={false}
        key={uniqueId()}
        list={this.componentList}
        clone={this.cloneCom}
      >
        {this.componentList.map((item, index) => {
          return <div key={index}>{item.name}</div>
        })}
      </draggable>
    )

    let currentItemConfig = <div>请先选择组件</div>

    if (this.currentItem) {
      const config =
        formConfigComponentsMap[
          common.getComponentName(this.currentItem.name) + '-config'
        ]
      console.log(
        formConfigComponentsMap,
        config,
        'config',
        common.getComponentName(this.currentItem.name) + '-config'
      )

      currentItemConfig = this.$createElement(config, {
        props: { item: this.currentItem }
      })
    }
    // 表单设置
    const config = <div id="component-config">{currentItemConfig}</div>

    const result = this.loop(this.baseComponents, '')
    return (
      <Layout>
        <Sider style="width: 450px">{side}</Sider>
        <Layout class="form-design-container">
          <Content>
            <Modal vModel={this.opened}>
              <div slot="header">Vue</div>
              <div>
                这是使用vue调用的弹出框
                <FormPreview formItems={this.baseComponents} formData={{}} />
              </div>
              <div slot="footer">
                <button class="h-btn" onClick={() => (this.opned = false)}>
                  取消
                </button>
              </div>
            </Modal>
            <div>
              <Button color="primary" onClick={this.getJSON}>
                获取数据
              </Button>
              <Button color="blue" onClick={this.showPreview}>
                预览
              </Button>
            </div>
            <Form labelWidth={100}>
              <draggable
                class="form-container"
                list={this.baseComponents}
                ref={c => c && (this.sortable = c.sortable)}
                group={{
                  name: 'formItem',
                  pull: true,
                  put: true
                }}
                // handle=".masking__drag"
                animation={150}
                nativeOnAdd={e => this.sortableAdd(e)}
                key={uniqueId()}
              >
                {result}
              </draggable>
            </Form>
          </Content>
          <Sider width="250px">{config}</Sider>
        </Layout>
      </Layout>
    )
  }
}
</script>

<style lang="scss" scoped>
.container-block {
  position: relative;
  // min-height: 30px;
  padding: 30px;
  margin: 10px;
  // border: 2px dashed #409eff;
  border: 2px dashed #ccc;
  overflow: hidden;
  cursor: move;
}
.form-container {
  min-height: 100px;
  border: 3px solid #eee;
  padding: 30px 20px;
  height: 100%;
}
// .container .active {
//   outline: 2px dotted blueviolet !important;
//   border: 1px dotted blueviolet !important;
// }
.container {
  // background: #eee;
  position: relative;
  // padding: 0;
  // margin: 20px 0;
  // margin: 10px 0;
  // border: 2px solid #f5f5f5 !important;
  // border: 1px dashed #409eff !important;
  // &:hover {
  //   outline: 1px dotted blueviolet !important;

  //   border: 1px dotted blueviolet !important;
  // }
}
.form-design-container {
  height: 80vh;
  .h-form {
    height: 100%;
  }
}
.container-actions {
  display: none;
  padding: 0 5px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 1;
  font-size: 12px;
  background-color: #409eff;
  height: 22px;
  line-height: 22px;
  flex-flow: row nowrap;
  justify-content: center;
  .delete {
    cursor: pointer;
    display: block;
    color: white;
    font-size: 12px;
  }
}

.form-design-container .h-main {
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
}
.component-container {
  clear: both;
  // min-height: 60px;
  // padding-bottom: 1px;
  margin: 10px;
  padding-top: 20px;
  // box-sizing: border-box;
  position: relative;
  cursor: move;
}
.container-current {
  border: 2px dashed #409eff;
}
.container-current + .container-actions {
  display: flex;
}
</style>
