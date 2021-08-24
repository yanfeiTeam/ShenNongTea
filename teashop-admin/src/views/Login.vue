<template>
    <div class="login">
        <div class="box">
            <h3>神农茶票-后台管理</h3>
            <el-form ref="loginRef" :model="loginParams" :rules="loginRules">
                <el-form-item prop="username">
                    <el-input v-model="loginParams.username" @keyup.enter.native="login" size="small" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginParams.password" @keyup.enter.native="login" size="small" placeholder="密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="login" style="width: 100%">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    // import Cookies from 'js-cookie'

    export default {
        name: 'login',
        data() {
            return {
                loginParams: {
                    username: '',
                    password: '',
                },
                loginRules: {
                    username: [
                        {
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur',
                        },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {
            login() {
                this.$refs.loginRef.validate(async (valid) => {
                    if (valid) {
                        let params = Object.assign({}, this.loginParams)
                        // const { err, data } = await loginApi.login(params)
                        // if (err) {
                        //     return false
                        // }
                        // Cookies.set('token', data)
                        this.$router.push({ path: '/' })
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .login .box {
        width: 300px;
        padding: 40px 10px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
    }
        
</style>