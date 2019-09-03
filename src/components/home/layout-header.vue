<template>
    <el-row type="flex" justify="space-between" class='layout-header'>
        <el-col :span="6" class="left">
            <i class="el-icon-s-unfold icon"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="3" class="right">
            <img class='head-img' :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
            <el-dropdown trigger="click" @command="handleMenuItem">
                <span class="el-dropdown-link">
                    {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='account'>个人信息</el-dropdown-item>
                    <el-dropdown-item command='git'>git地址</el-dropdown-item>
                    <el-dropdown-item command='lgout'>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data.data
      })
    },
    handleMenuItem (command) {
      if (command === 'account') {
        // account回到个人信息
      } else if (command === 'git') {
        // 跳转到git
        window.location.href = 'https://github.com/'
      } else {
        // 退出
        window.localStorage.clear()// 清除token
        this.$router.push('/login')// 跳转到登录页
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.layout-header {
    padding: 8px 0;
    height: 60px;
    .left{
        display: flex;
        align-items: center;
        .icon{
            font-size:22px;
            margin-right:3px;
        }
    }
    .right{
      display: flex;
      align-items: center;
      .head-img {
        border-radius: 50%;
        margin-right:10px;
        width:40px;
        height:40px;
      }
    }
}

</style>
