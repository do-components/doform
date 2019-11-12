<template>
  <div class="config-form">
    <el-form :model="item.config" size="small" label-position="top">
      <el-form-item label="组件Key" v-if="item.key">
        <el-input type="text" v-model="item.key" disabled />
      </el-form-item>

      <el-form-item label="文本标题" prop="title">
        <el-input
          type="text"
          v-model="item.config.label"
          placeholder="请输入标题"
        />
      </el-form-item>

      <el-form-item prop="required">
        <el-checkbox v-model="item.config.required">必填</el-checkbox>
      </el-form-item>

      <el-form-item label="选项" prop="options">
        <el-checkbox-group v-model="item.config.default">
          <draggable
            tag="ul"
            class="options-list"
            :list="item.options"
            :group="{ name: 'options-list', pull: false, put: false }"
            handle=".drag-item"
          >
            <li v-for="(option, index) in item.options" :key="index">
              <el-checkbox :label="option.value">
                <el-input
                  size="mini"
                  v-model="option.label"
                  @input="labelUpdate(option)"
                ></el-input>
              </el-checkbox>
              <i class="el-icon-s-fold drag-item" />
              <el-button
                class="el-icon-minus"
                size="mini"
                type="danger"
                plain
                circle
                @click="removeOption(index)"
                style="padding: 4px;"
              ></el-button>
            </li>
          </draggable>
        </el-checkbox-group>
        <div><el-button type="text" @click="addOption">添加项</el-button></div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'DoCheckboxConfig',
  components: {
    draggable
  },
  props: {
    item: {
      tppe: Object,
      required: true
    }
  },
  data() {
    return {
      newValue: []
    }
  },
  methods: {
    // 移除选项
    removeOption(index) {
      const value = this.item.options[index].value
      if (this.item.config.default.includes(value)) {
        this.item.config.default = this.item.config.default.filter(elm => {
          return elm !== value
        })
      }
      this.item.options.splice(index, 1)
    },

    // 添加选项
    addOption() {
      const newIndex = this.item.options.length + 1
      this.item.options.push({
        label: '选项' + newIndex,
        value: '选项' + newIndex
      })
    },

    // 同步更新value, 此处为了简单处理直接把默认值清空
    labelUpdate(option) {
      option.value = option.label
      this.item.config.default = []
    }
  },
  computed: {}
}
</script>
<style lang="scss" scoped>
.options-list {
  padding: 0;
  margin: 0;
  li {
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    .drag-item {
      font-size: 18px;
      cursor: move;
      margin-right: 5px;
    }
  }
}
</style>
