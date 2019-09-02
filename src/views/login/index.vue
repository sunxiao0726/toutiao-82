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
    // elementui自定义校验函数 validator
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
      // 定义 rules 校验规则 表单是根据规则去校验 没有规则 就没有校验
      // key(字段名):value(数组对象=> 多个 => 一个字段 可能有一个或者多个校验规则)
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
      // 通过el-form组件的validata方法 校验整个表单的数据
      // 传入一个回调函数 isOK为true 说明所有的校验规则都成功了
      // 如果为false 说明有错误
      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(res => {
            // 将token保存在前端（本地存储）
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/')
          }).catch(() => {
            this.$message({
              // messages是elementui中提示信息的方法
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
