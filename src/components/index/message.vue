  <template>
  <section class="indexmessage" v-loading="loading">
    <div class="message d-flex justify-content-space-between">
      <div class="message_left">
        <div class="left_title d-flex align-items-center justify-content-space-between">
          <div class="left_title_l d-flex align-items-center justify-content-space-between">
            <img src="../../assets/images/index/Latest_Block_list.png">
            <p>{{message.now_block}}</p>
          </div>
          <router-link to="blocklist">
            <div class="left_title_r d-flex align-items-center">{{message.check_all}}<img src="../../assets/images/index/read_more_green.png" /></div>
          </router-link>
        </div>
        <div class="message_data d-flex align-items-center justify-content-space-between" v-for="(item,index) in message_data" :key="index" v-if="index < 5">
          <router-link :to="{ path: 'blocklistdetail', query: { block: item.number}}">
            <div class="data_time">
              <dl>{{item.height}}</dl>
              <p>{{item.timestamp | formatDate}}</p>
            </div>
          </router-link>
          <div class="data_add">
            <dl class="d-flex align-items-center ">By
              <dd v-for="creat in item.createdby" :key="creat">
                <!-- <a class="cursor-pointer" @click="tokenrelay(item.miner)" :disabled="isDisable">{{item.miner}}</a> -->
                {{creat}}
                <!--<router-link :to="{ path: 'eaaddress', query: { address: item.miner}}">{{item.miner | subAddress}}</router-link>-->
              </dd>
            </dl>
            <p>{{item.txs.length}} Transactions</p>
          </div>
          <!-- <div class="data_version">
            <dl>v-{{item.extraData}}</dl>
          </div> -->
        </div>
      </div>
      <div class="message_right">
        <div class="right_title d-flex align-items-center justify-content-space-between">
          <div class="right_title_l d-flex align-items-center justify-content-space-between">
            <img src="../../assets/images/index/Latest_Transactions.png">
            <p>{{message.now_exchange}}</p>
          </div>
          <router-link to="txlist">
            <div class="right_title_r d-flex align-items-center">{{message.check_all}}<img src="../../assets/images/index/read_more_white.png" /></div>
          </router-link>
        </div>
        <div class="exchange_data d-flex align-items-center justify-content-space-between" v-for="(exchange,index1) in exchange_data" :key="index1" v-if="index1 < 5">
          <img src="../../assets/images/index/icon_trade.png" />
          <div class="data_time">
            <dl>{{exchange.value  }} </dl>
            <p>{{exchange.timestamp | formatDate}}</p>
          </div>
          <div class="data_add">
            <dl class="d-flex align-items-center ">
              <span>TX</span>
              <dd>
                <!-- <el-tooltip effect="light" :content="exchange.hash" placement="bottom-start"> -->
                  <a class="cursor-pointer" @click="transactionRelay(exchange.hash)" :disabled="isDisable">{{exchange.hash | subTxhash}}</a>
                  <!-- <router-link :to="{ path: 'txeadetail', query: { hash: exchange.hash}}">{{exchange.hash}}</router-link> -->
                <!-- </el-tooltip> -->
              </dd>
            </dl>
            <dl class="d-flex align-items-center ">
              <span>From</span>
              <p>
                <a class="cursor-pointer" @click="tokenrelay(exchange.signer_id)" :disabled="isDisable">{{exchange.signer_id}}</a>
                <!-- <router-link :to="{ path: 'eaaddress', query: { address: exchange.from}}">{{exchange.from}}</router-link> -->
              </p>
              <span>To</span>
              <p>
                <a class="cursor-pointer" @click="tokenrelay(exchange.receiver_id)" :disabled="isDisable">{{exchange.receiver_id }}</a>
                <!-- <router-link :to="{ path: 'eaaddress', query: { address: exchange.to}}">{{exchange.to}}</router-link> -->
              </p>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import data from "../../service/data";
import Home from "../../service/Home";

export default {
  name: "indexmessage",
  data() {
    return {
      nowtimes: "",
      message_data: [],
      exchange_data: [],
      isDisable: false, //表单重复提交
      loading: true, //loading遮罩
      txhash: "",
      number: 0
    };
  },
  props: ["language"],
  computed: {
    message() {
      return data[this.language || "en"].index.message;
    }
  },
  mounted() {
    this.reloadBlocks();
    this.reloadTransactions();
    this.emitData();
  },
  methods: {
    emitData() {
      this.$Trans.$off("tx_latest");
      this.$Trans.$on("tx_latest", data => {
        if (data && data.hash != this.txhash) {
          this.txhash = data.hash;
          this.exchange_data.unshift(data);
          if (this.exchange_data && this.exchange_data.length > 10) {
            this.exchange_data.pop();
          }
        }
      });
      this.$Trans.$off("block_latest");
      this.$Trans.$on("block_latest", data => {
        if (data && data.number != this.number) {
          this.number = data.number;
          this.message_data.unshift(data);
          if (this.message_data && this.message_data.length > 10) {
            this.message_data.pop();
          }
        }
      });
    },
    //最新区块数据
    async reloadBlocks() {
      // let that = this;
      this.nowtimes = parseInt(Date.parse(new Date()) / 1000);
      // console.log(this.nowtimes);
      try {
        let res = await Home.reloadBlocks();
        let datas = await Home.blockList();
        if (datas.data.resp.blockList) {
          // this.message_data = res.data.resp.blocks;
          this.message_data = datas.data.resp.blockList
          this.number = res.data.resp.blocks[0].number;
        }
        // console.log(res);
      } catch (e) {
        // that.$notify.error({title: that.$t("ERROR"), message: e.toString()});
        console.log(e);
      }
    },
    //最新交易数据
    async reloadTransactions() {
      // let that = this;
      try {
        let res = await Home.reloadTransactions();
        let txList = await Home.txList();
        console.log("tx:",txList.data.resp.txList)
        if (res.status == 200) this.loading = false;
        this.exchange_data = txList.data.resp.txList;
        this.txhash = res.data.txs[0].hash;
      } catch (e) {
        // that.$notify.error({title: that.$t("ERROR"), message: e.toString()});
        console.log(e);
      }
    },
    //判断是否为合约账户或者外部账户
    async tokenrelay(address) {
      this.loading = true;
      try {
        let res = await Home.tokenrelay(address);
        // console.log(res.data);
        if (res.data == "" || res.data == null) {
          this.$router.push({ path: "eaaddress", query: { address: address } });
        } else {
          this.$router.push({ path: "caaddress", query: { address: address } });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //判断是否为合约tx或者外部tx
    async transactionRelay(tx) {
      // this.loading = true;
      try {
        let res = await Home.transactionRelay(tx);
        if (res.status == 200) this.loading = false;
        // console.log(res.data.contractLable);
        if (res.data.contractLable) {
          this.$router.push({ path: "txcadetail", query: { hash: tx } });
        } else {
          this.$router.push({ path: "txeadetail", query: { hash: tx } });
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value );
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      // return MM + "M :" + d + ": " + h + ":" + m + ":" + s;
    },
    subAddress: function(address) {
      let add = String(address);
      let start = add.substr(0, 8);
      let end = add.substr(36, add.length);
      return start + "...." + end;
    },
    subTxhash: function(txhash) {
      let add = String(txhash);
      let start = add.substr(0, 12);
      let end = add.substr(56, add.length);
      return start + "...." + end;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "../../../static/css/_util.scss";
@import "../../../static/css/_app.scss";

.indexmessage {
  width: 100%;
  margin: 0 auto 50px;
  .message {
    width: 1200px;
    margin: 0 auto;
    .message_left {
      width: 42%;
      margin: 0;
      .left_title {
        border: 1px solid #dcdde9;
        width: 90%;
        padding: 20px 5%;
        .left_title_l {
          p {
            font-size: 16px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(29, 31, 78, 1);
            padding-left: 15px;
          }
        }
        .left_title_r {
          padding: 6px 10px;
          border: 1px solid #1eb399;
          color: #1eb399;
          cursor: pointer;
          img {
            padding-left: 5px;
          }
        }
      }
      .message_data {
        border: 1px solid #dcdde9;
        border-top: 0;
        width: 90%;
        padding: 20px 5%;
        .data_time {
          width: 100px;
          // height: 60px;
          background: #eef0f6;
          border-radius: 4px;
          padding: 0 15px;
          dl {
            margin: 8px auto 8px;
            font-size: 16px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(71, 77, 120, 1);
            text-align: left;
            a {
              color: rgba(71, 77, 120, 1);
            }
          }
          p {
            margin: 8px auto 8px;
            font-size: 13px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(94, 104, 117, 1);
            text-align: left;
          }
        }
        .data_add {
          width: auto;
          height: 60px;
          dl {
            margin: 8px auto;
            font-size: 16px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(71, 77, 120, 1);
            text-align: left;
            dd {
              color: #1eb399;
              padding-left: 5px;
              display: inline-block;
              width: 180px;
              // overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin: 0;
              a {
                color: #1eb399;
              }
            }
          }
          p {
            margin: 0 auto;
            font-size: 13px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(94, 104, 117, 1);
            text-align: left;
          }
        }
        .data_version {
          width: auto;
          height: 60px;
          dl {
            margin: 8px auto;
            font-size: 16px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(71, 77, 120, 1);
            text-align: left;
          }
        }
      }
    }
    .message_right {
      width: 53%;
      margin-left: 5%;
      .right_title {
        border: 1px solid #dcdde9;
        width: 90%;
        padding: 20px 5%;
        .right_title_l {
          p {
            font-size: 16px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(29, 31, 78, 1);
            padding-left: 15px;
          }
        }
        .right_title_r {
          padding: 6px 10px;
          // border: 1px solid #1EB399;
          background: #1eb399;
          color: #ffffff;
          cursor: pointer;
          img {
            padding-left: 5px;
          }
        }
      }
      .exchange_data {
        border: 1px solid #dcdde9;
        border-top: 0;
        width: 90%;
        padding: 20px 5%;
        .data_time {
          width: 100px;
          // height: 60px;
          padding: 0 15px;
          dl {
            margin: 8px auto 8px;
            font-size: 16px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(71, 77, 120, 1);
            text-align: left;
            word-break: break-all;
          }
          p {
            margin: 8px auto 8px;
            font-size: 13px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(94, 104, 117, 1);
            text-align: left;
          }
        }
        .data_add {
          width: auto;
          height: 60px;
          dl {
            margin: 8px auto;
            font-size: 16px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(71, 77, 120, 1);
            text-align: left;
            dd {
              color: #1eb399;
              display: inline-block;
              width: 350px;
              // overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin: 0 0 0 5px;
            }
          }
          p {
            margin: 0 auto;
            font-size: 13px;
            font-family: ArialMT;
            font-weight: 400;
            color: #1eb399;
            text-align: left;
            display: inline-block;
            width: 120px;
            margin: 0 10px;
            // overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 14px;
          }
          a {
            color: #1eb399;
          }
        }
      }
    }
  }
}
// x < 1200
@include md-lg-lt-md() {
  .indexmessage {
    .message {
      width: auto;
      display: block;
      .message_left {
        width: calc(100% - 40px);
        margin: 20px 20px 0;
        .message_data {
          display: block;
          height: 150px;
          .data_time {
            height: auto;
            padding: 10px 15px;
            margin: 0 auto 10px;
            width: 80px;
            dl {
              margin: 0 auto;
              text-align: center;
            }
            p {
              margin-top: 5px;
              text-align: center;
            }
          }
          .data_add {
            float: left;
            dd {
              width: 90%;
            }
          }
          .data_version {
            float: right;
            text-align: right;
            height: 60px;
            line-height: 60px;
            dl {
              margin: 0;
            }
          }
        }
      }
      .message_right {
        width: calc(100% - 40px);
        margin: 20px 20px 0;
        .exchange_data {
          display: block;
          .data_time {
            height: auto;
            padding: 10px 15px;
            margin: 0 auto 10px;
            width: 80px;
            dl {
              margin: 0 auto;
              text-align: center;
            }
            p {
              margin-top: 5px;
              text-align: center;
            }
          }
          img {
            display: none;
          }
          .data_time {
            background: #eef0f6;
            border-radius: 4px;
            dl {
              padding-top: 5px;
            }
          }
        }
      }
    }
  }
}
//上一版
// @include md-lg-lt-md() {
// .indexmessage {
//   .message{
//     width: auto;
//     display: block;
//     .message_left{
//       width: calc(100% - 40px);
//       margin: 20px 20px 0;
//       .message_data{
//         display: block;
//         .data_time{
//           height: auto;
//           padding: 10px 15px;
//           dl{
//             margin: 0 auto;
//           }
//         }
//         .data_add dl dd{
//           width: 90%;
//         }
//         .data_version{
//           height: auto;
//           dl{
//             margin: 0;
//           }
//         }
//       }
//     }
//     .message_right{
//       width: calc(100% - 40px);
//       margin: 20px 20px 0;
//       .exchange_data{
//         display: block;
//         .data_time{
//           height: auto;
//           padding: 10px 15px;
//           dl{
//             margin: 0 auto;
//           }
//         }
//         img{
//           display: none;
//         }
//         .data_time{
//           background: #EEF0F6;
//           border-radius: 4px;
//           dl{
//             padding-top: 5px;
//           }
//         }

//       }
//     }
//   }
// }
// }
</style>
