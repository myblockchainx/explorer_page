<template>
  <section class="sidebar">
    <div class="logo-wrapper">
      <img class="logo-img" src="../assets/images/logo.png"/>
    </div>
    <div class="close-button cursor-pointer" @click="close"></div>
    <div class="sidebar-nav">
      <span v-for="(nav, index) in navs" :key="index" @click="scrollToSection(nav.active)" class="nav-text">
        <span v-if="nav.active===currentSection" style="color: rgb(57, 189, 166);font-weight:bold; "> {{nav.text}} </span>
        <span v-else> {{nav.text}} </span>
      </span>
      <router-link  class="nav-text" to="calculator">
      <span class="nav-text">
        {{content.calculator.name}}
      </span>
      </router-link>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'NavSideMenu',
    components: {},
    props: ['content', 'currentSection', 'sectionRefs'], /* navs = [ { title: '首页', href: '#', active: 'Poster' }, ...]*/
    methods: {
      close: function () {
        this.$emit('closeNavSidebar', true);
      },
      scrollToSection: function (sectionName) {
        if (sectionName) this.$router.push({path: sectionName}); //跳转到对应的页面
        this.close();
      }
    },
    data () {
      return {
        isMenuOpened: false,
        navs: []
      };
    },
    mounted () {
      this.navs = this.content.navs;
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../static/css/_util.scss';

  .sidebar {
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #303133;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: 80px;

    .logo-wrapper {
      position: absolute;
      left: 24px;
      top: 27px;

      height: 35.6px;
      width: auto;
      .logo-img {
        height: 100%;
      }
    }
    .sidebar-nav {
      width: 75%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > .nav-text {
        cursor: pointer;
        padding-bottom: 25px;
        font-family: Gotham-Regular, PingFang SC, Microsoft YaHei, sans-serif;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #ffffff;

        &.active {
          font-weight: 600;
          color: black;
        }
      }
    }

    .close-button { // menu opened, icon X
      position: absolute;
      right: 24px;
      top: 24px;
      width: 50px;
      height: 50px;
      &:before,
      &:after {
        display: block;
        content: '';
        width: 24px;
        height: 3px;
        background-color: #ffffff;
        transform-origin: center;
        position: absolute;
        top: 20px;
        right: 12px;
      }
      &:before {
        transform: rotate(-45deg);
      }
      &:after {
        transform: rotate(45deg);
      }
    }
  }

</style>
