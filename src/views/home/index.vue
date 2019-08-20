<template>
<!-- 主体容器 -->
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside>
      <layout-asidee></layout-asidee>
    </el-aside>
    <el-container>
      <!-- 头部内容 -->
    <el-header>Header</el-header>
    <!-- 主体内容 -->
    <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {

  component: {
    'layout-aside': layoutAside
  }

}
</script>

<style>

</style>
