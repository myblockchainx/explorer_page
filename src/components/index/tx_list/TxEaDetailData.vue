<template>
  <section class="txeadetaildata" v-loading="loading">
    <div class="bd_show">
      <div class="bd_show_title d-flex align-items-center justify-content-space-between">
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between">
          <img src="../../../assets/images/index/others/block_list_detail.png">
          <p>{{list.message}}</p>
        </div>
      </div>
      <div class="bd_show_data">
        <dd class="d-flex align-items-center">
          <p>{{list.hash}}</p>
          <dl class="green">{{hash}}</dl>
          <el-button class="copy_btn" type="text" size="medium"
            v-clipboard:copy="hash"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"><img src="../../../assets/images/index/others/copy.png">
          </el-button>
        </dd>
        <dd class="d-flex align-items-center" v-if="!statusShow">
          <p>{{list.block}}</p>
          <dl><span class="green">{{block}}</span>{{block_bc}}</dl>
        </dd>
        <dd class="d-flex align-items-center" v-if="!statusShow">
          <p>{{list.times}}</p>
          <dl>{{times | formatDate}}</dl>
        </dd>
        <dd class="d-flex align-items-center" v-if="!statusShow">
          <p>{{list.block_mn}}</p>
          <dl>
            <router-link :to="{ path: 'eaaddress', query: { address: miner}}" class="green cursor-pointer">{{miner}}</router-link>
          </dl>
        </dd>
        <!--<dd class="d-flex align-items-center">
          <p>{{list.status}}</p>
          <dl class="orange" v-if="statusShow">Pedding</dl>
          <dl class="green" v-if="status && !statusShow">Success</dl>
          <dl class="red" v-if="!status && !statusShow">Fail</dl>
        </dd>-->
        <dd class="d-flex align-items-center">
          <p>{{list.roll_out}}</p>
          <dl class="green cursor-pointer" @click="tokenrelay(roll_out)">{{roll_out}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.shift_to}}</p>
          <dl class="green cursor-pointer" @click="tokenrelay(shift_to)">{{shift_to}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.roll_out_money}}</p>
          <dl>{{roll_out_money}}</dl>
        </dd>
        <!--<dd class="d-flex align-items-center">
          <p>{{list.gas_limit}}</p>
          <dl>{{gas_limit}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.gas_used}}</p>
          <dl>{{gas_used}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.gas_price}}</p>
          <dl>{{gas_price}}</dl>
        </dd>
         <dd class="d-flex align-items-center">
          <p>{{list.power}}</p>
          <dl>{{power}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.np}}</p>
          <dl>{{np}}</dl>
        </dd>
        <dd class="d-flex">
          <p>{{list.data}}</p>
          <dl class="tx_data">{{data}}</dl>
        </dd> -->
      </div>
    </div>
  </section>
</template>

<script>
import data from "../../../service/data";
import Home from "../../../service/home";

export default {
  name: "txeadetaildata",
  data() {
    return {
      loading: true,
      hash: "",
      block: "",
      block_bc: "",
      times: "",
      miner: "",
      author: "",
      roll_out: "",
      shift_to: "",
      roll_out_money: "",
      gas_limit: "",
      gas_used: "",
      gas_price: "",
      power: "",
      np: "",
      statusShow: false,
      status: "",
      data: ""
    };
  },
  inject: ["reload"],
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to.query.hash != from.query.hash) {
        this.reload();
      }
    }
  },
  props: ["language"],
  computed: {
    list() {
      return data[this.language || "en"].index.tx_list;
    }
  },
  mounted() {
    this.transactionRelay();
  },
  methods: {
    //copy
    // 复制成功
    onCopy(e) {
      this.$message({
        message: "Copy Success！",
        type: "success"
      });
      console.log(e);
    },
    // 复制失败
    onError(e) {
      alert("失败");
    },
    //查询hash信息
    async transactionRelay() {
      // console.log(this.$route.query.hash);
      this.loading = true;
      try {
        let txhash = this.$route.query.hash;
        // console.log("txhash:",txhash)
        let res = await Home.transactionRelay(txhash);
        console.log("Res----:",res);
        if (JSON.stringify(res.data) == "{}") {
          this.$message.error(this.list.no_hash);
          this.$router.push("/home");
        } else {
          res = res.data.resp.tx;
          this.loading = false;
          this.hash = res.hash;
          this.block = res.height;
          // if (res.data.height != null) {
          //   this.statusShow = true;
          // } else {
          //   this.status = res.data.status;
          // }
          // this.block_bc = res.data.hash;
          this.times = res.timestamp;
          this.miner = res.createdby;
          this.roll_out = res.signer_id;
          this.shift_to = res.receiver_id;
          this.roll_out_money = res.value;
          // this.gas_limit = res.data.gas;
          // this.gas_used = res.data.gasUsed;
          // this.gas_price = res.data.gasPrice;
          // this.power = this.gas_used * this.gas_price;
          // this.np = res.data.nonce;
          // this.data = res.data.input;
          // console.log(res);
        }
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
    }
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "../../../../static/css/_util.scss";
@import "../../../../static/css/_app.scss";

.txeadetaildata {
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  .bd_show {
    .bd_show_title {
      width: 1200px;
      margin: 20px auto;
      .bd_show_title_l {
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(29, 31, 78, 1);
          padding-left: 15px;
        }
      }
      .txeadetaildata_info {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #aeafbe;
      }
    }
    .bd_show_data {
      width: 1200px;
      margin: 0 auto;
      border: 1px solid #dcdde9;
      border-top: 4px solid #22b297;
      border-bottom: 0;
      font-size: 14px;
      font-weight: 400;
      padding: 20px 0;
      &:nth-last-child(1) {
        border-bottom: 1px solid #dcdde9 !important;
      }
      dd {
        margin: 20px 40px;
      }
      p {
        width: 150px;
        margin-right: 20px;
        text-align: left;
        color: #474d78;
        font-family: MicrosoftYaHei;
        font-weight: bold;
      }
      dl {
        color: #8d9bae;
        font-family: ArialMT;
        span {
          margin-right: 10px;
        }
      }
      .green {
        color: #39bda6 !important;
      }
      .orange {
        color: #e67e22 !important;
      }
      .red {
        color: #ff0000 !important;
      }
      .tx_data {
        background: #eef0f6;
        width: 700px;
        padding: 20px;
        text-align: left;
        word-break: break-all;
      }
      .copy_btn {
        border: 0;
        background: none;
        outline: none;
        cursor: pointer;
        margin-left: 15px;
        padding: 0 20px;
      }
    }
  }
  .page_num {
    width: 1200px;
    margin: 20px auto 0;
    text-align: right;
  }
}
@include md-lg-lt-md() {
  .txeadetaildata {
    .bd_show {
      .bd_show_title {
        width: 95%;
        margin: 0 2.5% 20px;
      }
      .bd_show_data {
        width: 95%;
        margin: 0 2.5%;
        p {
          width: 120px;
        }
        dd {
          margin: 20px 10px;
        }
        dl {
          word-break: break-word;
          width: calc(100% - 140px);
          text-align: left;
        }
      }
    }
  }
}
</style>
<style lang="scss" type="text/css">
.txeadetaildata {
  .bd_show {
    .bd_show_data {
      .el-table thead {
        color: #474d78;
      }
    }
  }
}
</style>
