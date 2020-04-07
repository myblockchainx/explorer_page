<template>
  <section class="indexpage" v-loading="loading">
    <div class="index_show d-flex align-items-center justify-content-space-between">
      <div class="data_left d-flex align-items-center justify-content-space-between">
        <div class="data_left_box">
          <p>{{now_block}}</p>
          <dl>{{home.now_block}}</dl>
          <!-- <img src="../../../src/assets/images/index/Latest_Block.png" /> -->
        </div>
        <div class="data_left_box">
          <p><span>{{block_time}}</span> s</p>
          <dl>{{home.block_time}}</dl>
          <!-- <img src="../../../src/assets/images/index/Avg_Block_Time.png" /> -->
        </div>
        <div class="data_left_box">
          <p><span>{{tx_speed}}</span> Tx/s</p>
          <dl>{{home.tx_speed}}</dl>
          <!-- <img src="../../../src/assets/images/index/AvgTxs_Per_Second.png" /> -->
        </div>
      </div>
      <dl class="line"></dl>
      <div class="data_right">
        <div class="data_right_up_box d-flex align-items-center justify-content-space-between">
          <!--<div class="data_right_box">
            <p>{{hashrate_num}} T</p>
            <dl>{{home.hashrate}}</dl>
          </div>-->
          <div class="data_right_box">
            <p>{{miner_num}}</p>
            <dl>{{home.miner_num}}</dl>
          </div>
          <!--<div class="data_right_box">
            <p>{{burn_num}}</p>
            <dl>{{home.burn_num}}</dl>-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import data from "../../service/data";
import Home from "../../service/home";
// import Trans from "../../service/Trans";

export default {
  name: "indexpage",
  data() {
    return {
      now_block: 0,
      block_time: 0,
      tx_speed: 0,
      hashrate_num: "0",
      miner_num: "0",
      burn_num: "0",
      case_num: "0",
      govern: "0",
      apply: "0",
      loading: false //loading遮罩
    };
  },
  props: ["language"],
  computed: {
    home() {
      return data[this.language || "en"].index.home;
    }
  },
  mounted() {
    this.updateData();
    this.interFun();
  },
  methods: {
    //主节点数量
    async totalHashRate() {
      // let that = this;
      try {
        let res = await Home.totalHashRate();
        this.hashrate_num = res.data.resp;
      } catch (e) {
        // that.$notify.error({title: that.$t("ERROR"), message: e.toString()});
        console.log(e);
      }
    },
    //当前区块高度,平均出块时间,平均处理交易
    async reloadBlocks() {
      // let that = this;
      try {
        let res = await Home.reloadBlocks();
        
        // console.log("res....",res)
        // if (res.status == 200) this.loading = false;
        if (res.status == 200 && res.data.resp) {
          this.now_block = res.data.resp.number; //当前区块高度
          this.block_time = res.data.resp.blockTime; //平均出块时间
          this.tx_speed = 1; //平均处理交易
        }
      } catch (e) {
        // that.$notify.error({title: that.$t("ERROR"), message: e.toString()});
        console.log(e);
      }
    },
    //矿工数量、累计燃烧数量
    async updateData() {
      // let that = this;
      try {
        let latedata = await Home.dataCal();
        let latest = await Home.latestMesg()
        // console.log("latest:",latest.data.result.sync_info.latest_block_height)
        if (latedata.data.resp.code == 1000) {
          let dataCall = latedata.data.resp.data;
          // console.log("dataCall",dataCall)
          this.miner_num = latest.data.resp.validatorLen;
          this.burn_num = dataCall.burnt;
          this.now_block = latest.data.resp.block_num;
          this.hashrate_num = dataCall.netPower;
          this.block_time = latest.data.resp.avgTime; //平均出块时间
          this.tx_speed = 1; //平均处理交
        }
      } catch (e) {
        // that.$notify.error({title: that.$t("ERROR"), message: e.toString()});
        console.log(e);
      }
    },
    async interFun() {
      setInterval(async () => {
        let latedata = await Home.dataCal();
        let latest = await Home.latestMesg()
        if (latedata.data.resp.code == 1000) {
          let dataCall = latedata.data.resp.data;
          this.burn_num = dataCall.burnt;
          this.now_block = latest.data.resp.block_num;
          this.hashrate_num = dataCall.netPower;
          this.miner_num = latest.data.resp.validatorLen;
          this.block_time = latest.data.resp.avgTime; //平均出块时间
          let latest_block = latest.data.resp.latestBlock;
          
          this.tx_speed = 1; //平均处理交
          if (dataCall.block) {
            this.$Trans.$emit("block_latest", latest_block);
          }
          if (dataCall.tx) {
            this.$Trans.$emit("tx_latest", dataCall.tx);
          }
        }
      }, 3000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "../../../static/css/_util.scss";
@import "../../../static/css/_app.scss";

.indexpage {
  width: 100%;
  height: auto;
  margin-bottom: 40px;
}
.index_show {
  width: 1200px;
  height: 200px;
  background: #239e86;
  margin: 0 auto;
  .data_left {
    width: 45%;
    margin: 0 50px;
    .data_left_box {
      p {
        font-size: 22px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #ffffff;
        margin: 0 auto 20px;
      }
      dl {
        font-size: 13px;
        font-family: MicrosoftYaHeiLight;
        font-weight: 300;
        color: white;
        margin-bottom: 20px;
      }
    }
  }
  .line {
    background: #383c79;
    height: 160px;
    width: 1px;
    margin: 20px auto;
  }
  .data_right {
    width: 45%;
    margin: 0 50px;
    .data_right_up_box {
      margin-top: 15px;
      // &:nth-child(1) {
      //   border-bottom: 1px solid #383c79;
      // }
      .data_right_box {
        width: 33%;
        p {
          // font-size: 16px;
          // font-family:ArialMT;
          // font-weight: 400;
          // color: #ffffff;
          // margin: 0 auto 15px;
          font-size: 22px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: #ffffff;
          margin: 0 auto 20px;
        }
        dl {
          font-size: 13px;
          font-family: MicrosoftYaHeiLight;
          font-weight: 300;
          color: white;
          margin-bottom: 20px;
        }
      }
    }
  }
}
// x < 1200
@include md-lg-lt-md() {
  .indexpage {
    margin-bottom: 0;
  }
  .index_show {
    width: auto;
    display: block;
    height: auto;
    .line {
      display: none;
    }
    .data_left {
      width: calc(100% - 40px);
      margin: 0 20px;
      padding-top: 20px;
    }
    .data_right {
      width: calc(100% - 40px);
      margin: 0 20px;
      padding-top: 20px;
    }
  }
}
</style>
