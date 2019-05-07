<template>
  <div class="menu-wrap">
    <ul class="menu-ul">
        <li
            @click='switchTab("index")'
        >
            <img v-if="$route.path.indexOf('index') !== -1" 
            src="@/assets/images/footerNav/home02.png"/>
            <img v-else src="@/assets/images/footerNav/home01.png">
        </li>
        <li
            @click='switchTab("cfication")'
        >
            <img v-if="$route.path.indexOf('cfication') !== -1" 
            src="@/assets/images/footerNav/footer02-1.png"/>
            <img v-else src="@/assets/images/footerNav/footer02.png">
        </li>
        <li
            @click='switchTab("assemble")'
        >
            <img v-if="$route.path.indexOf('assemble') !== -1" 
            src="@/assets/images/footerNav/footer03-1.png"/>
            <img v-else src="@/assets/images/footerNav/footer03.png">
        </li>
        <li
            @click='switchTab("cart")'
        >
            <img v-if="$route.path.indexOf('cart') !== -1" 
            src="@/assets/images/footerNav/footer04.png"/>
            <img v-else src="@/assets/images/footerNav/footer04.png">
        </li>
        <li
            @click='switchTab("login")'
        >
            <img v-if="$route.path.indexOf('login') !== -1" 
            src="@/assets/images/footerNav/footer05.png"/>
            <img v-else src="@/assets/images/footerNav/footer05.png">
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'home',
  methods: {
    switchTab(path) {
      this.$router.replace(path)
    }

  },
  mounted() {
      
  },
}
</script>
<style lang="less" scoped>
.menu-ul {
    width: 100%;
    height: 48px;
    overflow: hidden;
    display: flex;
    border-top: 1px solid #ddd;
    position: fixed;
    bottom: 0;
    left: 0;
    box-shadow: 0 0 3px #ddd;
    z-index: 99;
    background-color: #fff;
    li {
        flex: 1;
        img {
            width: 60px;
            height: 50px;
        }
    }
}

</style>
