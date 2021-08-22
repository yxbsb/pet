<template>
  <span>
    <el-button :type="type" :size="size" :icon="icon" @click="showAddDialog">{{ title }}</el-button>
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--新增界面-->
      <el-dialog :title="title" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="data" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="宠物ID" prop="petId">
            <el-input v-model="data.petId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="宠物主人" prop="openid" >
            <el-input v-model="data.openid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="宠物名" prop="petName">
            <el-input v-model="data.petName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="宠物类型" prop="petType">
            <el-input v-model="data.petType" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="宠物品种" prop="petBreed">
            <el-input v-model="data.petBreed" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="宠物性别" prop="petSex">
            <el-input v-model="data.petSex" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否绑定" prop="isBind">
            <el-input v-model="data.isBind" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" :loading="loading" @click.native="addSubmit">提交</el-button>
        </div>
      </el-dialog>
    </el-col>
  </span>
</template>
<script>
import api from '../../api/api_pet';

export default {
  name: "AddPet",
  //属性，父组件传参
  props: {
    //按钮图标
    icon: {
      type: String,
      default: ''
    },
    //按钮类型
    type: {
      type: String,
      default: ''
    },
    //按钮大小
    size: {
      type: String,
      default: ''
    },
    //编辑的参数
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    //执行成功回调
    call: {
      type: Function,
      default: function () {
      }
    },
    //按钮、表单标题
    title: {
      type: String,
      default: '新增'
    }
  },
  data() {
    return {
      loading: false,
      //新增相关数据
      addFormVisible: false,//新增界面是否显示
      addFormRules: {
        deviceId: [
          {required: true, message: '请输入设备ID', trigger: 'blur'}
        ],
        isBind: [
          {required: true, message: '请输入是否是否绑定', trigger: 'blur'}
        ],
      },

    }
  },
  methods: {
    showAddDialog: function () {
      this.addFormVisible = true;
    },
    //新增
    addSubmit: function () {
      let that = this;
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          that.loading = true;
          let params = Object.assign({}, this.data);
          console.log(params.toString())
          if (params.id) {
            // 编辑
            api.update(params, (result) => {
              that.loading = false;
              if (result && result.code == '200') {
                that.$message.success({showClose: true, message: '修改成功', duration: 2000});
                that.$refs['addForm'].resetFields();
                that.addFormVisible = false;
                that.call();
              } else {
                that.$message. error({showClose: true, message: result.msg, duration: 2000});
              }
            });
          } else {
            //新增
            api.insert(params, (result) => {
              that.loading = false;
              if (result && result.code == '200') {
                that.$message.success({showClose: true, message: '新增成功', duration: 2000});
                that.$refs['addForm'].resetFields();
                that.addFormVisible = false;
                that.call();
              } else {
                that.$message.error({showClose: true, message: result.msg, duration: 2000});
              }
            });
          }
        }
      });
    },
  },
  mounted() {
  }
}
</script>

