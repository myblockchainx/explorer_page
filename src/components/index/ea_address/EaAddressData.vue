<template>
  <section class="ea_address_data" v-loading="loading">
    <div class="bd_show">
      <div class="bd_show_title d-flex align-items-center justify-content-space-between">
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between">
          <img src="../../../assets/images/index/others/account_profile.png">
          <p>{{add.title}}</p>
        </div>
      </div>
      <div class="bd_show_data_first d-flex align-items-center justify-content-space-between">
        <div class="bd_show_data_first_l">
          <dd class="d-flex align-items-center">
            <p>{{add.account_add}}</p>
            <dl class="green">{{account_add}}</dl>
            <el-button class="copy_btn" type="text" size="medium"
              v-clipboard:copy="account_add"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"><img src="../../../assets/images/index/others/copy.png">
            </el-button>
          </dd>
          <!-- <dd class="d-flex align-items-center">
            <p>{{add.now_mn_id}}</p>
            <dl>{{now_mn_id}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <p>{{add.mn_status}}</p>
            <dl>{{mn_status}}</dl>
          </dd> -->
          <dd class="d-flex align-items-center">
            <p>{{add.yue}}</p>
            <dl>{{yue}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <p>{{add.account_type}}</p>
            <dl>{{account_type}}</dl>
          </dd>
          <!-- <dd class="d-flex align-items-center" v-if="minerShow">
            <p>{{add.account_level}}</p>
            <dl>{{account_level}}</dl>
          </dd>
          <dd class="d-flex align-items-center" v-if="minerShow">
            <p>{{add.nonce_count}}</p>
            <dl style="width:30%;text-align:left;" @click="showtips">{{nonce_count}} &nbsp;&nbsp;(&nbsp;{{maxStorage}}&nbsp;T&nbsp;)&nbsp;&nbsp;&nbsp;<span style="background: #87f7cf;color: #3e3bdc; border-radius: 10px; padding:5px; display: inline-block;font-size: 12px;" >提示</span></dl>
          </dd>
          <dd class="d-flex align-items-center" v-if="minerShow">
            <p>{{add.block_count}}</p>
            <dl>{{block_count}}</dl>
          </dd>
          <dd class="d-flex align-items-center" v-if="minerShow">
            <p>{{add.CBase_num}}</p>
            <dl>{{CBase_num}}</dl>
          </dd> -->
          <!-- <dd class="d-flex align-items-center" v-if="minerShow">
            <p>{{add.reward_num}}</p>
            <dl>{{reward_num}}</dl>
          </dd>  -->
          <!-- <dd class="d-flex align-items-center" v-if="minerShow">
            <p>{{add.burn_num}}</p>
            <dl>{{burn_num}}</dl>
          </dd>
          <dd class="d-flex align-items-center" v-if="minerShow">
            <p>{{add.pid}}</p>
            <dl>{{pid}}</dl>
          </dd> -->
          <dd class="d-flex align-items-center">
            <p>{{add.historical_transaction_number}}</p>
            <dl>{{historical_transaction_number}}</dl>
          </dd>
        </div>
        <div class="bd_show_data_first_r">
          <vue-qr :text="account_add" :size="140"></vue-qr>
        </div>
      </div>
    </div>
    <!--  -->
    <!-- <div class="bd_show">
      <div class="bd_show_title d-flex align-items-center justify-content-space-between">
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between">
          <img src="../../../assets/images/index/others/historical_exchange.png">
          <p style="cursor: pointer;" @click="historylogshow()">{{add.historical_exchange}}</p>
          <p v-if="minerShow">/</p>
          <p style="cursor: pointer;" v-if="minerShow" @click="minerlogShow()">{{add.block_logs}}</p>
          <p v-if="minerShow">/</p>
          <p style="cursor: pointer;" v-if="minerShow" @click="yieldlogShow()">{{add.benefit_logs}}</p>
        </div>
      </div>
    </div> -->
    <!-- <div class="bd_show" v-if="historyshow">
      <div class="bd_show_data">
        <el-table
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            fixed
            :label="add.hash">
            <template slot-scope="scope">
              <span style="color:#39BDA6;" class="cursor-pointer" @click="transactionRelay(scope.row.hash)">{{ scope.row.hash }}</span>
              <span v-if="scope.row.status == 0" class="fail">fail !</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.block">
            <template slot-scope="scope">
              <router-link :to="{ path: 'blocklistdetail', query: { block: scope.row.blockNumber}}"><span style="color:#39BDA6;">{{scope.row.blockNumber}}</span></router-link>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.author">
            <template slot-scope="scope">
              <router-link :to="{ path: 'eaaddress', query: { address: scope.row.author}}" class="green cursor-pointer">{{scope.row.author}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.time">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp * 1000 | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.roll_out">
            <template slot-scope="scope">
              <a class="cursor-pointer" style="color:#39BDA6;" @click="tokenrelay(scope.row.from)" :disabled="isDisable">{{scope.row.from}}</a>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.shift_to">
            <template slot-scope="scope">
              <a class="cursor-pointer" style="color:#39BDA6;" @click="tokenrelay(scope.row.to)" :disabled="isDisable">{{scope.row.to}}</a>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.yue_change">
            <template slot-scope="scope">
              <p :class="(account_add == scope.row.to)?'green':'orange'">
                <span v-show="account_add == scope.row.to && scope.row.value != 0">+</span>
                <span v-show="account_add == scope.row.from && scope.row.value != 0">-</span>
                {{ (scope.row.value / 10 ** 18).toFixed(4) }}
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div> -->
    <!-- <div class="page_num" v-if="historyshow">
      <el-pagination
        background
        @current-change="current_change"
        :total="total"
        :page-size="pagesize"
        :pager-count="5"
        layout="prev, pager, next">
      </el-pagination>
    </div> -->
    <!-- logs -->
    <!-- <div class="bd_show" v-if="minerDataShow" v-loading="logload">
      <div class="bd_show_data">
        <el-table
          :data="logsData"
          style="width: 100%;">
          <el-table-column
            fixed
            :label="add.block">
            <template slot-scope="scope">
              <router-link :to="{ path: 'blocklistdetail', query: { block: scope.row.blockNumber}}"><span style="color:#39BDA6;">{{scope.row.blockNumber}}</span></router-link>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.account_add">
            <template slot-scope="scope">
              <router-link :to="{ path: 'eaaddress', query: { address: scope.row.address}}" class="green cursor-pointer">{{scope.row.address}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.number">
            <template slot-scope="scope">
              <span>{{ (scope.row.rewardNum / 10 ** 18) | typefixed(10)}} ( {{ scope.row.rewardNum_rate}} %)</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.number_invite">
            <template slot-scope="scope">
              <span>{{ (scope.row.inviteReward / 10 ** 18) | typefixed(10)}} ( {{ scope.row.inviteReward_rate}} %)</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.number_team">
            <template slot-scope="scope">
              <span>{{ (scope.row.teamReard / 10 ** 18) | typefixed(10)}} ( {{ scope.row.teamReard_rate}} %)</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.time">
            <template slot-scope="scope">
              <span>{{ new Date(scope.row.createAt).getTime() | formatDate }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page_num" v-if="minerDataShow" v-loading="logload">
      <el-pagination
        background
        @current-change="logs_current_change"
        :total="logs_total"
        :page-size="logs_pagesize"
        :pager-count="5"
        layout="prev, pager, next">
      </el-pagination>
    </div> -->
    <!-- yield -->
    <div class="bd_show" v-if="yieldShow" v-loading="yieldload">
      <div class="bd_show_data">
        <el-table
          :data="yieldData"
          style="width: 100%;">
          <el-table-column
            fixed
            type="index"
            :index="indexMethod"
            :label="add.no">
          </el-table-column>
          <el-table-column
            :label="add.type">
            <template slot-scope="scope">
              <span>{{ scope.row.rewardType == 0 ? add.blockreward : add.invitereward }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.number">
            <template slot-scope="scope">
              <span>{{ (scope.row.rewardNum / 10 ** 18) | typefixed(10) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.date">
            <template slot-scope="scope">
              <span>{{ scope.row.createAt }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="add.height">
            <template slot-scope="scope">
              <span>{{ scope.row.blockNumber }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page_num" v-if="yieldShow" v-loading="logload">
      <el-pagination
        background
        @current-change="yield_current_change"
        :total="yield_total"
        :page-size="yield_pagesize"
        :pager-count="5"
        layout="prev, pager, next">
      </el-pagination>
    </div>
    <modal 
      title="提示" 
      :content='modalContent'
      :showCancle='showCancle' 
      @on-confirm='confirm'
      v-show='showModal'>
    </modal>
  </section>
  
</template>

<script>
import VueQr from "vue-qr";
import data from "../../../service/data";
import Home from "../../../service/home";
import { setTimeout } from "timers";

export default {
  name: "ea_address_data",
  components: {
    VueQr
  },
  inject: ["reload"], //注入 reload 方法
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to.query.address != from.query.address) {
        this.reload(); //重新加载数据
      }
    }
  },
  data() {
    return {
      total: 10, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      logs_total: 10, //默认数据总数
      logs_pagesize: 10, //每页的数据条数
      logs_currentPage: 1, //默认开始页面
      yield_total: 10, //默认数据总数
      yield_pagesize: 10, //每页的数据条数
      yield_currentPage: 1, //默认开始页面
      nowaddress: '',
      code_url: "",
      account_add: "",
      // now_mn_id: "",
      // mn_status: "",
      yue: 0,
      minerShow: false,
      account_type: "",
      account_level: "",
      nonce_count: "",
      CBase_num: "",
      reward_num: "",
      block_count: 0,
      burn_num: "",
      pid:"",
      historical_transaction_number: "",
      tableData: [],
      logsData: [],
      yieldData: [],
      loading: true, //loading遮罩
      logload: false,
      yieldload: false,
      isDisable: false, //表单重复提交
      historyshow: true,
      minerDataShow: false,
      yieldShow: false,
      showCancle: false,
      modalContent: '请点击窗口右上角发送到好友或朋友圈来赠送给好友',
      showModal: false,
    };
  },
  props: ["language"],
  computed: {
    add() {
      return data[this.language || "en"].index.ea_address;
    }
  },
  mounted() {
    this.addrress();
  },
  methods: {
    confirm(){
      this.showModal = false;
    },
    //copy
    // 复制成功
    onCopy(e) {
      this.$message({
        message: "Copy Success！",
        type: "success"
      });
      // console.log(e);
    },
    // 复制失败
    onError(e) {
      alert("失败");
    },
    //获取address信息
    async addrress() {
      // console.log(this.$route.query.hash);
      try {
        
        let address = this.$route.query.address;
        let accountMesg = await Home.getAccountById(address);
        accountMesg = accountMesg.data.resp.account;
        this.yue = accountMesg.amount;
        if(accountMesg.isValidator){
          this.account_type = this.add.kg;
        }else{
          this.account_type = this.add.pt;
        }
        this.historical_transaction_number = accountMesg.tx_account;

        // this.nowaddress = this.$route.query.address;
        // this.getBalance(address);
        // let addrtx = await Home.addrTXcounts(address);
        // this.total = addrtx.data.count;
        // let minerinfo = await Home.minerInfo(address);
        // let minerRewardData = await Home.minerRewardList(address);
        // if (minerinfo.data.resp != null) {
        //   let benefit = await Home.getBenefitData(address, this.yield_currentPage);
        //   this.yieldData = benefit.data.resp.list;
        //   this.yield_total = benefit.data.resp.count;
        // }
        // let rewardData = minerRewardData.data.resp;
        // // console.log("rewardData...",rewardData)
        // if (rewardData) {
        //   if (rewardData.count > 0) {
        //     this.logs_total = rewardData.count;
        //   }
        //   if (rewardData.list && rewardData.list.length > 0) {
        //     this.logsData = rewardData.list;
        //   }
        // }

        // if (minerinfo.data.resp != null) {
        //   this.minerShow = true;
        //   // this.account_type = this.add.kg;
        //   this.account_level = minerinfo.data.resp.level;
        //   this.maxStorage = minerinfo.data.resp.maxStorage;
        //   this.nonce_count = minerinfo.data.resp.maxStorage * 1000 * 1000 *4
        //   this.CBase_num = minerinfo.data.resp.burntCoin;
        //   this.reward_num = minerinfo.data.resp.reward;
        //   this.burn_num = minerinfo.data.resp.author;
        //   this.pid = BigInt("0x"+String(this.burn_num).substring(26),16).toString()
        //   this.block_count = minerinfo.data.resp.blockCount;
        // } else {
        //   this.minerShow = false;
        //   // this.account_type = this.add.pt;
        // }
        // let res = await Home.addr(address, this.total, 1, 1, this.pagesize, 0);
        // if (JSON.stringify(res.data) == "{}") {
        //   this.$message.error(this.add.no_hash);
        //   this.$router.push("/home");
        // }
        // console.log(res.data.data.length);
        this.account_add = address;
        // this.tableData = res.data.data;
        // this.code_url = address;
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    historylogshow() {
      let that = this;
      that.historyshow = true;
      that.minerDataShow = false;
      that.yieldShow = false;
    },
    minerlogShow() {
      let that = this;
      that.historyshow = false;
      that.minerDataShow = true;
      that.yieldShow = false;
    },
    yieldlogShow() {
      let that = this;
      that.historyshow = false;
      that.minerDataShow = false;
      that.yieldShow = true;
    },
    // async current_change(currentPage) {
    //   this.currentPage = currentPage;
    //   let res = await Home.addr(
    //     this.account_add,
    //     this.total,
    //     1,
    //     1,
    //     this.pagesize,
    //     (currentPage - 1) * this.pagesize
    //   );
    //   this.tableData = res.data.data;
    // },
    async logs_current_change(logscurrentPage) {
      let that = this;
      let address = this.$route.query.address;
      this.logs_currentPage = logscurrentPage;
      this.logload = true;
      let minerRewardList = await Home.minerRewardList(
        address,
        this.logs_currentPage
      );

      let rewardData = minerRewardList.data.resp;
      if (rewardData) {
        if (rewardData.list && rewardData.list.length > 0) {
          that.logsData = rewardData.list;
          that.logload = false;
        }
      }
    },
    async yield_current_change(yieldcurrentPage) {
      let that = this;
      let address = this.$route.query.address;
      this.yield_currentPage = yieldcurrentPage;
      this.yieldload = true;
      let yieldList = await Home.getBenefitData(
        address,
        this.yield_currentPage
      );

      let rewardData = yieldList.data.resp;
      if (rewardData) {
        if (rewardData.list && rewardData.list.length > 0) {
          that.yieldData = rewardData.list;
          that.yieldload = false;
        }
      }
    },
    indexMethod(index) {
      let that = this;
      return (index + 1) + (that.yield_currentPage - 1) * 10;
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
    },
    showtips(){
      this.modalContent = String(this.nonce_count); 
      this.showModal = true;
    },
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
    },
    typefixed: function(value, num) {
      let nowrate = value.toFixed(num);
      return nowrate;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "../../../../static/css/_util.scss";
@import "../../../../static/css/_app.scss";

.ea_address_data {
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
      .ea_address_data_info {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #aeafbe;
      }
    }
    .bd_show_data_first {
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
        width: 180px;
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
      .tx_data {
        background: #eef0f6;
        width: 700px;
        padding: 20px;
        text-align: left;
      }
      .copy_btn {
        border: 0;
        background: none;
        outline: none;
        cursor: pointer;
        margin-left: 20px;
        padding: 0 20px;
      }
      .bd_show_data_first_l {
        margin: 0;
      }
      .bd_show_data_first_r {
        width: 50%;
        text-align: center;
        margin: 0 auto;
      }
    }
    .bd_show_data {
      width: 1200px;
      margin: 0 auto;
      border: 1px solid #dcdde9;
      border-bottom: 0;
      &:nth-last-child(1) {
        border-bottom: 1px solid #dcdde9 !important;
      }
    }
  }
  .green {
    color: #39bda6 !important;
  }
  .orange {
    color: #e67e22;
  }
  .page_num {
    width: 1200px;
    margin: 20px auto 0;
    text-align: right;
  }
}
@include md-lg-lt-md() {
  .ea_address_data {
    .bd_show {
      .bd_show_title {
        width: 95%;
        margin: 20px 2.5%;
      }
      .bd_show_data_first {
        width: 95%;
        margin: 0 2.5%;
        display: block;
        dd {
          margin: 20px 10px;
        }
        dl {
          word-break: break-all;
        }
      }
      .bd_show_data {
        width: 95%;
        margin: 0 2.5%;
      }
    }
    .page_num {
      width: 100%;
      text-align: left;
    }
  }
}
</style>
<style lang="scss" type="text/css">
.ea_address_data {
  .bd_show {
    .bd_show_data {
      .el-table thead {
        color: #474d78;
      }
      .el-table .cell {
        word-break: normal;
      }
    }
  }
}
</style>
