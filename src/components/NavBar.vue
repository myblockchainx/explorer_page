<template>
  <section class="nav-container full-width" :class="{'nav-solid': !isCurrentAbout}">
    <!-- 移动端菜单版 -->
    <transition v-if="isShowNav" name="side-menu">
      <nav-side-menu v-if="isMenuOpened && content !== undefined" :currentSection="currentSection"
                     :content="content"
                     :sectionRefs="sectionRefs" @closeNavSidebar="isMenuOpened=false;"
                     class="side-bar-navs"/>
    </transition>
    <!-- pc端nav -->
    <section class="top-bar" :class="{'top-solid': !isCurrentAbout}">
      <div class="left">
        <div class="ether-logo">
          <div class="logo-wrapper">
            <a href="/" class="logo-img">
              <!-- <img class="logo-img" src="../assets/images/logo.png"/> -->
              CBase Explorer
            </a>
          </div>
        </div>
        <div class="navs" v-if="content !== undefined && isShowNav">
          <div v-for="(nav, index) in content.navs" :key="index" class="nav-item-wrapper"
               v-on:click="scrollToSectionOrOpenLink(nav.active)">
              <span v-if="nav.active === currentSection" class="nav-item" style="color:#39BDA6;border: 1px solid white; border-radius:13px; padding: 2px 8px;">
                {{nav.text}}
              </span>
              <span class="nav-item" v-else>
                {{nav.text}}
              </span>
          </div>
          <!-- <div class="nav-item-wrapper">
            <div class="nav-item" @click="calculator()">
              {{content.calculator.name}}
            </div>
          </div> -->
        </div>
      </div>
      <div class="language-and-menu" v-if="content !== undefined && isShowNav">
        <div class=language-switch-wrapper>
          <language-switch v-on:languageSwitched="listenLangSwitch" :language="language"/>
        </div>
        <div class="menu-icon-wrapper">
          <div class="side-bar-button cursor-pointer" @click="isMenuOpened = !isMenuOpened">
            <div class="hamburger-button" v-if="!isMenuOpened">
              <div class="hamburger-item"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <el-dialog :title="content.calculator.title" :visible.sync="calculatorshow">
      <div class="calculatorbox">
        <div class="disclaimer d-flex justify-content-space-between">
          <dl>{{content.calculator.disclaimer}}</dl>
          <dd>{{content.calculator.disclaimer_info}}</dd>
        </div>
        <el-form :model="form" :inline="true" style="text-align: left;">
          <h4>{{content.calculator.title2}}</h4>
          <el-form-item :label="content.calculator.cpb">
            <el-input v-model="form.block" autocomplete="off" @input="size(form.unit)"></el-input>
          </el-form-item>
          <el-form-item :label="content.calculator.bt">
            <el-input v-model="form.target" autocomplete="off" @input="size(form.unit)"></el-input>
          </el-form-item>
          <el-form-item :label="content.calculator.tps">
            <el-input v-model="form.size" autocomplete="off" @input="size(form.unit)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.unit" @change="size(form.unit)">
              <el-option label="GB" value="gb"></el-option>
              <el-option label="TB" value="tb"></el-option>
              <el-option label="PB" value="pb"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="content.calculator.erpd">
            <el-input v-model="form.erpd" autocomplete="off" @input="size(form.unit)"></el-input>
          </el-form-item>
          <div class="resultbox d-flex">
            <h2>{{content.calculator.result}}</h2>
            <p>{{content.calculator.pd}}<span>{{pd}}</span> CBase , {{content.calculator.pw}}<span>{{pw}}</span> CBase , {{content.calculator.pm}}<span>{{pm}}</span> CBase .</p>
          </div>
          <!-- <h4>{{content.calculator.title3}}</h4>
          <el-form-item :label="content.calculator.currency">
            <el-select v-model="form.currency" @change="currency()">
              <el-option label="CBase" value="CBase"></el-option>
              <el-option label="BTC" value="btc"></el-option>
              <el-option label="EUR" value="eur"></el-option>
              <el-option label="USD" value="usd"></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item :label="content.calculator.amount">
            <el-input v-model="form.amount" autocomplete="off" @input="currency()"></el-input>
          </el-form-item> -->
          <!-- <div class="price_calculator">
            <dd class="d-flex align-items-center">
              <p class="d-flex align-items-center">
                <span>1 </span> {{all_left}} <span> = </span>
                <el-input v-model="f_right_num" autocomplete="off" @input="currency()"></el-input>
                <span>{{f_right_unit}}</span>
              </p>
              <p>Total {{f_right_unit}} : {{f_total}}</p>
            </dd>
            <dd class="d-flex align-items-center">
              <p class="d-flex align-items-center">
                <span>1 </span> {{all_left}} <span> = </span>
                <el-input v-model="s_right_num" autocomplete="off" @input="currency()"></el-input>
                <span>{{s_right_unit}}</span>
              </p>
              <p>Total {{s_right_unit}} : {{s_total}}</p>
            </dd>
            <dd class="d-flex align-items-center">
              <p class="d-flex align-items-center">
                <span>1 </span> {{all_left}} <span> = </span>
                <el-input v-model="t_right_num" autocomplete="off" @input="currency()"></el-input>
                <span>{{t_right_unit}}</span>
              </p>
              <p>Total {{t_right_unit}} : {{t_total}}</p>
            </dd>
          </div> -->
        </el-form>
      </div>
      <!-- <el-form :model="form">
        <el-form-item>
          <el-input show-password v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form> -->
    </el-dialog>
  </section>
</template>

<script>
import data from "../service/data";
import LanguageSwitcher from "./LanguageSwitcher";
import NavSideMenu from "./NavSideMenu";

export default {
  name: "NavBar",
  components: {
    "language-switch": LanguageSwitcher,
    "nav-side-menu": NavSideMenu
  },
  props: {
    currentSection: {
      type: String,
      default: "home"
    },
    sectionRefs: Object,
    language: {
      type: String,
      default: "en"
    },
    isShowNav: {
      type: Boolean,
      default: true
    },
    componentOffsetTop: Array
  },
  data() {
    return {
      isScrolling: false,
      isMenuOpened: false,
      calculatorshow: false,
      form: {
        block: "100",
        target: "8947848",
        size: "0",
        unit: "tb",
        erpd: "0.4",
        currency: "CBase",
        amount: "394"
      },
      pd: "0",
      pw: "0",
      pm: "0",
      all_left: "Burst",
      f_right_num: "0",
      f_right_unit: "BTC",
      f_total: "0",
      s_right_num: "0",
      s_right_unit: "EUR",
      s_total: "0",
      t_right_num: "0",
      Burst: "1.00000000",
      BTC: "0.00000035",
      EUR: "0.00298373",
      USD: "0.00330419",
      t_right_unit: "USD",
      t_total: "0"
    };
  },
  computed: {
    isCurrentAbout() {
      return this.currentSection === "home";
    },
    content() {
      return data[this.language || "en"].nav;
    }
  },
  mounted() {
    this.currency();
  },
  methods: {
    scrollToSectionOrOpenLink: function(sectionName) {
      // var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (sectionName) this.$router.push({ path: sectionName }); //跳转到对应的页面
      // if (sectionName === "miner") return window.open("http://etherzero.org/miner");
    },
    // scrollPosition: function (startOffset, totalOffset, easeNumber) {
    //   return startOffset + totalOffset * easeNumber;
    // },
    // easeOutQuad: function (t) {
    // decelerating to zero velocity
    //   return t * (2 - t);
    // },
    listenLangSwitch: function(language) {
      this.$emit("languageSwitched", language);
    },
    size(data) {
      let that = this;
      let b = 1;
      let d = parseInt(that.form.block);
      let c = parseInt(that.form.target);
      let r = parseFloat(that.form.erpd);
      let size = parseFloat(that.form.size);
      if (data == "pb") {
        b = b * 1e3 * 1e3 * 1e3;
      } else if (data == "tb") {
        b = b * 1e3 * 1e3;
      } else if (data == "gb") {
        b = b * 1e3;
      } else {
        return false;
      }
      // switch (data) {
      //   case "pb":
      //     b *= 1e3;
      //   case "tb":
      //     b *= 1e3;
      //   case "gb":
      //     b *= 1e3;
      // }
      // alert(b);
      let magicFactor = 0.85;
      let a = 4 * size * b;
      a = Math.pow(2, 64) / c / a;
      d = 3600 * d / a;
      a = 24 * d * magicFactor;
      let day = a * r;
      let week = day * 7;
      let month = day * 30;
      that.pd = Number(day).toFixed(2);
      that.pw = Number(week).toFixed(2);
      that.pm = Number(month).toFixed(2);
    },
    currency() {
      let that = this;
      if (that.form.currency == "CBase") {
        that.all_left = "Burst";
        that.f_right_unit = "BTC";
        that.s_right_unit = "EUR";
        that.t_right_unit = "USD";
        that.f_right_num = that.BTC / that.Burst;
        that.s_right_num = that.EUR / that.Burst;
        that.t_right_num = that.USD / that.Burst;
        that.f_total = (that.f_right_num * that.form.amount).toFixed(3);
        that.s_total = (that.s_right_num * that.form.amount).toFixed(3);
        that.t_total = (that.t_right_num * that.form.amount).toFixed(3);
        that.f_right_num = that.f_right_num.toFixed(8);
        that.s_right_num = that.s_right_num.toFixed(8);
        that.t_right_num = that.t_right_num.toFixed(8);
      } else if (that.form.currency == "btc") {
        that.all_left = "BTC";
        that.f_right_unit = "Burst";
        that.s_right_unit = "EUR";
        that.t_right_unit = "USD";
        that.f_right_num = that.Burst / that.BTC;
        that.s_right_num = that.EUR / that.BTC;
        that.t_right_num = that.USD / that.BTC;
        that.f_total = (that.f_right_num * that.form.amount).toFixed(3);
        that.s_total = (that.s_right_num * that.form.amount).toFixed(3);
        that.t_total = (that.t_right_num * that.form.amount).toFixed(3);
        that.f_right_num = that.f_right_num.toFixed(8);
        that.s_right_num = that.s_right_num.toFixed(8);
        that.t_right_num = that.t_right_num.toFixed(8);
      } else if (that.form.currency == "eur") {
        that.all_left = "EUR";
        that.f_right_unit = "Burst";
        that.s_right_unit = "BTC";
        that.t_right_unit = "USD";
        that.f_right_num = that.Burst / that.EUR;
        that.s_right_num = that.BTC / that.EUR;
        that.t_right_num = that.USD / that.EUR;
        that.f_total = (that.f_right_num * that.form.amount).toFixed(3);
        that.s_total = (that.s_right_num * that.form.amount).toFixed(3);
        that.t_total = (that.t_right_num * that.form.amount).toFixed(3);
        that.f_right_num = that.f_right_num.toFixed(8);
        that.s_right_num = that.s_right_num.toFixed(8);
        that.t_right_num = that.t_right_num.toFixed(8);
      } else if (that.form.currency == "usd") {
        that.all_left = "USD";
        that.f_right_unit = "Burst";
        that.s_right_unit = "BTC";
        that.t_right_unit = "EUR";
        that.f_right_num = that.Burst / that.USD;
        that.s_right_num = that.BTC / that.USD;
        that.t_right_num = that.EUR / that.USD;
        that.f_total = (that.f_right_num * that.form.amount).toFixed(3);
        that.s_total = (that.s_right_num * that.form.amount).toFixed(3);
        that.t_total = (that.t_right_num * that.form.amount).toFixed(3);
        that.f_right_num = that.f_right_num.toFixed(8);
        that.s_right_num = that.s_right_num.toFixed(8);
        that.t_right_num = that.t_right_num.toFixed(8);
      } else {
        return false;
      }
    },
    calculator() {
      let that = this;
      that.calculatorshow = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../static/css/_util.scss";
// @import '../styles/app.scss';

.nav-container {
  // height : first section 84px, later: 63px
  // height: #{$nav-bar-height-wide};
  background-color: #239e86;
  z-index: 100;
  padding-bottom: 20px;
}

.top-bar {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 32px - 24px);
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  .ether-logo {
    height: 100%;
    padding-right: 100px;
    .logo-wrapper {
      height: 42px;
      width: auto;
      .logo-img {
        font-size: 30px;
        color: #f4f9f6;
        font-weight: 600;
        @include md-lg-lt-md() {
          font-size: 22px;
        }
      }
    }
  }
  .navs {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: calc(80% - 44px - 77px);
    height: 100%;
    max-width: 300px;
    .nav-item-wrapper {
      position: relative;
      width: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .nav-item {
        position: relative;
        cursor: pointer;
        font-family: Roboto-Medium;
        font-size: 14px;
        // color: rgba(116, 127, 147, 0.87);
        color: #ffffff;
      }
      .nav-item:hover {
        color: #39bda6;
      }
      // .nav-item:after {
      //   content: "";
      //   position: absolute;
      //   bottom: -12px;
      //   left: 0;
      //   width: 100%;
      //   height: 2px;
      //   background-color: #ffffff;
      //   -webkit-transform: scale3d(1, 1, 1);
      //   transform: scale3d(1, 1, 1);
      //   -webkit-transform: scale3d(0, 4, 1);
      //   transform: scale3d(0, 4, 1);
      //   -webkit-transform-origin: 0% 50%;
      //   transform-origin: 0% 50%;
      //   -webkit-transition: -webkit-transform 0.3s;
      //   transition: transform 0.3s;
      //   -webkit-transition-timing-function: cubic-bezier(1, 0.68, 0.16, 0.9);
      //   transition-timing-function: cubic-bezier(1, 0.68, 0.16, 0.9);
      // }
    }
    .nav-item-wrapper:hover {
      .nav-item:after {
        background-color: #ffffff;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }
    }
  }

  // x >= 961
  @include md-rd-gt-sm() {
    min-width: 904px;
    max-width: 1200px;
  }
  @include md-rd-lt-md() {
    padding-top: 24px;
    .navs {
      display: none;
    }
  }
}

.left {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(100% - 200px);
  justify-content: space-between;
}

.language-and-menu {
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  .language-switch-wrapper {
    position: relative;
  }
  .menu-icon-wrapper {
    height: 100%;
    padding-left: 20px;
    display: none;
    // x < 960
    @include md-rd-lt-md() {
      display: block;
    }

    .hamburger-button {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 30px;
      .hamburger-item {
        width: 18px;
        height: 2px;
        background-color: #637ca8;
        &:before,
        &:after {
          content: "";
          display: block;
          width: 18px;
          height: 2px;
          background-color: #637ca8;
        }
        &:before {
          transform: translateY(-6px);
        }
        &:after {
          transform: translateY(4px);
        }
      }
    }
  }
}

.close-button {
  // menu opened, icon X
  position: relative;
  width: 50px;
  height: 50px;
  &:before,
  &:after {
    display: block;
    content: "";
    width: 24px;
    height: 4px;
    background-image: linear-gradient(316deg, #67eefb, #1c8ef7);
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

// when is not first section
.nav-solid {
  background-color: #239e86;
  // height: #{$nav-bar-height-thin};
  // box-shadow: 0 1px 0 0 rgba(2, 21, 40, 0.04);
  .top-solid {
    // padding-top: 22px;
  }
}

/**
   * side bar menu Open/Close animation
   */
.side-menu-enter-active,
.side-menu-leave-active {
  transition: transform 0.5s ease;
}

.side-menu-enter,
.side-menu-leave-to {
  transform: translateY(-100vh);
}
.calculatorbox {
  .disclaimer {
    dl {
      color: #000;
      font-weight: bold;
      margin-right: 10px;
      font-size: 16px;
    }
    dd {
      text-align: left;
    }
  }
  h4 {
    text-align: left;
    color: #000;
    font-size: 16px;
  }
  h2 {
    text-align: left;
    color: #000;
    margin: 0;
    font-size: 14px;
  }
  .resultbox {
    p {
      margin-left: 10px;
      span {
        color: #000;
        font-weight: bold;
      }
    }
  }
  .price_calculator {
    dd {
      margin: 10px auto;
      p {
        &:nth-child(1) {
          margin-right: 30px;
          span {
            &:nth-child(1) {
              margin-right: 5px;
            }
            &:nth-child(2) {
              margin: 0 5px;
            }
            &:nth-last-child(1) {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  // .el-form-item{
  //   margin-bottom: 0;
  // }
}
</style>
<style lang="scss">
.el-dialog__title {
  line-height: 24px;
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}
</style>
