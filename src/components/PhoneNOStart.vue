<template>
    <div class="reg-telNo-start" v-show="selectCountry">
        <!-- NavBar s -->
        <div class="navbar">
            <van-nav-bar
                :title="navBarInfo.topTitle"
                :style="{background: navBarInfo.bgColor,borderBottom: navBarInfo.borderColor}"
                left-arrow
                @click-left="onClickLeft"
                fixed
            />
        </div>
        <!-- NavBar e -->
        <!-- list s -->
        <section class="reg-select-list">
            <ul>
                <li
                    v-for="(list,key) in countryList"
                    :key="key"
                >
                    <h3 class="reg-country-Initials">{{list.countryInitials}}</h3>
                    <p
                        v-for="(item,index) in list.countryHave"
                        :key="index"
                        @click="getInitials(item.countryNO)"
                    >
                        <span>{{item.countryName}}</span>
                        <span>+{{item.countryNO}}</span>
                    </p>
                </li>
            </ul>
        </section>
        <!-- list e -->
        <!-- aside right s -->
        <aside class="reg-aside-letter">
            <i 
                v-for="(item,key) in getLetter" 
                :key="key"
                @click="goTo(key)"
            >
                {{item}}
            </i>
        </aside>
        <!-- aside right e -->
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
export default {
    data () {
        return {
            selectCountry: false,
            navBarInfo: {
                topTitle: '选择国家或者地区',
                bgColor: '#f9f9f9',
                borderColor: '1px solid #bbb'
            },
            countryList: [
                {
                    countryInitials: '*',
                    countryHave: [
                        {
                            countryName: '中国',
                            countryNO: '86'
                        },
                        {
                            countryName: '中国香港',
                            countryNO: '852'
                        },
                        {
                            countryName: '中国澳门',
                            countryNO: '853'
                        },
                        {
                            countryName: '中国台湾',
                            countryNO: '886'
                        },
                        {
                            countryName: '新加坡',
                            countryNO: '65'
                        }
                    ]
                },
                {
                    countryInitials: 'A',
                    countryHave: [
                        {
                            countryName: '阿尔巴尼亚',
                            countryNO: '355'
                        },
                        {
                            countryName: '阿尔及利亚',
                            countryNO: '213'
                        },
                        {
                            countryName: '阿富汗',
                            countryNO: '93'
                        },
                        {
                            countryName: '阿根廷',
                            countryNO: '54'
                        },
                        {
                            countryName: '爱尔兰',
                            countryNO: '353'
                        }
                    ]
                },
                {
                    countryInitials: 'B',
                    countryHave: [
                        {
                            countryName: '阿尔巴尼亚',
                            countryNO: '355'
                        },
                        {
                            countryName: '阿尔及利亚',
                            countryNO: '213'
                        },
                        {
                            countryName: '阿富汗',
                            countryNO: '93'
                        },
                        {
                            countryName: '阿根廷',
                            countryNO: '54'
                        },
                        {
                            countryName: '爱尔兰',
                            countryNO: '353'
                        }
                    ]
                },
                {
                    countryInitials: 'C',
                    countryHave: [
                        {
                            countryName: '阿尔巴尼亚',
                            countryNO: '355'
                        },
                        {
                            countryName: '阿尔及利亚',
                            countryNO: '213'
                        },
                        {
                            countryName: '阿富汗',
                            countryNO: '93'
                        },
                        {
                            countryName: '阿根廷',
                            countryNO: '54'
                        },
                        {
                            countryName: '爱尔兰',
                            countryNO: '353'
                        }
                    ]
                },
                {
                    countryInitials: 'D',
                    countryHave: [
                        {
                            countryName: '阿尔巴尼亚',
                            countryNO: '355'
                        },
                        {
                            countryName: '阿尔及利亚',
                            countryNO: '213'
                        },
                        {
                            countryName: '阿富汗',
                            countryNO: '93'
                        },
                        {
                            countryName: '阿根廷',
                            countryNO: '54'
                        },
                        {
                            countryName: '爱尔兰',
                            countryNO: '353'
                        }
                    ]
                },
                {
                    countryInitials: 'E',
                    countryHave: [
                        {
                            countryName: '阿尔巴尼亚',
                            countryNO: '355'
                        },
                        {
                            countryName: '阿尔及利亚',
                            countryNO: '213'
                        },
                        {
                            countryName: '阿富汗',
                            countryNO: '93'
                        },
                        {
                            countryName: '阿根廷',
                            countryNO: '54'
                        },
                        {
                            countryName: '爱尔兰',
                            countryNO: '353'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        showPage () {
            this.selectCountry = true
        },
        onClickLeft () {
            this.selectCountry = false
            this.$emit('onClickLeft')
        },
        getInitials (Initials) {
            this.$emit('getInitials',Initials)
            this.selectCountry = false
            //console.log(Initials)
        },
        goTo (key) {
            // 右侧字母对应列表内容
            let itemCateDom = document.querySelectorAll('.reg-country-Initials')
            document.documentElement.scrollTop = itemCateDom[key].offsetTop
        }
    },
    computed: {
        getLetter () {
            let arr = []
            for(var i = 65; i < 91; i++){
                arr.push(String.fromCharCode(i))
            }
            return arr
        }
    },
    components: {
        Navbar
    }
}
</script>
<style lang="less" scoped>
.reg-telNo-start {
    min-height: 100vh;
    background-color: #fff;
    overflow: hidden;
    .reg-aside-letter {
        width: 23px;
        text-align: center;
        position: fixed;
        top: 92px;
        right: 0;
        font-size: 10px;
        color: #2d90ff;
        background-color: #fff;
        i {
            display: block;
            line-height: 12px;
        }
    }
}
/deep/.van-nav-bar {
    .van-nav-bar__title {
        font-size: 14px;
    }
    .van-icon {
        color: #666;
    }
}
.reg-select-list {
    margin-top: 47px;
    ul {
        li {
            h3 {
                height: 43px;
                line-height: 43px;
                display: block;
                font-size: 12px;
                padding: 0 25px 0 12px;
                background-color: #f5f5f5;
                color: #999;
            }
            p {
                height: 44px;
                line-height: 44px;
                margin: 0 25px 0 12px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #999;
                span:nth-child(1) {
                    color: #333;
                }
                span:nth-child(2) {
                    font-size: 12px;
                    color: #999;
                }
            }
            p:nth-last-child(1) {
                border: 0;
            }
        }
    }
}
</style>
