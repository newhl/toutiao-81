<template>
  <div class="layout-aside">
      <div class="title">
          <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          首页
      </el-menu-item>
      <el-submenu index="content">
        <template slot="title">
        <i class="el-icon-menu"></i>
        <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发表文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
        <el-menu-item index="/home/comment">评论管理</el-menu-item>
      </el-submenu>
      <el-submenu index="fans">
          <!-- 具名插槽 -->
        <template slot="title">
        <i class='el-icon-user-solid' ></i>
        <span>粉丝管理</span>
        </template>
        <el-menu-item index='/home/fansdata'>图文数据</el-menu-item>
        <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
        <el-menu-item index='/home/fansimg'>粉丝画像</el-menu-item>
        <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
      </el-submenu>

      <el-menu-item index="/home/account">
        <i class="el-icon-setting"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .layout-aside{
        .title{
            text-align: center;
            padding: 15px 0;
            background-color: #2e2f32;
            img{
                width: 120px;
                height: 30px;
            }
        }
    }

</style>
