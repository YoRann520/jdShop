<template>
    <div class="navbar">
        <van-nav-bar
            :title="navBarInfo.topTitle"
            :style="{background: navBarInfo.bgColor,borderBottom: navBarInfo.borderColor}"
            left-arrow
            @click-left="onClickLeft"
        />
    </div>
</template>
<script>
/* eslint-disable */
//import { Toast } from 'vant';
export default {
    props: ['navBarInfo'],
    methods: {
        onClickLeft() {
            //Toast('返回');
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
/deep/.van-nav-bar {
    .van-nav-bar__title {
        font-size: 14px;
    }
    .van-icon {
        color: #666;
    }
}
</style>
