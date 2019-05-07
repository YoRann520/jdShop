<template>
  <div class="home">
    <!-- 底部菜单 s -->
    <FootNav></FootNav>
    <!-- 底部菜单 e -->
    <transition name="slider-right">
      <router-view class="router-animation"/>
    </transition>
  </div>
</template>
<script>
// @ is an alias to /src
import FootNav from '@/components/Menu.vue';
export default {
  name: 'home',
  data() {
    return {
      
    }
  },
  components: {
    FootNav
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  position: relative;
  /deep/.van-tabbar-item__icon {
    img {
      width: 55px;
      height: 45px;
    }
    .van-info {
      top: 3px;
      right: 10px;
    }
  }
  .router-animation {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .slider-right-enter-active, .slider-right-leave-active {
    transition: all 1s ease;
  }
  .slider-right-enter {
    transform: translate(100%,0);
    opacity: 0;
  }
  .slider-right-leave-active {
    transform: translate(-100%,0);
    opacity: 0;
  }
}

</style>
