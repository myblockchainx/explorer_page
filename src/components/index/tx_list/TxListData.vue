<template>
  <section class="txlistdata">
    <div class="bd_show">
      <div class="bd_show_title d-flex align-items-center">
          <div class="bd_show_title_l d-flex align-items-center justify-content-space-between">
            <img src="../../../assets/images/index/others/tx_exchange.png">
            <p>{{list.title}}<span>{{blocknum}}</span> From : <input ref="frominput" type="text"/> &nbsp;To : <input ref="toinput" type="text"/> &nbsp;<button @click="confirminput" class="txconfirm">{{list.confirm}}</button></p>
          </div>
          <div class="txlistdata_info">
            <!-- {{list.info}}<span>123</span>{{list.num}} -->
          </div>
        </div>
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
            prop="height"
            :label="list.block">
          </el-table-column>
          <el-table-column
            width="180"
            :label="list.time">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp  | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            :label="list.from">
            <template slot-scope="scope">
              <!-- <span style="color:#39BDA6;">{{ scope.row.from }}</span> -->
              <a class="cursor-pointer" style="color:#39BDA6;" @click="tokenrelay(scope.row.signer_id)" :disabled="isDisable">{{scope.row.signer_id}}</a>
            </template>
          </el-table-column>
          <el-table-column
            width="220"
            :label="list.to">
            <template slot-scope="scope">
              <div class="d-flex align-items-center datato">
                <img src="../../../assets/images/index/others/roll_out.png" />
                <!-- <span style="color:#39BDA6; text-overflow: ellipsis; overflow: hidden;">{{ scope.row.to }}</span> -->
                <div class="cell">
                  <a class="cursor-pointer" style="color:#39BDA6;" @click="tokenrelay(scope.row.receiver_id)" :disabled="isDisable">{{scope.row.receiver_id}}</a>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="list.value">
            <template slot-scope="scope">
              <span>{{ scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="list.miner">
            <template slot-scope="scope">
              <span style="color:#39BDA6;" v-for="cre in scope.row.createdby" :key="cre">{{cre }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
  </section>
</template>

<script>
import data from "../../../service/data";
import Home from "../../../service/Home";

export default {
  name: "txlistdata",
  data() {
    return {
      total: 10, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      blocknum: "", //列表总条数
      nowtimes: "", //当前时间戳
      tableData: [],
      loading: true, //loading遮罩
      isDisable: false, //表单重复提交
    };
  },
  props: ["language"],
  computed: {
    list() {
      return data[this.language || "en"].index.tx_list;
    }
  },
  mounted() {
    this.totaltx({},this.pagesize,0);
  },
  methods: {
    validInputOption(){
      let from = this.$refs.frominput.value;
      let to = this.$refs.toinput.value;
      let option = {};
      if(from && from.length == 42 && from.indexOf("0x")!=-1){
        option.from = from;
      }
      if(to && to.length == 42 && to.indexOf("0x")!=-1){
        option.to = to;
      }
      return option;
    },
    confirminput(){
      this.totaltx(this.validInputOption(),this.pagesize,0);
    },
    //获取blocklist信息
    async totaltx(options,pagesize,page) {
      // console.log(this.$route.query.hash);
      // this.nowtimes = parseInt(Date.parse(new Date()) / 1000);
      try {
        let res = await Home.totaltx(options,pagesize,page);
        let txList = await Home.txList();
        console.log("tx:",txList.data.resp.txList)
        // console.log("res:",res.data)
        // console.log(res);
        this.tableData = txList.data.resp.txList;
        this.blocknum = txList.data.resp.count;
        this.total = txList.data.resp.count;
        if (res.status == 200) this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    created: function() {
      this.total = this.tableData.length;
    },
    async current_change(currentPage) {
      this.currentPage = currentPage;
      
      let res = await Home.totaltx(
        this.validInputOption(),
        this.pagesize,
        (currentPage - 1) * this.pagesize
      );
      this.tableData = res.data.content;
      this.blocknum = res.data.total;
      this.total = res.data.total;
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
      // this.loading = true;
      try {
        let res = await Home.transactionRelay(tx);
        if (res.status == 200) this.loading = false;
        // console.log(res.data.contractLable);
        if (res.data.contractLable) {
          this.$router.push({path: 'txcadetail', query: {hash: tx}});
        } else {
          this.$router.push({path: 'txeadetail', query: {hash: tx}});
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

.txconfirm {
color: #2a48de;
    border: 0;
    background: #c0f996;
    border-radius: 7px;
    font-size: 15px;
}

.txlistdata {
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  .bd_show {
    .bd_show_title {
      width: 1200px;
      margin: 20px auto;
      .bd_show_title_l {
        margin-right: 30px;
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: rgba(29, 31, 78, 1);
          padding-left: 15px;
          span {
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(29, 31, 78, 1);
          }
        }
      }
      .txlistdata_info {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #1d1f4e;
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
      .datato {
        img {
          margin-right: 10px;
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
  .txlistdata {
    .bd_show {
      .bd_show_title {
        width: 95%;
        margin: 20px 2.5%;
      }
      .bd_show_data {
        width: 95%;
        margin: 0 2.5%;
        .datato img {
          display: none;
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
.txlistdata {
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
