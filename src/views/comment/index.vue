<template>
    <el-card>
        <!-- el-card 的插槽 -->
        <bread-crumb slot="header">
        <template slot="title">评论列表</template>
        </bread-crumb>
        <!-- 表格 -->
        <el-table :data="list">
            <el-table-column label="标题" width="500" prop="title"></el-table-column>
            <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
            <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
            <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="obj">
                <el-button type="text">修改</el-button>
                <el-button :style="{color:obj.row.comment_status ? '#409EFF' : '#E6A23C'}" type="text" @click="closeOrOpen(obj.row)">{{obj.row.comment_status ? '关闭评论':'打开评论'}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    //  打开或者关闭
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论吗`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(result => {
          this.getComments()
        })
      })
    },

    //   query参数相当于get参数 存在get链接上
    //    post  指的是 body参数
    getComments () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        this.list = result.data.results
        console.log(result.data.results)
      })
    },
    // row 当条数据对象
    // column 当前列的属性
    // cellValue当前单元格属性值
    // index索引
    // formatter需要返回结果 需要根据当前值 进行返回
    // 类似过滤器
    // formatter 是elementUI提供的
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>

</style>
