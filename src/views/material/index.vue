<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 放置一个上传组件 -->
    <el-upload :show-file-list="false" action='' :http-request='uploadImg' class='upload-material'>
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <!-- 图片展示 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
            <el-row type="flex" justify="space-around" class="operate" align="middle">
              <!-- 收藏图片 -->
              <i
                :style="{color: item.is_collected ? 'red' : ''}"
                @click="collectOrCancel(item)"
                class="el-icon-star-on"
              ></i>
              <!-- 删除图片 -->
              <i class="el-icon-delete-solid" @click="delMaterial(item)"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <el-row type="flex" justify="center">
      <el-pagination
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
        background
        layout="prev, pager, next"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 15
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      let formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: formData
      }).then(result => {
        this.getMaterial() // 重新获取数据
      })
    },

    // 收藏图片素材
    collectOrCancel (item) {
      let mess = item.is_collected ? '取消收藏' : '收藏'
      this.$confirm(`您是否要${mess}此图片呢`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: `/user/images/${item.id}`,
          data: { collect: !item.is_collected } // 去相反状态
        }).then(result => {
          this.getMaterial()
        })
      })
    },
    // 删除图片素材
    delMaterial (item) {
      this.$confirm('您确定要删除此图片吗', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `user/images/${item.id}`
        }).then(result => {
          this.getMaterial()
        })
      })
    },

    // 切换页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 切换标签
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    // 获取图片素材
    getMaterial () {
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', ...pageParams }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  // 调用
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.upload-material{
  position: absolute;
  right: 20px;
  margin-top: -10px;
}
.img-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 200px;
    margin: 20px 10px;
    position: relative;
    img {
      width: 100%;
      height: 120px;
    }
    .operate {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
