<template>
<!-- 主体容器 -->
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside style="width:200px; height:100vh;background-color:#323745;">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <!-- 头部内容 -->
    <el-header>
      <layout-header></layout-header>
    </el-header>
    <!-- 主体内容 -->
    <el-main style="padding:0 0;">
      <!-- 二级路由容器 -->
      <router-view></router-view>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>
