<template>
    <div class="cf-wrap">
        <!-- 搜索框 s -->
        <Search></Search>
        <!-- 搜索框 e -->
        <!-- 内容 s -->
        <main class="cf-content">
            <section class="cf-content-left" ref="bscroll">
                <ul>
                    <li
                        v-for="(item,key) in listItem"
                        :key="key"
                        @click="selectCon(key)"
                        :class="item.active?'active':''"
                    >{{item.title}}</li>
                </ul>
            </section>
            <section class="cf-content-right" ref="bscrollRight">
                <div class="cf-content-right-product">
                    <img 
                        :src="productThemeCf.adv" 
                        class="cf-hot-adv"
                    >
                    <ul>
                        <li 
                            v-for="(item,key) in productThemeCf.productTheme"
                            :key="key"
                        >
                            <div class="cf-product-title">
                                <h4>{{item.title}}</h4>
                                <p>
                                    <img 
                                        :src="item.iconDel"
                                        v-show="item.iconDel"
                                    >
                                    <span>{{item.do}}</span>
                                </p>
                            </div>
                            <div 
                                class="cf-product-list"
                            >
                                <router-link 
                                    :to="productInfo.productUrl"
                                    v-for="(productInfo,key) in item.productInfo"
                                    :key="key"
                                    >
                                    <img 
                                        :src="productInfo.imgUrl" 
                                        :alt="productInfo.title"
                                    >
                                    <i>{{productInfo.title}}</i>
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
        <!-- 内容 e -->
    </div>
</template>
<script>
/* eslint-disable */
import Search from '@/components/Search.vue'
import BScroll from 'better-scroll'
export default {
    data () {
        return {
            screenWidth: document.body.clientWidth,
            abscroll: {},
            bscrollWrap: {},
            /*hot: [
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐',
                '热门推荐'
            ],*/
            listItem: [],
            productThemeCf: {}
        }
    },
    methods: {
        getMainHeight () {
            let wH = document.documentElement.clientHeight,
                SearchH = document.querySelector('.search').offsetHeight,
                menuUlH = document.querySelector('.menu-ul').offsetHeight,
                cfContent = document.querySelector('.cf-content');
            //console.log(`搜索框高度：${SearchH}px 底部菜单的高度：${menuUlH}px`)
            cfContent.style.height = wH - ( SearchH + menuUlH ) + 'px'
            this.abscroll = new BScroll(this.$refs.bscroll,{click: true})
            this.bscrollWrap = new BScroll(this.$refs.bscrollRight,{click: true})
        },
        selectCon (key) {
            this.listItem.forEach((item,index) => {
                if (key == index) {
                    item.active = true
                } else {
                    item.active = false
                }
            })
            this.getPorductData(key)
        },
        async getListItemData () {
            const result = await this.$http.get('/api/Classification/menu')
            this.listItem = result.data
        },
        async getPorductData (type) {
            // 默认显示商品类型
            const result = await this.$http.get('/api/Classification/type',{
                params: {
                    type: type
                }
            })
            this.productThemeCf = result.data.data
            //console.log(result.data)
        }
    },
    mounted() {
        this.getMainHeight()
        this.getListItemData()
        this.getPorductData(0)
        const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }
    },
    watch: { 
        screenWidth (val) {
            if (!this.timer) {
                this.screenWidth = val
                this.timer = true
                let that = this
                setTimeout(function () {
                    //console.log(that.screenWidth)
                    that.getMainHeight()
                    that.timer = false
                }, 400)
            }
        }
    },
    components: {
        Search
    }
}
</script>
<style lang="less" scoped>
.cf-content {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    .cf-content-left {
        flex: 1;
        max-width: 85px;
        ul {
            background: #f8f8f8;
            li {
                height: 46px;
                line-height: 46px;
                font-size: 12px;
                text-align: center;
            }
            li.active {
                background-color: #fff;
                color: #f23030;
            }
        }
    }
    .cf-content-right {
        flex: 1;
        .cf-content-right-product {
            margin: 5px;
            overflow: hidden;
            .cf-hot-adv {
                width: 100%;
                margin-top: 5px;
            }
            .cf-product-title {
                display: flex;
                margin-top: 10px;
                margin-bottom: 10px;
                justify-content: space-between;
                h4 {
                    font-size: 12px;
                    color: #333;
                }
                p {
                    font-size: 12px;
                    color: #848689;
                    img {
                        width: 10px;
                        height: 10px;
                        padding-right: 3px;
                        vertical-align: middle;
                    }
                }
            }
            .cf-product-list {
                width: 100%;
                a {
                    width: 33.3%;
                    text-align: center;
                    display: inline-block;
                    img {
                        width: 70px;
                        height: 70px;
                    }
                    i {
                        display: block;
                        height: 35px;
                        font-size: 10px;
                        color: #333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
}
</style>
