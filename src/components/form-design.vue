<script lang="jsx">
import { baseComponent, containerComponent } from '@/components/components'
import draggable from 'vuedraggable'
import uniqueId from 'lodash.uniqueid'
import cloneDeep from 'lodash.clonedeep'
import common from '@/utils/common'

import { isPath, getCloneItem, itemRemove } from '@/utils/utils'
import FormPreview from './form-preview.vue'
import CusDialog from './cus-dialog.vue'
import FormConfig from '@/components/form-config/form/index.vue'

export default {
  name: 'FormDesign',
  props: {
    showJSON: { type: Boolean, default: true }
  },
  data() {
    return {
      baseComponents: [],
      // baseComponent: baseComponent,
      currentItem: null,
      currentItemPath: null,
      formData: {},
      visible: false,
      configActive: 'itemConfig',
      componenListActive: 'baseList',
      formConfig: { labelWidth: 100, labelPosition: 'right', size: 'small' }
    }
  },
  components: {
    CusDialog,
    FormConfig,
    draggable
  },
  methods: {
    selectContainer(item, e) {
      e.stopPropagation()
      console.log(e, item)
      // const item = getItem(indexs, this.baseComponents)
      // console.log(indexs, item)
      this.setCurrent(item)

      // this.currentItem = item
    },

    // 关闭预览
    closePreview() {
      this.visible = false
      this.$refs.previewForm.resetData()
      // this.formKey++
      // this.formData = {}
      // this.baseComponents.map(item => {
      //   this.$set(item, 'columns', [])

      // if (item.columns && item.columns.length > 0) {
      //   item.columns = []

      //   return item
      // } else {
      //   return item
      // }
      // })
      // console.log(this.baseComponents, 'base')
      // this.$refs.previewForm.resetForm()
    },

    resetPreview() {
      this.$refs.previewForm.resetForm()
    },

    getData() {
      this.$refs.previewForm.submit()
      // this.$refs.previewForm
      //   .getData()
      //   .then(res => {
      //     console.log(res)
      //     this.$msgbox({ message: res })
      //   })
      //   .catch(err => console.log(err, 'erro'))
    },
    showPreview() {
      this.visible = true
    },
    // 递归函数
    renderComponents(arr, index) {
      const that = this
      const directives = [{ name: 'masking' }]

      // const h = this.$createElement;

      const result = arr.map((item, i) => {
        const indexs = index === '' ? String(i) : `${index}-${i}`
        if (item.children) {
          const GridInfo = common.getComponent(item.type)
          return that.$createElement(
            GridInfo,
            { props: { item: item, dataID: indexs } },
            [
              <draggable
                key={uniqueId()}
                // class="container-block"
                class={
                  this.currentItem && item.key === this.currentItem.key
                    ? `container-block container-current ${item.type}`
                    : `container-block ${item.type}`
                }
                list={item.children}
                ref={c => c && (this.sortable = c.sortable)}
                group={{
                  name: 'formItem',
                  pull: true,
                  put: true
                }}
                data-id={indexs}
                // handle=".masking__drag"
                animation={150}
                move={this.sortItemMove}
                nativeOnClick={this.selectContainer.bind(this, item)}
              >
                {that.renderComponents(item.children, indexs)}
              </draggable>,
              <div class="container-actions">
                <div
                  class="delete"
                  onClick={that.deleteItem.bind(this, indexs)}
                >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
            ]
          )
        }
        if (item.columns) {
          const ChildForm = common.getComponent(item.type)
          const dragarea = (
            <draggable
              key={uniqueId()}
              // class="container-block"
              class={
                this.currentItem && item.key === this.currentItem.key
                  ? `container-block container-table container-current`
                  : `container-block container-table`
              }
              list={item.columns}
              ref={c => c && (this.sortable = c.sortable)}
              group={{
                name: 'formItem',
                pull: true,
                put: true
              }}
              data-id={indexs}
              // handle=".masking__drag"
              animation={150}
              move={this.sortItemMove}
              nativeOnClick={this.selectContainer.bind(this, item)}
            >
              {that.renderComponents(item.columns, indexs)}
            </draggable>
          )
          const actionItems = (
            <div class="container-actions">
              <div class="delete" onClick={that.deleteItem.bind(this, indexs)}>
                <i class="el-icon-delete"></i>
              </div>
            </div>
          )
          console.log(item.columns)
          return that.$createElement(
            ChildForm,
            {
              props: {
                item: item,
                items: []
              },
              on: {
                'add-item': value => {
                  console.log(value, 'add dd')
                  item.columns = value
                }
              }
            },
            [dragarea, actionItems]
          )
        }
        // const ComponentInfo =
        // GlobalComponent[common.getComponentName(item.name)]
        const ComponentInfo = common.getComponent(item.type)

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
            <ElFormItem
              label={item.config.label}
              required={item.config.required}
            >
              {that.$createElement(ComponentInfo, {
                // domProps: { ...item.attr },
                props: {
                  item: item,
                  value: item.config.default,
                  formData: this.formData
                }
              })}
            </ElFormItem>
          </div>
        )
      })
      return result
    },

    onAdd(e) {
      console.log(e, 'add')
    },
    sortableAdd(evt) {
      evt.stopPropagation()
      const nameOrIndex = evt.clone.getAttribute('data-id')

      // 父节点路径
      const parentPath = evt.path[1].getAttribute('data-id')
      console.log(evt, parentPath, nameOrIndex)
      return false
    },
    sortItemMove(evt) {
      const toIndexs = evt.to.getAttribute('data-id')
      const dragElmType = evt.draggedContext.element.type
      if (toIndexs && toIndexs.split('-').length > 0) {
        return dragElmType !== 'grid' && dragElmType !== 'form-table'
      }
      return true
    },
    sortableAdd1(evt) {
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
      const jsonData = JSON.stringify({
        list: this.baseComponents,
        config: this.formConfig
      })
      this.$msgbox({
        title: 'JSON',
        message: this.$createElement('ElInput', {
          attrs: {
            type: 'textarea',
            row: 10,
            value: jsonData
          }
        })
      })
    },
    cloneCom(original) {
      const element = cloneDeep(original)
      const key = common.getKey(element.type)
      // element.id = uniqueId('element_')
      if (element.type == 'grid') {
        element.children = []
      }
      element['key'] = key

      element['id'] = key

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
        console.log(result, 'result')

        // // arr.splice(idx, 1) // Remove object from its parent array
        this.currentItem = arr[idx]
      }
      this.configActive = 'itemConfig'
    }
  },
  computed: {},
  render() {
    const side = (
      <el-tabs vModel={this.componenListActive}>
        <el-tab-pane label="表单控件" name="baseList">
          <draggable
            group={{ name: 'formItem', pull: 'clone', put: false }}
            sort={false}
            key={uniqueId()}
            list={baseComponent}
            clone={this.cloneCom}
            class="component-list"
            move={this.sortItemMove}
          >
            {baseComponent.map((item, index) => {
              return (
                <div class="component-item" key={index}>
                  <ElTag type="primary">{item.name}</ElTag>
                </div>
              )
            })}
          </draggable>
        </el-tab-pane>
        <el-tab-pane label="布局控件" name="containerList">
          <draggable
            group={{ name: 'formItem', pull: 'clone', put: false }}
            sort={false}
            key={uniqueId()}
            list={containerComponent}
            clone={this.cloneCom}
            class="component-list"
            move={this.sortItemMove}
          >
            {containerComponent.map((item, index) => {
              return (
                <div class="component-item" key={index}>
                  <ElTag type="primary">{item.name}</ElTag>
                </div>
              )
            })}
          </draggable>
        </el-tab-pane>
      </el-tabs>
    )

    const previewDialog = (
      <cus-dialog
        visible={this.visible}
        onClose={this.closePreview}
        ref="widgetPreview"
        width="1000px"
        form
      >
        <FormPreview
          ref="previewForm"
          formConfig={{
            list: this.baseComponents,
            config: this.formConfig
          }}
          formData={this.formData}
        />
        <template slot="action">
          <el-button type="primary" onClick={this.getData}>
            获取数据
          </el-button>
          <el-button onClick={this.resetPreview}>重置</el-button>
        </template>
      </cus-dialog>
    )

    let currentItemConfig = (
      <ElAlert
        title="请先选择组件"
        type="info"
        showIcon
        closable={false}
      ></ElAlert>
    )

    if (this.currentItem) {
      const config = common.getComponentConfig(this.currentItem.type)
      // console.log(config, this.currentItem.type)
      currentItemConfig = this.$createElement(config, {
        props: { item: this.currentItem }
      })
    }
    // 表单项设置
    const config = <div id="component-config">{currentItemConfig}</div>

    const formConfig = (
      <div id="form-config">
        <FormConfig config={this.formConfig} />
      </div>
    )

    const result = this.renderComponents(this.baseComponents, '')

    return (
      <ElContainer>
        <ElAside style="width: 250px">{side}</ElAside>
        <ElMain class="form-design-container">
          <ElCard class="box-card">
            <div slot="header" class="clearfix">
              {this.showJSON && (
                <ElButton type="primary" size="small" onClick={this.getJSON}>
                  获取数据
                </ElButton>
              )}
              <ElButton type="success" size="small" onClick={this.showPreview}>
                预览
              </ElButton>
            </div>
            <div class="el-card__body2">
              {previewDialog}

              <ElForm
                labelWidth={this.formConfig.labelWidth + 'px'}
                labelPosition={this.formConfig.labelPosition}
                size={this.formConfig.size}
              >
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
                  move={this.sortItemMove}
                  key={uniqueId()}
                >
                  {result}
                </draggable>
              </ElForm>
            </div>
          </ElCard>
        </ElMain>
        <ElAside width="250px">
          <ElTabs vModel={this.configActive}>
            <ElTabPane label="控件设置" name="itemConfig">
              {config}
            </ElTabPane>
            <ElTabPane label="表单属性" name="formConfig">
              {formConfig}
            </ElTabPane>
          </ElTabs>
        </ElAside>
      </ElContainer>
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
.container-table,
.form-table {
  display: flex;
  overflow: scroll;
}
.form-container {
  min-height: 400px;
  // border: 3px solid #eee;
  // padding: 30px 20px;
  height: 100%;
  overflow: hidden;
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
  height: 96vh;
  padding: 0 10px;
  box-sizing: border-box;
  //.el-form {
  //  height: 100%;
  //}
  // .box-card {
  //   box-sizing: border-box;
  //  height: 100%;
  // }
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
.component-container {
  clear: both;
  margin: 10px;
  padding: 15px;
  padding-bottom: 1px;
  position: relative;
  cursor: move;
}
.container-current {
  border: 2px dashed #409eff;
}
.container-current + .container-actions {
  display: flex;
}

.component-list {
  display: flex;
  flex-wrap: wrap;
}
.component-item {
  padding: 10px;
  padding-left: 0;
  cursor: pointer;
}
</style>
