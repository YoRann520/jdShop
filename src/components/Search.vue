<template>
    <div class="search">
        <section class="search-top">
            <span class="search-top-left"></span>
            <van-search
                v-model="value"
                :placeholder="placeholder"
                shape="round"
                @search="onSearch"
                class="search-input"
            >
            </van-search>
            <p class="search-top-right">
                <i></i>
                <i></i>
                <i></i>
            </p>
        </section>
    </div>
</template>
<script>
/* eslint-disable */
import { Search } from 'vant';
export default {
    data () {
        return {
            value: '',
            placeholder: '4.23世界读书日 每100减50 '
        }
    },
    methods: {
        onSearch () {

        }
    }
}
</script>
<style lang="less" scoped>
.search-top {
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 6px;
    .search-top-left {
        flex: 1;
        max-width: 40px;
        height: 36px;
        background: url('../assets/images/common/arrowLeft.png') no-repeat;
        background-size: 22px 22px;
        background-position: 15px 11px; 
    }
    .search-input {
        flex: 1;
        padding: 0;
        padding-top: 5px;
    }
    /deep/.van-cell {
        font-size: 12px;
    }
    .search-top-right {
        max-width: 40px;
        height: 36px;
        flex: 1;
        overflow: hidden;
        text-align: center;
        i {
            width: 3px;
            height: 3px;
            background-color: #63656f;
            display: inline-block;
            border-radius: 50%;
            margin-right: 4px;
            margin-top: 22px;
        }
    }
}
</style>