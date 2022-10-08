<template>
  <el-upload
    class="upload-demo"
    :action="options.action"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :before-remove="beforeRemove"
    multiple
    :limit="item.config.limit"
    :on-exceed="handleExceed"
    :file-list="fileList"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">
      {{ item.config.tip }}
    </div>
  </el-upload>
</template>

<script>
import formMixin from '@/mixins/form-mixin'
import download from '@/utils/downloader'
export default {
  name: 'DoFileUpload',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mixins: [formMixin],
  data() {
    return {
      isUploadComponent: true,
      fileList: []
    }
  },
  created() {
    this.fileList = this.list
  },
  computed: {
    // 列表
    list() {
      // let temp = 1
      if (this.value) {
        // 首先将值转为数组
        const list = Array.isArray(this.value) ? this.value : [this.value]
        // 然后将数组转为对象数组
        return list.map(item => {
          if (typeof item === 'string') {
            item = { name: item, url: item }
          }
          // item.uid = item.uid || new Date().getTime() + temp++
          return item
        })
      } else {
        return []
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
      // this.newValue.push(response)
    },
    handlePreview(file) {
      if (file.key) {
        download(1, this.options.host + file.key, file.name)
      } else if (file.response && file.response.key) {
        download(1, this.options.host + file.response.key, file.name)
      }
    },
    handleSuccess(response) {
      const { blob } = response
      this.$emit('input', [
        ...this.list.map(item => {
          return { name: item.name, key: item.key }
        }),
        { name: blob.filename, key: blob.key }
      ])
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.item.config.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      const index = fileList.indexOf(file)
      return this.$confirm(`确定移除 ${file.name}？`).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        const data = [...this.list]
        data.splice(index, 1)
        this.$emit('input', data || [])
      })
    }
  },
  destroyed() {
    this.fileList = []
  }
}
</script>

<style scoped></style>
