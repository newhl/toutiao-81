<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form>
      <!-- 文章状态 -->
      <el-form-item label="文章状态">
        <el-radio-group v-model="formData.status" @change="refreshList">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核成功</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 频道列表 -->
      <el-form-item label="频道列表">
        <el-select placeholder="请选择" v-model="formData.channel_id" @change="refreshList">
          <el-option v-for="item in channles" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 活动日期 -->
      <el-form-item label="时间选择">
        <el-date-picker
          @change="refreshList"
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          range-separator="|"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total-title">共找到{{page.total}}条数据</div>
    <!-- 内容列表 -->
    <div class="content-list">
      <div class="content-item" v-for="(item,index) in list" :key="index">
        <!-- 左侧内容 -->
        <div class="left">
          <img :src="item.cover.images[0]" alt />
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag
              style="width:60px"
              :type="item.status | statusType"
            >{{ item.status | statusText }}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span style='cursor:pointer'>
            <i class="el-icon-edit"></i>
            修改
          </span>
          <span style='cursor:pointer' @click="delItem(item)">
            <i class="el-icon-delete"></i>
            删除
          </span>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
        :current-page="page.currentPage"
        :page-sizes="page.pageSize"
        background
        layout="prev, pager, next"
        :total="page.total"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 搜索栏的数据
      formData: {
        status: 5, // 默认是全部
        channel_id: null, // 定义频道id
        dateRange: null
      },
      //   频道数据
      channles: [],
      list: [], // 内容列表
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {

    delItem (item) {
      this.$confirm('您确定要删除此条记录吗', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${item.id.toString()}`
        }).then(result => {
          this.getArticles(this.getConditions())
        })
      })
    },

    //   获取 A + B + C 的条件
    getConditions () {
      let { status, channel_id: cid, dateRange } = this.formData // 解构赋值
      let params = {
        status: this.formData.status === 5 ? null : status, // 默认给了5 但是5不能传
        channel_id: cid,
        begin_pubdate: dateRange && dateRange.length ? dateRange[0] : null,
        end_pubdate: dateRange && dateRange.length > 1 ? dateRange[1] : null
      }
      params.page = this.page.currentPage
      params.per_page = this.page.pageSize

      return params
    },

    //   页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage // 获取当前的最先页码
      let conditions = this.getConditions() // 获取其他条件
      this.getArticles(conditions)
    },

    //  刷新列表数据 状态改变 频道切换 时间改变
    refreshList () {
    //  当筛选条件改变时 应该将页码回归到 第一页
      this.page.currentPage = 1
      let params = this.getConditions()
      this.getArticles(params)
    },

    // 获取文章
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params: { ...params }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count //
      })
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channles = result.data.channels
      })
    }
  },
  // 过滤器
  filters: {
    //   过滤文章类型
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    // 过滤tab标签的类型
    statusType (value) {
      switch (value) {
        case 0:
          return 'waring'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },
  created () {
    let pageParams = { page: 1, per_page: 10 }
    this.getArticles(pageParams)
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.total-title {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px dashed #ccc;
}
.content-list {
  .content-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #f2f3f5;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 150px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        margin-left: 10px;
        height: 100px;
        padding: 5px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .date {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .right {
      span,
      span i {
        font-size: 12px;
        color: #333;
      }
      span {
        margin-right: 5px;
      }
    }
  }
}
</style>
