<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form label-width="80px" :model="formData" :rules="rules" ref="myFrom">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入内容" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor style='width:800px;height:400px;margin-bottom:100px' v-model="formData.content"  type="textarea" :rows="4" placeholder="请输入内容"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" >
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(fasle)">发布</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: 0,
      channels: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0,
          images: [] // 图片数组  随着type的变化而变化
        }
      },
      rules: {
        title: [{ required: true, message: '内容不能为空' }, { min: 5, max: 30, message: '字符需在5到30个之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道内容不能为空' }]
      }
    }
  },
  methods: {
    // 发布文章
    publish (draft) {
      this.$refs.myFrom.validate((isOk) => {
        if (isOk) {
          let { articleId } = this.$route.params
          let method = articleId ? 'put' : 'post'
          let url = articleId ? `/articles/${articleId}` : '/articles'
          this.$axios({
            method,
            url,
            params: { draft: draft },
            data: this.formData
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    },

    // 获取文章类型并显示在列表中
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },

    // 通过文章id获得文章信息
    getArticleById () {
      let { articleId } = this.$route.params
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    let { articleId } = this.$route.params
    if (articleId) {
      this.getArticleById()
    }

    this.getChannels()
  }
}
</script>

<style>
</style>
