<template>
<!-- 用el-row和el-col布局 -->
  <el-row type="flex" justify="space-between" class="layout-header">
    <el-col :span="16" class="left-header">
        <i class="el-icon-s-unfold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="3" class="layout-right">
        <img :src="user.photo ? user.photo : defaultImg" alt="">
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">{{user.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="account">个人信息</el-dropdown-item>
        <el-dropdown-item command="git">git地址</el-dropdown-item>
        <el-dropdown-item command="out">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      user: {

      },
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      let userInfo = window.localStorage.getItem('user-info') // 获取用户在本地存的token令牌
      let token = userInfo ? JSON.parse(userInfo).token : null // 获取token
      token && this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` } // 将headers中赋值后端需要的 token
      }).then(result => {
        this.user = result.data.data // 获取到data中的数据 赋值给user
      })
    },
    handleCommand (command) {
      if (command === 'account') {
        //  账户信息
      } else if (command === 'git') {
        window.location.href = 'https://github.com/newhl/toutiao-81.git'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
  }

}
</script>

<style lang="less" scoped>
.layout-header{
    padding: 12px 0;
    .left-header{
        display: flex;
        align-items: center;
        i{
            font-size: 20px;
            margin-right: 4px;
        }
    }
    .layout-right{
        display: flex;
        align-items: center;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }

}

</style>
