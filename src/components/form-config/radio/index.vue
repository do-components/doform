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
        <el-radio-group v-model="item.config.default">
          <draggable
            tag="ul"
            class="options-list"
            :list="item.options"
            :group="{ name: 'options-list', pull: false, put: false }"
            handle=".drag-item"
          >
            <li v-for="(option, index) in item.options" :key="index">
              <el-radio :label="option.value">
                <el-input
                  size="mini"
                  v-model="option.label"
                  @input="labelUpdate(option)"
                ></el-input>
              </el-radio>
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
        </el-radio-group>
        <div><el-button type="text" @click="addOption">添加项</el-button></div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'DoRadioConfig',
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
      options: this.item.options
    }
  },
  methods: {
    removeOption(index) {
      const value = this.item.options[index].value
      if (this.item.config.default === value) {
        this.item.config.default = ''
      }
      this.item.options.splice(index, 1)
    },
    addOption() {
      const newIndex = this.item.options.length + 1
      this.item.options.push({
        label: '选项' + newIndex,
        value: '选项' + newIndex
      })
    },
    labelUpdate(option) {
      option.value = option.label
      this.item.config.default = option.value
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
