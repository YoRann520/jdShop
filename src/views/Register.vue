<template>
    <div class="reg-wrap">
        <div v-show="regTelNo">
            <Navbar :navBarInfo="navBarInfo"></Navbar>
            <div class="reg-tel-wrap">
                <span 
                    class="reg-num-start"
                    @click="selectCountryNO"
                >+{{initialsNumber}}</span>
                <van-cell-group class="reg-telephone">
                    <van-field 
                        type="tel"
                        v-model="tel"
                        placeholder="请输入手机号"
                        error-message
                        maxLength="11"
                        pattern="^1[3|4|5|8][0-9]\d{4,8}$"
                    />
                </van-cell-group>
            </div>
        </div>
        <PhoneNOStart 
            ref="showSelectCountry" 
            @onClickLeft="regPageShow"
            @getInitials = "getInitialsNumber"
            >
        </PhoneNOStart>
        <section class="reg-shadow" @touchmove.prevent v-show="agreeEnter">
            <div></div>
            <div class="reg-shadow-bottom">
                <h3 class="reg-tips">注册协议及隐私政策</h3>
                <div class="reg-text-info" ref="bscroll">
                    <div v-html="greementContent" class="reg-agreement-content"></div>
                </div>
                <div class="reg-show-btn-wrap">
                    <p class="reg-show-read">
                        点击同意即表示您已阅读并同意<router-link to="">《京东用户注册协议》</router-link><router-link to="">《京东隐私政策》</router-link>并将您的订单信息共享给为完成此订单所必须的第三方合作方。关于<router-link to="">《订单共享与安全》</router-link>
                    </p>
                    <p class="reg-show-btn">
                        <van-button type="default" @click="disagree">不同意</van-button>
                        <van-button type="default" @click="agree">同意</van-button>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import PhoneNOStart from '../components/PhoneNOStart.vue'
import Navbar from '../components/Navbar.vue'
import BScroll from "better-scroll"
/* eslint-disable */
export default {
    data () {
        return {
            regInfoSee: {},
            tel: '',
            navBarInfo: {
                topTitle: '京东注册',
                bgColor: '#f9f9f9',
                borderColor: '1px solid #bbb'
            },
            initialsNumber: '',
            greementContent: `
                <p>在您注册成为京东用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，</p>请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：</p>
                <br/>
                <p><a href="">《京东用户注册协议》</a></p>
                <p><a href="">《京东隐私政策》</a></p>
                <p><a href="">《订单共享与安全》</a></p><br/>
                <p><strong><u>【请您注意】如果您不同意上述协议或其中任何条款约定，请您停止注册。您停止注册后将仅可以浏览我们的商品信息但无法享受我们的产品或服务。如您按照注册流程提示填写信息、阅读并点击同意上述协议且完成全部注册流程后，即表示您已充分阅读、理解并接受协议的全部内容；并表明您也同意京东可以依据以上的隐私政策内容来处理您的个人信息。</u></strong></p>
            `,
            agreeEnter: true,
            regTelNo: true
        }
    },
    methods: {
        regTextInfoHeight () {
            let _outBoxHeight = document.querySelector('.reg-shadow-bottom').offsetHeight,
                _tipsHeight = document.querySelector('.reg-tips').offsetHeight,
                _agreeHeight = document.querySelector('.reg-show-btn-wrap').offsetHeight,
                regTextInfo = document.querySelector('.reg-text-info');
                //regTextInfo.style.height = _outBoxHeight-(_tipsHeight+_agreeHeight) - 48 +'px'
                regTextInfo.style.height = _outBoxHeight-(_tipsHeight+_agreeHeight) +'px'
            
            /*
            console.log(`最外面盒子的高度：${_outBoxHeight}`)
            console.log(`h3的高度：${_tipsHeight}`)
            console.log(`最下面的高度：${_agreeHeight}`)
            */
            this.regInfoSee = new BScroll(this.$refs.bscroll,{click:true});
        },
        disagree () {
            this.$router.replace({
                path: '/login'
            })
        },
        agree () {
            this.agreeEnter = !this.agreeEnter
        },
        selectCountryNO () {
            this.regTelNo = false
            this.$refs.showSelectCountry.showPage()
        },
        // 子组件执行父组件的事件
        regPageShow () {
            this.regTelNo = true
        },
        getInitialsNumber (data) {
            // 获取到国家对应的开头号码
            this.regTelNo = true
            this.initialsNumber = data
        },
        haveInitialsNumber () {
            if (this.initialsNumber == '') this.initialsNumber = `86`
        }
    },
    mounted () {
        this.haveInitialsNumber()
        this.$nextTick(() => {
            this.regTextInfoHeight()
        })
    },
    components: {
        Navbar,
        PhoneNOStart
    }
}
</script>
<style lang="less" scoped>
.reg-wrap {
    background-color: #f7f7f7;
    min-height: 100vh;
    overflow: hidden;
    .reg-tel-wrap {
        display: flex;
        margin: 0 15px 10px;
        overflow: hidden;
        box-sizing: border-box;
        padding-top: 45px;
        .reg-num-start {
            max-width: 45px;
            line-height: 44px;
            flex: 1;
            background-color: #fff;
            font-size: 13px;
            position: relative;
            text-align: center;
            &::after {
                width:0; 
                height:0; 
                content: '';
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-top: 4px solid #999;
                position: absolute;
                top: 20px;
                right: -8px;
                z-index: 9;
            }
        }
        .reg-telephone {
            flex: 2;
            /deep/.van-field__control {
                font-size: 12px;
            }
        }
    }
    .reg-shadow {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.3);
        z-index: 9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div {
            flex: 1;
        }
        div:nth-child(1) {
            max-height: 350px;
        }
        .reg-shadow-bottom {
            background-color: #f8f8f8;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            position: relative;
            h3 {
                display: block;
                font-size: 14px;
                text-align: center;
                line-height: 52px;
                border-bottom: 1px solid #ccc;
            }
            .reg-text-info {
                line-height: 16px;
                overflow: hidden;
                font-size: 12px;
                text-align: justify;
                margin: 0 10px;
            }
            .reg-show-btn-wrap {
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                background-color: #f8f8f8;
                .reg-show-read {
                    font-size: 10px;
                    font-weight: bold;
                    padding: 10px 5px;
                    text-align: justify;
                    line-height: 16px;
                    a {
                        color: #e93b3d;
                    }
                }
                .reg-show-btn {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    /deep/.van-button {
                        width: 100px;
                        height: 35px;
                        line-height: 35px;
                        border: 1px solid #ccc;
                    }
                    /deep/.van-button:nth-child(1) {
                        margin-left: 20px;
                        margin-bottom: 8px;
                    }
                    /deep/.van-button:nth-child(2) {
                        background-color: #e93b3d;
                        color: #fff;
                        border: 1px solid #e93b3d;
                        margin-right: 20px;
                        margin-bottom: 8px;
                    }
                }
            }
        }
    }
}
</style>
