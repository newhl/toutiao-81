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
          <el-option
            v-for="item in channles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
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
          <img src="../../assets/img/404.png" alt="" />
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag style="width:60px" :type="item.status | statusType">{{ item.status | statusText }}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span>
            <i class="el-icon-edit"></i>
            修改
          </span>
          <span>
            <i class="el-icon-delete"></i>
            删除
          </span>
        </div>
      </div>
    </div>

    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
        total: 0
      }
    }
  },
  methods: {
    //  刷新列表数据 状态改变 频道切换 时间改变
    refreshList () {
      let { status, channel_id: cid, dateRange } = this.formData // 解构赋值
      let params = {
        status: this.formData.status === 5 ? null : status, // 默认给了5 但是5不能传
        channel_id: cid,
        begin_pubdate: dateRange && dateRange.length ? dateRange[0] : null,
        end_pubdate: dateRange && dateRange.length > 1 ? dateRange[1] : null
      }
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
  //
  filters: {
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
    this.getArticles()
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
