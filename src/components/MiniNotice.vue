<template>
    <!--公告，这里是迷你横条-->
    <div class="mini-notice">
        <!-- <div class="notice_box d-flex">
            <i><img src="../../src/assets/images/notice/icon_news.png" /></i>
            <marquee direction="down" scrollamount="1" class="note">
                <div class="container" v-for="(item,index) in articles" :key="index">
                   <a :href="item.url"  target="_blank" class="flex-1 item text-secondary text-overflow">{{item.title}}</a>
                </div>
            </marquee>
        </div> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        { url: "#", title: "消息滚动消息滚动消息滚动消息滚动消息滚动消息滚动消息滚动消息滚动" },
        { url: "#", title: "消息滚动消息滚动消息滚动消息滚动消息滚动消息滚动消息滚动消息滚动" },
        { url: "#", title: "消息滚动消息滚动消息滚动消息滚动消息滚动消息滚动消息滚动消息滚动" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../static/css/_util.scss";
@import "../../static/css/_app.scss";
.mini-notice {
  padding: 10px 0;
  .notice_box {
    width: 1200px;
    margin: 0 auto;
    height: 14px;
    .note {
        height: 14px;
      .item {
        padding-left: 10px;
        color: #1B4A74;
        font-size: 12px;
        text-align: left;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 500px;
        &:hover {
          color: #ff0000 !important;
        }
      }
    }
  }
}
// x < 1200
@include md-lg-lt-md() {
.mini-notice {
  .notice_box {
    width: auto;
    margin: 0 10px;
    .note{
      .item{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 80%;
        display: inline-block;
      }
    }
  }
}
}
</style>
