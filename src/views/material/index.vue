<template>
  <el-card>
  <bread-crumb slot="header">
    <template slot="title">素材管理</template>
  </bread-crumb>
  <el-tabs v-model="activeName" @tab-click="changeTab">
    <el-tab-pane label="全部图片" name="all">
      <div class="img-list">
        <el-card v-for="item in list" :key="item.id" class="img-card">
          <img :src="item.url" alt="">
          <el-row type="flex" justify="space-around" class="operate" align="middle">
          <i class="el-icon-star-on"></i>
          <i class="el-icon-delete-solid"></i>
          </el-row>
        </el-card>
      </div>
    </el-tab-pane>
    <el-tab-pane label="收藏图片" name="collect"><div class="img-list">
        <el-card v-for="item in list" :key="item.id" class="img-card">
          <img :src="item.url" alt="">
        </el-card>
      </div></el-tab-pane>
  </el-tabs>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []

    }
  },
  methods: {
    changeTab () {
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
      }).then(result => {
        this.list = result.data.results
      })
    }

  },
  created () {
    this.getMaterial()
  }

}
</script>

<style lang='less' scoped>
    .img-list{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .img-card{
        width: 200px;
        height: 200px;
        margin: 20px 10px;
        position: relative;
        img{
          width: 100%;
          height: 120px;
        }
        .operate{
          position: absolute;
          bottom: 20px;
          left: 0;
          width: 100%;
          i{
            font-size: 20px;
          }
        }
      }

    }
</style>
