<template>
  <el-card>
       <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form label-width="100px" :model="formData" :rules="rules" ref="userInfo" v-loading='loading'>
        <el-form-item label="用户名称" prop="name">
            <el-input v-model="formData.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="用户简介" prop="intro">
            <el-input v-model="formData.intro" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="formData.email" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="用户手机" prop="mobile">
            <el-input v-model="formData.mobile" style="width:300px" disabled></el-input>
        </el-form-item>
        <!-- 按钮 -->
         <el-form-item>
          <el-button type='primary' @click="saveUserInfo">保存信息</el-button>
        </el-form-item>
    </el-form>
    <el-upload action='' :show-file-list="false" :http-request='uploadImg'>
        <img class="head-img" :src="formData.photo ? formData.photo : imgUrl" alt="">
    </el-upload>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      imgUrl: require('../../assets/img/404.png'),
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, { min: 5, max: 10, message: '用户名需在5到10个字符' }],
        email: [{ required: true, message: '用户邮箱不能为空' }, { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }]
      }
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    saveUserInfo () {
      this.$refs.userInfo.validate(isOk => {
        if (isOk) {
          this.$axios({
            method: 'patch',
            url: '/user/profile',
            data: this.formData
          }).then(() => {
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
        this.loading = false
      })
    }
  },
  created () {
    this.getUserInfo()
  }

}
</script>

<style lang="less">
    .head-img{
        width: 200px;
        height: 200px;
        position: absolute;
        top: 150px;
        left: 700px;
        border-radius: 50%;
    }
</style>
