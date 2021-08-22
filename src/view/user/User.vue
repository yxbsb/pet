<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/user' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.deviceId" placeholder="设备ID" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="filters.openid" placeholder="用户" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" :loading="loading" v-on:click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <Addpet :call="search" icon="el-icon-plus" type="primary" title="新增"/>
      <!--列表-->
      <el-table :data="dataList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="deviceId" label="设备ID"></el-table-column>
        <el-table-column prop="isBind" label="是否绑定"></el-table-column>
        <el-table-column prop="openid" label="绑定用户"></el-table-column>
        <el-table-column prop="petId" label="绑定宠物"></el-table-column>
        <el-table-column prop="bindTime" label="绑定时间"></el-table-column>
        <el-table-column prop="upDate" label="修改时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <Addpet :call="search" :data="scope.row" size="mini" title="编辑"/>
            <el-button type="danger" @click="del(scope.$index,scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination
          style="margin-top: 10px"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>

    </el-col>
  </el-row>
</template>

<script>
import Addpet from "../pet/AddPet";
import api from '../../api/api_pet';
export default {
  name: "user",
  data() {
    return {
      filters: {
        deviceId: '',
        openid: ''
      },
      dataList: [
      ],
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false,
    }
  },
  components: {
    Addpet,
  },
  methods: {
    handleSearch() {
      this.search();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.search();
    },
    selsChange(sels) {
      this.sels = sels;
    },
    search() {
      let that = this;
      let params = {
        pageNo: that.page,
        pageSize: that.pageSize,
        ...this.filters,
      };

      that.loading = true;
      api.listByPage(params, (result) => {
        if (result.code == '200') {
          that.loading = false;
          that.dataList = result.data;
          that.total = result.count;
          // if (result && result.page.list) {
          //   that.total = result.page.total;
          //   that.dataList = result.page.list;
          // }
          console.log(result)
        } else {
          that.loading = false;
          that.$message.error({
            showClose: true,
            message: result.msg,
            duration: 2000
          });
        }
      });
    },
    //删除
    del(index, row) {
      let that = this;
      this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
        console.log(row.id)
        that.loading = true;
        api.delete({id:row.id}, (result) => {
          that.loading = false;
          if (result && result.code == '200') {
            that.$message.success({showClose: true, message: '删除成功', duration: 1500});
            that.search();
          } else {
            that.$message. error({showClose: true, message: result.msg, duration: 2000});
          }
        });
      })
    },
  },
  mounted() {
    this.search()
  }
}
</script>

<style scoped>

</style>
