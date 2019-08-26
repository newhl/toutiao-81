<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="素材库" name="material">
        <div class="material-list">
          <el-card class="material-item" v-for="item in list" :key="item.id">
            <img @click="selectOneImg(item)" :src="item.url " alt />
          </el-card>
        </div>

        <el-row type="flex" justify="center" style="margin:10px 0">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <!-- 上传 -->
      <el-tab-pane label="上传" name="upload">配置管理</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [], // 要循环的素材数据
      page: {
        pageSize: 8,
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {
    selectOneImg (item) {
      this.$emit('selectOneImg', item.url)
      // alert(item.url )
    },

    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },

    getMaterial () {
      let pageParams = { page: this.page.currentPage, per_page: this.page.pageSize }
      this.$axios({
        url: '/user/images',
        params: { collect: false, ...pageParams }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.material-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .material-item {
    margin: 5px 0;
    width: 150px;
    height: 150px;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
