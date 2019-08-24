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
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item label="封面" >
        <el-radio-group v-model="radio">
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
        <el-button type="primary" @click="publish">发布</el-button>
        <el-button>存入草稿</el-button>
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
        cover: null
      },
      rules: {
        title: [{ required: true, message: '内容不能为空' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道内容不能为空' }]
      }
    }
  },
  methods: {
    publish () {
      this.$refs.myFrom.validate((isOk) => {
        if (isOk) {

        }
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
