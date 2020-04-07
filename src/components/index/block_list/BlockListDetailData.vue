<template>
  <section class="blocklistdetaildata">
    <div class="bd_show">
      <div class="bd_show_title d-flex align-items-center justify-content-space-between">
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between">
          <img src="../../../assets/images/index/others/block_list_detail.png">
          <p>{{list.summarize}}</p>
        </div>
      </div>
      <div class="bd_show_data" v-loading="loading">
        <dd class="d-flex align-items-center">
          <p>{{list.blcok_height}}</p>
          <dl class="green">{{blcok_height}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.times}}</p>
          <dl>{{times | formatDate}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.exchange}}</p>
          <dl>{{exchange}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.hash}}</p>
          <dl>{{hash}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>Epoch Id</p>
          <dl class="green">{{epoch_id}}</dl>
        </dd>
        <!-- <dd class="d-flex align-items-center">
          <p>{{list.bolck_mn}}</p>
          <dl class="green"><router-link class="green" :to="{ path: 'eaaddress', query: { address: miner}}">{{miner}}</router-link></dl>
        </dd> -->
        <dd class="d-flex align-items-center">
          <p>{{list.bolck_mn}}</p>
          <!-- <dl class="green">{{bolck_mn}}</dl> -->
          <dl class="green"><router-link class="green" :to="{ path: 'eaaddress', query: { address: miner}}">{{miner}}</router-link></dl>
        </dd>
        <!-- <dd class="d-flex align-items-center">
          <p>{{list.epoch}}</p>
          <dl>{{epoch}}</dl>
        </dd> -->
        <dd class="d-flex align-items-center">
          <p>{{list.block_num}}</p>
          <dl>{{block_num}} </dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.gas_price}}</p>
          <dl class="green">{{gas_price}}</dl>
        </dd>
        <!--<dd class="d-flex align-items-center">
          <p>{{list.gas_limit}}</p>
          <dl class="green">{{gas_limit}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.block_reward}}</p>
          <dl class="green">{{block_reward}}</dl>
        </dd> 
        <dd class="d-flex align-items-center">
          <p>{{list.extra}}</p>
          <dl class="green">{{extra}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.baseTarget}}</p>
          <dl class="green">{{baseTarget}}</dl>
        </dd>-->
      </div>
    </div>
    <div class="bd_show" v-if="unshow">
      <div class="bd_show_title d-flex align-items-center justify-content-space-between">
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between">
          <img src="../../../assets/images/index/others/block_list_detail.png">
          <p>{{list.reward_info}}</p>
        </div>
      </div>
      <div class="bd_reward_data" v-loading="loading">
        <dd class="d-flex align-items-center">
          <h4>{{list.blockReward}}</h4>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.blockReward}}</p>
          <dl>{{blockReward}}</dl>
        </dd>
        <!-- miner -->
        <dd class="d-flex align-items-center">
          <h4>{{list.minerReward}}</h4>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.address}}</p>
          <dl class="green">{{minerAddr}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.number}}</p>
          <dl>{{minerNum}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.rate}}</p>
          <dl>83%</dl>
        </dd>
        <!-- team -->
        <dd class="d-flex align-items-center">
          <h4>{{list.teamReward}}</h4>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.address}}</p>
          <dl class="green">{{teamAddr}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.number}}</p>
          <dl>{{teamNum}}</dl>
        </dd>
        <dd class="d-flex align-items-center">
          <p>{{list.rate}}</p>
          <dl>{{teamrate}}</dl>
        </dd>
        <!-- invite -->
        <dd class="d-flex align-items-center">
          <h4>{{list.inviteReward}}</h4>
        </dd>
        <div style="width:92%;margin:0 auto;">
        <el-table
          :data="inviteData"
          style="width: 100%;">
          <el-table-column
            fixed
            width="100"
            :label="list.inviteLevel">
            <template slot-scope="scope">
              <span style="color:#39BDA6;">{{ scope.row.level }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="list.address">
            <template slot-scope="scope">
              <span style="color:#39BDA6;">{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            :label="list.number">
            <template slot-scope="scope">
              <span style="color:#39BDA6;">{{ (scope.row.rewardNum / 10 ** 18) | typefixed(10) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            :label="list.rate">
            <template slot-scope="scope">
              <span style="color:#39BDA6;">{{ (scope.row.rewardNum / 10 ** 16 / blockReward) | typefixed(2) }} %</span>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </div>
    </div>
    <div class="bd_show">
      <div class="bd_show_data">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            fixed
            :label="list.txhash">
            <template slot-scope="scope">
              <!-- <span style="color:#39BDA6;">{{ scope.row.hash }}</span> -->
              <a class="cursor-pointer" style="color:#39BDA6;" @click="transactionRelay(scope.row.hash)">{{scope.row.hash}}</a>
              <!-- <router-link style="color:#39BDA6" :to="{ path: 'txeadetail', query: { hash: scope.row.hash}}">{{scope.row.hash}}</router-link> -->
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            :label="list.extime">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="list.from">
            <template slot-scope="scope">
              <!-- <span style="color:#39BDA6;">{{ scope.row.from }}</span> -->
              <a class="cursor-pointer" style="color:#39BDA6;" @click="tokenrelay(scope.row.signer_id)">{{scope.row.signer_id}}</a>
            </template>
          </el-table-column>
          <el-table-column
            :label="list.to">
            <template slot-scope="scope">
              <div class="d-flex align-items-center datato">
                <img src="../../../assets/images/index/others/roll_out.png" />
                <!-- <span style="color:#39BDA6; text-overflow: ellipsis; overflow: hidden;">{{ scope.row.to }}</span> -->
                <div class="cell">
                  <a class="cursor-pointer" style="color:#39BDA6;" @click="tokenrelay(scope.row.receiver_id)">{{scope.row.receiver_id}}</a>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            :label="list.value">
            <template slot-scope="scope">
              <span>{{ scope.row.value  }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page_num">
      <el-pagination
        background
        @current-change="currentPage"
        :total="total"
        :page-size="pagesize"
        :pager-count="5"
        layout="prev, pager, next">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import data from "../../../service/data";
import Home from "../../../service/home";

export default {
  name: "blocklistdetaildata",
  data() {
    return {
      blcok_height: "",
      times: "",
      exchange: "",
      hash: "",
      parent: "",
      epoch_id:"",
      miner: "",
      author: "",
      epoch: "",
      block_num: "",
      gas_price: "",
      gas_limit: "",
      unshow: false,
      blockReward: "",
      minerAddr: "",
      minerNum: "",
      minerRate: "",
      inviteData: [],
      teamAddr: "",
      teamNum: "",
      teamRate: "",
      extra: "",
      baseTarget: 0,
      loading: true, //loading遮罩
      teamrate: "0",
      total: 10, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentpage: 1, //默认开始页面
      tableData: []
    };
  },
  inject: ["reload"],
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to.query.block != from.query.block) {
        this.reload();
      }
    }
  },
  props: ["language"],
  computed: {
    list() {
      return data[this.language || "en"].index.block_list;
    }
  },
  mounted() {
    this.block();
  },
  methods: {
    //查询block信息
    async block() {
      // console.log(this.$route.query.hash);
      try {
        let block = this.$route.query.block;
        let res = await Home.block(block);
        
        // let reg = await Home.blockRewardData(block);
        let tabledata = await Home.findTxByNumber(block, this.currentpage);
        
        if (res.status == 200 ) this.loading = false;
        if (JSON.stringify(res.data) == "{}") {
          this.$message.error(this.list.no_block);
          this.$router.push("/home");
        } else {
          res = res.data.resp.header;
          console.log("res:",res)
          this.blcok_height = res.height;
          this.times = res.timestamp ;
          this.exchange = res.txs.length;
          this.hash = res.hash;
          this.epoch_id = res.epoch_id;
          // this.miner = res.data.miner;
          this.miner = res.createdby;
          // this.epoch = res.data.to;
          this.block_num = res.chunks_included;
          this.gas_price = res.gas_price;
        }
        // if (
        //   !reg.data.resp.minerReward &&
        //   !reg.data.resp.teamReward &&
        //   reg.data.resp.rewardInviter.length == 0
        // ) {
        //   this.unshow = false;
        // } else {
        //   this.unshow = true;
        //   this.blockReward = (
        //     reg.data.resp.minerReward.rewardNum /
        //     10 ** 18 /
        //     0.83
        //   ).toFixed(10);
        //   this.minerAddr = reg.data.resp.minerReward.address;
        //   this.minerNum = (
        //     reg.data.resp.minerReward.rewardNum /
        //     10 ** 18
        //   ).toFixed(10);
        //   this.inviteData = reg.data.resp.rewardInviter;
        //   this.teamAddr = reg.data.resp.teamReward.address;
        //   this.teamNum = (
        //     reg.data.resp.teamReward.rewardNum /
        //     10 ** 18
        //   ).toFixed(10);
        //   this.teamrate =
        //     (Number(this.teamNum) / Number(this.blockReward) * 100).toFixed(2) +
        //     "%";
        // }
          this.tableData = tabledata.data.resp.tx;
          this.total = tabledata.data.resp.tx.count;
      } catch (e) {
        // that.$notify.error({title: that.$t("ERROR"), message: e.toString()});
        console.log(e);
      }
    },
    async currentPage(currentpage) {
      let block = this.$route.query.block;
      this.currentpage = currentpage;
      let tabledata = await Home.findTxByNumber(block, this.currentpage);
      if (tabledata.data.resp.code == 1000) {
        this.tableData = tabledata.data.resp.data.content;
        this.total = tabledata.data.resp.data.total;
      }
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

.blocklistdetaildata {
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  .bd_show {
    margin-bottom: 20px;
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
      .blocklistdetaildata_info {
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
      }
      .green {
        color: #39bda6 !important;
      }
    }
    .bd_reward_data {
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
      h4 {
        text-align: left;
        font-size: 16px;
        margin: 15px 0;
        &:nth-child(1) {
          margin: 20px 0 15px;
        }
        &:before {
          content: "";
          border-left: 3px solid #39bda6;
          padding-right: 5px;
        }
      }
      dd {
        margin: 5px 40px;
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
      }
      .green {
        color: #39bda6 !important;
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
  .blocklistdetaildata {
    .bd_show {
      .bd_show_title {
        width: 95%;
        margin: 0 2.5% 20px;
      }
      .bd_show_data {
        width: 95%;
        margin: 0 2.5%;
        p {
          width: 100px;
        }
        dd {
          margin: 20px 10px;
        }
        dl {
          word-break: break-word;
          width: calc(100% - 120px);
          text-align: left;
        }
      }
      .bd_reward_data {
        width: 95%;
        margin: 0 2.5%;
        h4 {
          text-align: left;
          font-size: 16px;
          margin: 30px 0 10px;
          &:nth-child(1) {
            margin: 10px 0 8px;
          }
        }
        p {
          width: 100px;
        }
        dd {
          margin: 5px 10px;
        }
        dl {
          word-break: break-word;
          width: calc(100% - 120px);
          text-align: left;
        }
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
.blocklistdetaildata {
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
