<template>
    <!--页脚-->
    <div class="cm-home-footer have-bg home-style">
        <div class="container foot-box  foot-link-block">
            <div class="d-flex justify-content-space-between foot-box-con">
                <div class="text-left">
                    <a href="/" class="footer-logo d-inline-block" target="_blank">
                        <img :src="logo" class="d-block" alt="">
                    </a>
                    <p class="font-size-12 footer-link-color foot_warning">{{foot.info}}</p>
                </div>
                <div class="text-left foot-link-block">
                    <h4 class="footer-title-color footer-list-title font-size-14">SEEK Explorer</h4>
                    <a href="#" target="_blank" title="" class="footer-link-color footer-list-link font-size-12 ">Submit a bug</a>
                    <a href="#" target="_blank" title="" class="footer-link-color footer-list-link font-size-12 ">API</a>
                </div>
                <div class="text-left foot-link-block">
                    <h4 class="footer-title-color footer-list-title font-size-14">Developmnet</h4>
                    <a href="#" target="_blank" title="" class="footer-link-color footer-list-link font-size-12 ">Github</a>
                    <a href="#" target="_blank" title="" class="footer-link-color footer-list-link font-size-12 ">Documenttation</a>
                </div>
                <div class="text-left foot-link-block">
                    <p class="font-size-14 footer-title-color join_our font-size-14">Join Our Community</p>
                    <div class="share-btn-group d-flex align-items-center justify-content-end">
                        <a href="#" title="" target="_blank" class="footer-link-color font-size-26 ml-1">
                            <img :src="p1 == active?fbHover:fb" class="d-block" alt="facebook" @mouseenter="mouseenter(1)" @mouseleave="mouseleave(1)">
                        </a>
                        <a href="#" title="" target="_blank" class="footer-link-color font-size-26 ml-1">
                            <img :src="p2 == active?twHover:tw" class="d-block" alt="twitter" @mouseenter="mouseenter(2)" @mouseleave="mouseleave(2)">
                        </a>
                        <a href="#" title="" target="_blank" class="footer-link-color font-size-26 ml-1">
                            <img :src="p3 == active?telHover:tel" class="d-block" alt="telegram" @mouseenter="mouseenter(3)" @mouseleave="mouseleave(3)">

                        </a>
                        <a href="#" title="" target="_blank" class="footer-link-color font-size-26 ml-1">
                            <img :src="p4 == active?mHover:m" class="d-block" alt="medium" @mouseenter="mouseenter(4)" @mouseleave="mouseleave(4)">
                        </a>
                        <a href="#" title="" target="_blank" class="footer-link-color font-size-26 ml-1">
                            <img :src="p5 == active?ghHover:gh" class="d-block" alt="github" @mouseenter="mouseenter(5)" @mouseleave="mouseleave(5)">
                        </a>
                    </div>
                </div>
            </div>
            <div class="foot_copyright font-size-12">
                <p>&copy;Copyright 2019 SEEK. All Rights Reserved.</p>
            </div>
            <!-- <p class="font-size-12 text-primary  mt-3" style="width: 50%; margin-left: auto; margin-right: auto;">
                比特币等密码币的交易存在风险，在全球范围内一周7天，一天24小时无休止交易，没有每日涨停跌停限制，价格受到新闻事件，各国政策，市场需求等多种因素影响，浮动很大。我们强烈建议您事先调查了解，在自身所能承受的风险范围内参与交易。
            </p> -->
        </div>
    </div>
</template>
<script>
import data from "../service/data";
// 其他的icon
import logo from "@/assets/images/footer/footer_icon_logo.png";
import gh from "@/assets/images/footer/footer_icon_g.png";
import m from "@/assets/images/footer/footer_icon_m.png";
import fb from "@/assets/images/footer/footer_icon_fb.png";
import tw from "@/assets/images/footer/footer_icon_twitter.png";
import tel from "@/assets/images/footer/footer_icon_telegram.png";
import ghHover from "@/assets/images/footer/g_hover.png";
import mHover from "@/assets/images/footer/m_hover.png";
import fbHover from "@/assets/images/footer/f_hover.png";
import twHover from "@/assets/images/footer/t_hover.png";
import telHover from "@/assets/images/footer/tl_hover.png";

export default {
  data() {
    return {
      logo,
      gh,
      m,
      fb,
      tw,
      tel,
      ghHover,
      mHover,
      fbHover,
      twHover,
      telHover,
      active: 0,
      p1: 1,
      p2: 2,
      p3: 3,
      p4: 4,
      p5: 5
    };
  },
  methods: {
    mouseenter: function(hovershow) {
      this.active = hovershow;
    },
    mouseleave: function(hovershow) {
      this.active = 0;
    }
  },
  computed: {
    foot() {
      return data[this.language || "en"].index.foot;
    }
  }
};
</script>
<style lang="scss">
@import "../../static/css/_util.scss";
@import "../../static/css/_app.scss";
// @import "../../assets/style/variable.config";
.cm-home-footer {
  padding: 60px 20px 20px 20px;
  color: #ffffff;
  position: relative;
  background: #151840;
  .foot-box {
    width: 1200px;
    margin: 0 auto;
  }
  .foot_warning {
    margin-top: 30px;
    line-height: 20px;
    width: 200px;
    color: #babac6;
  }
  .foot_copyright {
    text-align: center;
    margin-top: 50px;
    padding: 30px 0 0;
    border-top: 1px solid #212557;
    p {
      margin: 0 auto;
      color: #babac6;
    }
  }
  .footer-list-title {
    margin-bottom: 36px;
  }
  .join_our {
    margin-top: 20px;
    margin-left: 10px;
    margin-bottom: 50px;
  }
  .footer-link-color {
    color: #babac6;
    font-weight: 400;
  }
  .footer-title-color {
    color: #ffffff;
    font-weight: 400;
  }
  .footer-list-link {
    margin-bottom: 20px;
    display: block;
    &:hover {
      text-decoration: underline;
      color: #3ad7ba;
    }
  }
  .share-btn-group {
    a {
      display: inline-block;
      margin: 0 10px;
    }
  }
}
.wechat-popover {
  min-width: unset;
  width: 120px;
  padding: 5px;
}
// x < 1200
@include md-lg-lt-md() {
  .cm-home-footer {
    padding: 20px;
    .foot-link-block {
      margin-top: 30px;
      h4 {
        margin: 0 0 15px;
      }
      a {
        margin-bottom: 10px;
      }
    }
    .foot_warning {
      margin: 0;
    }
    .foot-box {
      width: auto;
      .foot-box-con {
        display: block;
      }
    }
    .join_our {
      margin: 0;
    }
    .share-btn-group {
      justify-content: flex-start;
      margin-top: 10px;
      a {
        margin: 0 20px 0 0;
      }
    }
  }
}
</style>
