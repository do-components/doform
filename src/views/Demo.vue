<template>
  <div>
    <el-form
      label-position="right"
      status-icon
      :rules="rules"
      :model="ruleForm"
      ref="ruleForm"
    >
      <el-table :data="ruleForm.evidenceTemplateList">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="70"
        ></el-table-column>
        <el-table-column
          label="证据名称"
          align="center"
          style="margin-left: 0px !important;"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'evidenceTemplateList.' + scope.$index + '.name'"
              :rules="rules.name"
            >
              <el-input
                v-if="scope.$index < ruleForm.evidenceTemplateList.length - 1"
                v-model="scope.row.name"
                :maxlength="50"
              ></el-input>
              <el-input
                v-if="scope.$index == ruleForm.evidenceTemplateList.length - 1"
                v-model="scope.row.name"
                :maxlength="50"
                @change="evidChangeLast(scope.row.name)"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.$index < ruleForm.evidenceTemplateList.length - 1"
              type="danger"
              size="mini"
              @click="delEvid(scope.row, scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="saveData()">保存</el-button>
      <el-button size="mini" @click="closeDialog()">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      evidenceTemplateGroup: {
        id: '',
        name: '',
        nickname: '',
        userId: '',
        evidenceTemplateList: []
      },
      ruleForm: {},
      evidenceTemp: {
        id: '',
        name: '',
        remarks: ''
      },
      evidenceTemplateDeleteList: '',
      rules: {
        name: [
          { required: true, message: '证据模板名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.ruleForm.evidenceTemplateList = [
        { id: 1, name: 'xiao', nickname: 'deng' }
      ]
    },
    saveData() {
      //删除最后一行
      let index = this.ruleForm.evidenceTemplateList.length - 1
      this.ruleForm.evidenceTemplateList.splice(index, 1)
      this.$nextTick(() => {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            this.loading = true
            //根据状态dialogStatus判断是新增还是更新
            if (this.dialogStatus == 'create') {
              this.createTemp()
            } else {
              this.updateTemp()
            }
          } else {
            this.ruleForm.evidenceTemplateList.push(
              JSON.parse(JSON.stringify(this.evidenceTemp))
            )
            return false
          }
        })
      })
    }
  }
}
</script>
