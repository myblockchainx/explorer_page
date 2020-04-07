<template>
  <section class="txcadetaildata">
    <div class="bd_show" v-loading="loading">
      <div class="bd_show_title d-flex align-items-center">
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between" :class="p1_active?'bg_active':'bg_unactive'" @click="p1()">
          <img :src="p1_active?pic1w:pic1g">
          <p>{{list.trading_overview}}</p>
        </div>
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between" :class="p2_active?'bg_active':'bg_unactive'" @click="p2()">
          <img :src="p2_active?pic2w:pic2g">
          <p>{{list.intratransaction}}</p>
        </div>
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between" :class="p3_active?'bg_active':'bg_unactive'" @click="p3()">
          <img :src="p3_active?pic3w:pic3g">
          <p>{{list.log}}</p>
        </div>
      </div>
      <div class="bd_show_p1" v-show="p1_active">
       <div class="bd_show_data">
        <dd class="d-flex align-items-center">
          <p>{{list.hash}}</p>
          <dl class="green">{{hash}}</dl>
          <el-button class="copy_btn" type="text" size="medium"
            v-clipboard:copy="hash"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"><img src="../../../assets/images/index/others/copy.png">
          </el-button>
          <!-- <button class="copy_btn"><img src="../../../assets/images/index/others/copy.png"></button> -->
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.contract_status}}</p>
          <dl>
            <span v-show="this.contract_status == 0" style="color:#ff0000"> Fail (Error encountered during transaction !)</span>
            <span v-show="!(this.contract_status == 0) && this.block" style="color:rgb(34, 178, 151)"> Success</span>
            <span v-show="this.hash && this.block==null" style="color:#0000ff">Pending</span>
            <span v-show="!this.hash"  style="color:#ff0000"> Not exist</span>
          </dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.block}}</p>
          <dl><span class="green">{{block}}</span>{{block_bc}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.times}}</p>
          <dl>{{times * 1000 | formatDate}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.block_mn}}</p>
          <dl>
            <router-link :to="{ path: 'eaaddress', query: { address: miner}}" class="green cursor-pointer">{{miner}}</router-link>
          </dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.initiate_account}}</p>
          <dl class="green cursor-pointer" @click="tokenrelay(initiate_account)">{{initiate_account}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.exchange_money}}</p>
          <dl>{{exchange_money}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.contract_account}}</p>
          <dl>
            <span class="green cursor-pointer" @click="tokenrelay(contract_account)">{{contract_account}}</span>
            <span v-show="!verified">
              <router-link :to="{ path: 'verifycontract', query: { address: contract_account}}" style="color: rgb(38, 40, 86);font-weight:bold;">{{list.account_status_n}}</router-link>
            </span>
            <span v-show="verified">{{list.account_status_y}}</span>
          </dl>
        </dd>
        <!-- <dd class="d-flex align-items-center">
          <p></p>
          <dl class="tx_data">{{list.call_stack}}</dl>
        </dd> -->
        <dd class="d-flex align-items-center" v-show="token_null">
          <p>{{list.token_move}}</p>
          <dl class="green">{{bi}}{{list.bi}}{{erc_token}}{{list.erc_token}}</dl>
        </dd>
        <dd class="d-flex align-items-center"  v-show="token_null">
          <p></p>
          <dl class="tx_data" v-for="(item,id) in token_move" :key="id">
           From {{item.from}} To {{item.to}} For {{item.amount}} {{erc_token}}
          </dl>
        </dd>
        <dd class="d-flex align-items-center">
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
          <p>{{list.np}}</p>
          <dl>{{np}}</dl>
        </dd>
        <!-- <dd class="d-flex">
          <p>{{list.token_move}}</p>
          <dl class="tx_data">{{token_move}}</dl>
        </dd> -->
       </div>
      </div>
      <div class="bd_show_p2" v-show="p2_active">
        <div class="bd_show_data">
          <div class="contract_call d-flex align-items-center">
            <dl>The Contract Call</dl>
            <dl>From</dl>
            <dl style="width: 200px; white-space: initial; overflow: hidden; text-overflow: ellipsis;">{{initiate_account}}</dl>
            <dl>To</dl>
            <dl style="width: 200px; white-space: initial; overflow: hidden; text-overflow: ellipsis;">{{contract_account}}</dl>
            <dl>Produced {{contract_num}} Contract Transaction:</dl>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%;">
            <el-table-column
              fixed
              :label="list.hash">
              <template slot-scope="scope">
                <span style="color:#39BDA6;" class="cursor-pointer" @click="transactionRelay(scope.row.hash)">{{ scope.row.hash }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="list.block">
              <template slot-scope="scope">
                <span>{{ scope.row.blockNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="list.from">
              <template slot-scope="scope">
                <span style="color:#39BDA6;" class="cursor-pointer" @click="tokenrelay(scope.row.from)">{{ scope.row.from }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="list.to">
              <template slot-scope="scope">
                <span style="color:#39BDA6;" class="cursor-pointer" @click="tokenrelay(scope.row.to)">{{ scope.row.to }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="value"
              :label="list.value">
            </el-table-column>
          </el-table>
        </div>
        <div class="page_num">
          <el-pagination
            background
            @current-change="current_change"
            :total="total"
            :page-size="pagesize"
            :pager-count="5"
            layout="prev, pager, next">
          </el-pagination>
        </div>
      </div>
      <div class="bd_show_p3" v-show="p3_active">
        <div class="bd_show_data">
          <h4>{{list.tre_log}}</h4>
          <div class="log_box d-flex" v-for="(item,index) in txcadata" :key="index">
            <p>[<span>{{item.logIndex}}</span>]</p>
            <div class="log_box_r">
              <div class="log_row d-flex align-items-center">
                <p class="add">Address</p>
                <dl class="address green cursor-pointer" @click="tokenrelay(item.address)">{{item.address}}</dl>
                <!-- <el-dropdown size="mini" split-button type="primary">
                  <i class="el-icon-zoom-in"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>aaaaaa</el-dropdown-item>
                    <el-dropdown-item>bbbbbb</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> -->
              </div>
              <div class="log_row d-flex align-items-center">
                <p>Name</p>
                <dl>{{item.eventName}}</dl>
                <!-- <dl>AdminClaimed (<span class="black">address </span><span class="green">newAdmin</span>,<span class="black">address </span><span class="green">previousAdmin</span>)</dl> -->
              </div>
              <div class="log_row d-flex align-items-center" v-for="(topic,id) in item.topics" :key="id">
                <p>Topics</p>
                <dl>[{{id}}] <span> {{topic}} </span></dl>
              </div>
              <div class="log_row d-flex">
                <p>Data </p>
                <div class="tx_ca_dd_log">
                  <div class="tx_ca_dd_log_data">
                    <!-- <el-dropdown size="mini" split-button type="primary">
                      <i class="el-icon-zoom-in"></i>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>aaaaaa</el-dropdown-item>
                        <el-dropdown-item>bbbbbb</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <img src="../../../assets/images/index/others/tx_ca_dd_log_right.png" /> -->
                    <dl>{{item.data}}</dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import data from "../../../service/data";
import Home from "../../../service/home";
import pic1w from "../../../assets/images/index/others/trading_overview_w.png";
import pic1g from "../../../assets/images/index/others/trading_overview_g.png";
import pic2w from "../../../assets/images/index/others/intratransaction_w.png";
import pic2g from "../../../assets/images/index/others/intratransaction_g.png";
import pic3w from "../../../assets/images/index/others/log_w.png";
import pic3g from "../../../assets/images/index/others/log_g.png";

export default {
  name: "txcadetaildata",
  data() {
    return {
      p1_active: true,
      p2_active: false,
      p3_active: false,
      pic1w,
      pic1g,
      pic2w,
      pic2g,
      pic3w,
      pic3g,
      loading: true, //loading遮罩
      verified: false, //判断合约是否验证
      //1
      hash: "",
      contract_status: "",
      block: "",
      block_bc: "",
      times: "",
      miner: "",
      author: "",
      initiate_account: "",
      exchange_money: "",
      contract_account: "",
      bi: "",
      erc_token: "",
      token_move: [],
      gas_limit: "",
      gas_used: "",
      gas_price: "",
      np: "",
      data: "",
      //2
      tableData: [],
      total: 10, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      contract_num: "",
      token_null: false,
      //3
      txcadata: []
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
    this.hashInfo();
  },
  methods: {
    p1() {
      this.p1_active = true;
      this.p2_active = false;
      this.p3_active = false;
    },
    async p2() {
      this.p1_active = false;
      this.p2_active = true;
      this.p3_active = false;
      let txhash = this.$route.query.hash;
      let p2 = await Home.Txinnertx(txhash, 0);
      this.tableData = p2.data;
      // console.log(p2.data);
      // console.log(p2);
      // this.contract_num = p2.data.length;
      // this.tableData = res.data;
    },
    async p3() {
      this.p1_active = false;
      this.p2_active = false;
      this.p3_active = true;
      let txhash = this.$route.query.hash;
      let res = await Home.eventLog(txhash);
      this.txcadata = res.data;
    },
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
    async hashInfo() {
      // console.log(this.$route.query.hash);
      try {
        let txhash = this.$route.query.hash;
        let res = await Home.transactionRelay(txhash);
        if (res.status == 200) this.loading = false;
        // console.log(res);
        // console.log(JSON.stringify(res.data));
        if (JSON.stringify(res.data) == "{}") {
          this.$message.error(this.list.no_hash);
          this.$router.push("/home");
        } else {
          this.hash = res.data.hash;
          this.contract_status = res.data.status;
          this.block = res.data.blockNumber;
          this.times = res.data.timestamp;
          this.miner = res.data.miner;
          this.initiate_account = res.data.from;
          this.exchange_money = (res.data.value / 10 ** 18).toFixed(4);
          this.contract_account = res.data.contractAddr;
          if (res.data.tokenTransfer) this.bi = res.data.tokenTransfer.length;
          // console.log(res.data.tokenTransfer);
          //代币名称
          let name = await Home.tokenrelay(res.data.contractAddr);
          // console.log(name);
          if (this.bi > 0) this.token_null = true;
          this.erc_token = name.data.name;
          // this.erc_token = res.data.tokenName;
          this.token_move = res.data.tokenTransfer;
          this.gas_limit = res.data.gas;
          this.gas_used = res.data.gasUsed;
          this.gas_price = res.data.gasPrice;
          this.np = res.data.nonce;
          this.data = res.data.input;
          this.block = res.data.blockNumber;
          let reg = await Home.tokenrelay(res.data.contractAddr);
          if (reg.data != "" || reg.data != null) {
            if (reg.data.isVerified) this.verified = true;
            else this.verified = false;
          } else {
            this.verified = false;
          }
        }
      } catch (e) {
        // that.$notify.error({title: that.$t("ERROR"), message: e.toString()});
        console.log(e);
      }
    },
    async current_change(currentPage) {
      this.currentPage = currentPage;
      let res = await Home.Txinnertx(this.txhash, currentPage - 1);
      this.tableData = res.data;
    },
    //判断是否为合约账户或者外部账户
    async tokenrelay(address) {
      this.loading = true;
      try {
        let res = await Home.tokenrelay(address);
        if (res.status == 200) this.loading = false;
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
      this.loading = true;
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

.txcadetaildata {
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  .bd_show {
    .bd_show_title {
      width: 1200px;
      margin: 20px auto 0;
      .bd_show_title_l {
        padding: 10px 20px;
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(29, 31, 78, 1);
          padding-left: 15px;
        }
      }
      .bg_active {
        background: #22b297;
        font-size: 15px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        cursor: pointer;
        p {
          color: #ffffff;
        }
      }
      .bg_unactive {
        background: none;
        font-size: 15px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        cursor: pointer;
        p {
          color: #98a1ab;
        }
      }
      .txcadetaildata_info {
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
      .tx_data {
        background: #eef0f6;
        width: 700px;
        padding: 20px;
        text-align: left;
        word-break: break-word;
      }
      .copy_btn {
        border: 0;
        background: none;
        outline: none;
        cursor: pointer;
        margin-left: 20px;
        padding: 0;
      }
    }
    .bd_show_p2 {
      margin: 0 auto;
      .bd_show_data {
        padding: 0;
        border-bottom: 0;
        .contract_call {
          padding: 12px 10px;
          background: #eef0f6;
          border-bottom: 1px solid #dcdde9;
          dl {
            margin-right: 25px;
          }
        }
      }
    }
    .bd_show_p3 {
      h4 {
        font-size: 16px;
        text-align: left;
        padding: 0 10px;
        margin: 20px auto;
      }
      .bd_show_data {
        .log_box {
          margin-left: 10px;
          p {
            width: 60px;
            text-align: left;
          }
          .log_box_r {
            .log_row {
              margin-bottom: 20px;
              p {
                color: #8d9bae;
                font-weight: normal;
              }
              dl {
                margin-right: 10px;
              }
              .tx_ca_dd_log_data {
                margin-bottom: 20px;
                text-align: left;
                width: 50%;
                word-break: break-all;
                img {
                  margin: 0 10px;
                }
                dl {
                  display: inline-block;
                }
              }
              .add {
                color: #239e86;
                font-weight: bold;
              }
              .black {
                color: #239e86;
                margin: 0;
              }
              .green {
                margin: 0;
              }
              .address {
                margin-right: 20px;
              }
            }
          }
        }
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
  .txcadetaildata {
    .bd_show {
      .bd_show_title {
        width: 95%;
        margin: 0 2.5%;
        .bd_show_title_l {
          p {
            font-size: 14px;
            padding: 0;
          }
          img {
            display: none;
          }
        }
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
        .tx_data {
          width: 100%;
        }
      }
      .bd_show_p2 {
        .bd_show_data {
          .contract_call {
            display: block;
            text-align: left;
            dl {
              margin-right: 10px;
              width: auto;
              display: inline-block;
            }
          }
        }
      }
      .bd_show_p3 {
        .bd_show_data {
          .log_box {
            display: block;
            .log_box_r {
              margin-top: 10px;
              .log_row {
                align-items: flex-start;
                .el-dropdown {
                  width: 100px;
                }
                .tx_ca_dd_log {
                  width: calc(100% - 140px);
                  .tx_ca_dd_log_data {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    img {
                      height: 8px;
                      width: auto;
                    }
                    dl {
                      width: 100%;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .page_num {
        width: 100%;
        text-align: left;
      }
    }
  }
}
</style>
<style lang="scss" type="text/css">
.txcadetaildata {
  .bd_show {
    .bd_show_data {
      .el-table thead {
        color: #474d78;
      }
      .el-button--primary {
        background: none;
        border: 1px solid #8f98a1;
        color: #8f98a1;
      }
    }
  }
}
</style>
