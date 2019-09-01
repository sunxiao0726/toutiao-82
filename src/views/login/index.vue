<template>
    <div class="login">
        <el-card class="login-car">
            <div class="logo">
                <img src="../../assets/img/logo_index.png" alt="">
            </div>
            <el-form style='margin-top:20px' :model="loginForm" :rules="loginRules" ref="loginForm">

                <el-form-item prop="mobile">
                    <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input style="width:250px" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
                     <el-button style="float:right">发送验证码</el-button>
                </el-form-item>
                <el-form-item prop="check">
                    <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login(loginForm)" type="primary" style='width:100%'>登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('您必须无条件被坑'))
      }
    }

    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false// 是不是同意条款
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '手机长度必须为11个字符', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '密码长度必须为6个数字', trigger: 'blur' }
        ],
        check: [
          { validator }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(res => {
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/')
          }).catch(() => {
            this.$message({
              message: '手机号或者验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>
.login {
    background-image : url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-car{
        width: 450px;
        height: 350px;
        .logo {
            text-align: center;
            img {
                height: 40px;
            }
        }
    }
}

</style>
