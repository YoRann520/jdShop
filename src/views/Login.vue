<template>
    <div class="login">
        <div v-show="loginShowPage">
            <Navbar :navBarInfo="navBarInfo"></Navbar>
            <van-cell-group class="form-group">
                <!-- 账号密码登陆 s -->
                <div v-show="aCountLogin">
                    <van-field
                        v-model="username"
                        type="text"
                        required
                        clearable
                        placeholder="用户名/邮箱/已验证手机"
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        placeholder="请输入密码"
                        required
                        class="form-password"
                        maxlength="16"
                    />
                    <button 
                        type="button"
                        class="form-forget-psd"
                    >忘记密码</button>
                </div>
                <!-- 账号密码登陆 e -->
                <!-- 短信登陆 s -->
                <div class="form-group-msg" v-show="shortMsgLogin">
                    <div class="form-input-tel-wrap">
                        <span @click="selectCountryIni()">+{{initialsNumber}}</span>
                        <van-field
                            v-model="tel"
                            type="tel"
                            required
                            clearable
                            placeholder="请输入手机号"
                            maxLength="11"
                        />
                        <button class="button">
                            <i 
                                v-if="sendAuthCode" 
                                @click="sendCode">
                                获取验证码
                            </i>
                	        <i v-else>({{time}})</i>
                        </button>
                    </div>
                    <van-field
                        v-model="vcode"
                        type="text"
                        placeholder="请输入收到的验证码"
                        required
                        class="form-get-vcode"
                        maxlength="16"
                    />
                </div>
                <!-- 短信登陆 e -->
                <!-- 短信登陆 s -->
                <section class="login-commit" v-show="shortMsgLogin">
                    <van-button 
                        type="warning"
                        v-if="telLen > 10"
                        @click="commits"
                    >登陆</van-button>
                    <van-button 
                        type="warning"
                        disabled
                        v-else
                    >登陆</van-button>
                </section>
                <!-- 短信登陆 e -->
                <!-- 账号登陆提交按钮 s -->
                <section class="login-commit" v-show="aCountLogin">
                    <van-button 
                        type="warning"
                        v-if="formUser > 6"
                        @click="commitsBtn"
                    >登陆</van-button>
                    <van-button 
                        type="warning"
                        disabled
                        v-else
                    >登陆</van-button>
                </section>
                <!-- 账号登陆提交按钮 e -->
                <div class="login-dir-wrap">
                    <van-button 
                        type="default"
                        class="login-dir"
                    >一键登陆</van-button>
                </div>
                <div class="form-login-reg">
                    <span 
                        v-show="shortMsgLoginBtn"
                        @click="toCountLogin"
                    >短信验证码登录</span>
                    <span 
                        v-show="aCountLoginBtn"
                        @click="toshortMsgLogin"
                    >账号密码登录</span>
                    <router-link 
                        to="/register"
                        tag="span"
                    >手机快速注册</router-link>
                </div>
            </van-cell-group>
            <section class="login-bottom">
                <h4>
                    <span>其他登录方式</span>
                </h4>
                <div class="login-form-qq">
                    <img src="@/assets/images/login/qq.jpg">
                    <p>QQ</p>
                </div>
                <p class="login-agreement-tips">
                登录即代表您已同意<router-link to="">京东隐私政策</router-link>
                </p>
            </section>
        </div>
        <PhoneNOStart 
            ref="showPhoneNOPage"
            @onClickLeft="showLoginPage"
            @getInitials = "getInitialsNumber"
        ></PhoneNOStart>
    </div>
</template>
<script>
/* eslint-disable */
import PhoneNOStart from '@/components/PhoneNOStart.vue'
import Navbar from '@/components/Navbar.vue'
import { inputSIVI } from '@/commonJs/index'
import { Toast } from 'vant';
export default {
    data () {
        return {
            navBarInfo: {
                topTitle: '京东登陆',
                bgColor: '#fff',
                borderColor: '0px solid #fff'
            },
            username: '',
            password: '',
            tel: '',
            vcode: '',
            time: 30,
			sendAuthCode: true,
            initialsNumber: '',
            loginShowPage: true,
            shortMsgLogin: true,
            aCountLogin: false, // 账号登陆
            shortMsgLoginBtn: false,
            aCountLoginBtn: true
        }
    },
    methods: {
        selectCountryIni () {
            this.loginShowPage = false
            this.$refs.showPhoneNOPage.showPage()
        },
        showLoginPage () {
            this.loginShowPage = true
        },
        getInitialsNumber (data) {
            this.loginShowPage = true
            this.initialsNumber = data
        },
        defaultCountryNO () {
            if (this.initialsNumber == '') this.initialsNumber = 86
        },
        // 发送验证码
        async sendCode () {
            if (this.tel == '') {
                Toast('请输入电话号码')
                return false
            } else {
                const result = await this.$http.get('/api/shortMsgLogin/vcode',{
                    params: {
                        tel: this.tel
                    }
                })
                console.log(result.data)
                // 倒计时
                this.sendAuthCode = false
                let auth_timetimer = setInterval(() => {
                this.time--
                if (this.time <= 0) {
                    this.sendAuthCode = true
                    clearInterval(auth_timetimer)
                    this.time = 30
                }
                }, 1000)
            }
        },
        async commits () {
            // 短信登陆
            if (this.tel && this.vcode) {
                const result = await this.$http.get('/api/shortMsgLogin',{
                    params: {
                        tel: this.tel,
                        vcode: this.vcode
                    }
                })
                if (result.data.code == 11) {
                    // 将token存储到vuex
                    this.$store.commit('setToken',result.data.token)
                    // 存储token存储到缓存
                    window.localStorage.setItem('token',result.data.token)
                    //Toast(`${result.data.msg}`)
                    if (this.$route.query.redireact) {
                        Toast.loading({
                            duration: 1000,
                            message: '已返回当前页'
                        })
                        this.$router.replace({
                            path: this.$route.query.redireact
                        })
                    } else {
                        Toast.loading({
                            duration: 1000,
                            message: `${result.data.msg}`
                        })
                        this.$router.replace({
                            path: '/'
                        })
                    }
                } else {
                    Toast(`${result.data.msg}`)
                }
            } else {
                if (this.vcode == '') {
                    Toast('验证码不能为空！')
                }
                
            }
        },
        async commitsBtn () {
            // 账号登陆
            const result = await this.$http.get('/api/aCountLogin',{
                params: {
                    username: this.username,
                    password: this.password
                }
            })
            if (result.data.code == 200) {
                this.$store.commit('setToken',result.data.token)
                window.localStorage.setItem('token',result.data.token)
                if (this.$route.query.redireact) {
                    Toast.loading({
                        duration: 1000,
                        message: '已返回当前页'
                    })
                    this.$router.replace({
                        path: this.$route.query.redireact
                    })
                    } else {
                        Toast.loading({
                            duration: 1000,
                            message: `${result.data.msg}`
                        })
                        this.$router.replace({
                            path: '/'
                    })
                }
            } else {
                Toast(`${result.data.msg}`)
            }
        },
        toshortMsgLogin () {
            this.aCountLogin = true
            this.shortMsgLogin = false
            this.shortMsgLoginBtn = true
            this.aCountLoginBtn = false
            console.log(`短信登陆`)
        },
        toCountLogin () {
            this.shortMsgLogin = true
            this.aCountLogin = false
            this.shortMsgLoginBtn = false
            this.aCountLoginBtn = true
            console.log(`账号登陆`)
        }
    },
    components: {
        Navbar,
        PhoneNOStart,
        inputSIVI,
        
    },
    mounted () {
        this.defaultCountryNO()
        try {
            inputSIVI()
        } catch (err) {
            console.log(err)
        }
    },
    computed: {
        formUser () {
            return this.username.length
        },
        telLen () {
            return this.tel.length
        }
    },
}
</script>
<style lang="less" scoped>
.form-group {
    margin-top: 20px;
    position: relative;
    .login-commit {
        margin: 25px 20px 10px;
    }
    /deep/.van-button--normal {
        width: 100%;
        background: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba);
        border-radius: 30px;
        letter-spacing: 2px;
        font-size: 13px;
    }
    .login-dir-wrap {
        margin: 0 20px 10px;
        .login-dir {
            background: #fff;
            border: 1px solid #ff2000;
            color: #f23030!important;
            font-size: 14px;
        }
    }
    .form-forget-psd {
        width: 80px;
        height: 18px;
        line-height: 18px;
        border: 0;
        border-radius: 0;
        overflow: hidden;
        font-size: 12px;
        color: #222;
        background-color: #fff;
        outline: none;
        position: absolute;
        top: 58px;
        right: 0;
        border-left: 1px solid #ccc;
    }
    .form-login-reg {
        margin: 15px 20px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color: #999;
    }
    // 验证码登陆
    .form-input-tel-wrap {
        display: flex;
        margin: 0 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #ebedf0;
        span {
            flex: 1;
            max-width: 50px;
            line-height: 44px;
            text-align: left;
            position: relative;
            font-size: 14px;
            color: #222;
            &::after {
                width: 26px;
                height: 10px;
                content: '';
                background: url('../assets/images/login/ar.png') no-repeat center / 12px 6px;
                position: absolute;
                top: 16px;
                right: -10px;
                z-index: 9;
            }
        }
        /deep/.van-cell {
            flex: 1;
            width: auto;
        }
        .van-cell:not(:last-child)::after {
            border: 0;
        }
        button {
            flex: 1;
            height: 38px;
            line-height: 38px;
            max-width: 90px;
            font-size: 12px;
            overflow: hidden;
            background-color: #fff;
            border-left: 1px solid #ddd;
            color: #848689;
        }
    }
    .form-get-vcode {
        width: auto;
        margin: 0 15px;
        padding-left: 0;
        padding-right: 0;
        border-bottom: 1px solid #ebedf0;
    }
}
/deep/.van-cell--required::before {
    content: '';
}
/deep/.van-cell {
    font-size: 13px;
}
/deep/[class*=van-hairline]::after {
    border: 0;
}
/deep/.van-cell:not(:last-child)::after {
    left: 0;
    margin: 0 18px;
}
.form-password {
    /deep/.van-field__control {
        width: 70%;
    }
    /deep/.van-cell__value {
        overflow: visible;
    }
    /deep/.van-field__body {
        position: relative;
        &::after {
            width: 100%;
            content: '';
            position: absolute;
            bottom: -12px;
            left: 0;
        }
    }
}
.login-bottom {
    margin: 60px 20px 10px;
    h4 {
        display: block;
        font-size: 8px;
        color: #ccc;
        font-weight: 100;
        text-align: center;
        position: relative;
        span {
            position: relative;
            z-index: 2;
            background-color: #fff;
            padding: 0 10px;
        }
        &::before {
            width: 100%;
            height: 1px;
            background-color: #efefef;
            content: '';
            position: absolute;
            top: 6px;
            left: 0;
        }
    }
    .login-form-qq {
        text-align: center;
        margin-top: 25px;
        img {
            width: 48px;
            height: 48px;
        }
        p {
            font-size: 8px;
            color: #999;
        }
    }
    .login-agreement-tips {
        font-size: 10px;
        text-align: center;
        color: #999;
        margin-top: 20px;
        a {
            color: #409eff;
        }
    }
}
</style>
