<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
        <!-- 表单结构 -->
          <el-form :model="formData" :rules="rules" ref="loginForm">
              <!-- el-from-item的prop属性绑定需要校验的字段 -->
              <el-form-item prop="mobile">
                  <el-input  v-model="formData.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input  v-model="formData.code" placeholder="验证码" style="width:65%"></el-input>
                  <el-button type="primary" style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="check">
                  <el-checkbox v-model="formData.check">我已阅读用户协议</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button @click="login" style="width:100%" type="warning" round>登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  // 定义表单数据对象
  data () {
    var func = function (rule, value, callbcak) {
      if (value) {
        // 满足校验
        callbcak()
      } else {
        callbcak(new Error('错误信息'))
      }
    }
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码长度必须为6个数字', trigger: 'blur' }
        ],
        check: [
          { message: '验证码不能为空', validator: func }
        ]
      }
    }
  },
  methods: {
    login () {
      // 手动校验表单的数据
      // 是否通过了当前的校验结果
      // result当前的校验结果
      this.$refs.loginForm.validate(isOK => {
        if (isOK) {
          console.log('成功')
        }
      })
    }
  }

}
</script>

<style lang="less" sccoped>
    .login{
        width: 100%;
        height: 100vh;
        background-image: url(../../assets/img/login_bg.jpg);
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-card{
            width: 420px;
            height: 360px;
            .title{
                text-align: center;
                margin-bottom: 30px;
                img{
                    width: 200px;
                    height: 45px;
                }
            }
        }
    }
</style>
