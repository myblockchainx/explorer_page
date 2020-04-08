<template>
  <section class="blocklistdata">
    <div class="bd_show">
      <div class="bd_show_title d-flex align-items-center justify-content-space-between">
          <div class="bd_show_title_l d-flex align-items-center justify-content-space-between">
            <img src="../../../assets/images/index/others/block_num.png">
            <p>{{list.title}}<span>{{blocknum}}</span></p>
          </div>
          <div class="blocklistdata_info">
            {{list.info}}
          </div>
        </div>
      <div class="bd_show_data">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            fixed
            :label="list.height">
            <template slot-scope="scope">
              <!-- <span style="color:#39BDA6;">{{ scope.row.number }}</span> -->
              <router-link style="color:#39BDA6" :to="{ path: 'blocklistdetail', query: { block: scope.row.height}}">{{scope.row.height}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            :label="list.time">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp  | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="list.exchange_num">
            <template slot-scope="scope">
              <span style="color:#39BDA6;">{{ scope.row.txs.length }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200px"
            :label="list.miner">
            <template slot-scope="scope">
             
              <span v-for="cre in scope.row.createdby">
                {{cre}}
              </span>
              <!-- <span style="color:#39BDA6;">{{ scope.row.miner}}</span> -->
             <!-- <router-link style="color:#39BDA6" :to="{ path: 'eaaddress', query: { address: scope.row.miner}}">{{scope.row.miner}}</router-link>-->
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="epoch"
            :label="list.epoch">
          </el-table-column> -->
          <!--<el-table-column
            prop="gasUsed"
            :label="list.gas_used">
          </el-table-column>
          <el-table-column
            prop="gasLimit"
            :label="list.gaslimit">
          </el-table-column>
          <el-table-column
            :label="list.reward">
            <template slot-scope="scope">
              <span style="color:#39BDA6;">0.5</span>
            </template>
          </el-table-column> 
          <el-table-column
            :label="list.bulk">
            <template slot-scope="scope">
              <span>{{ scope.row.size }}</span>
            </template>
          </el-table-column>-->
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
import Home from "../../../service/home";

export default {
  name: "blocklistdata",
  data() {
    return {
      total: 10, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      blocknum: "", //列表总条数
      nowtimes: "", //当前时间戳
      tableData: [],
      loading: true //loading遮罩
    };
  },
  props: ["language"],
  computed: {
    list() {
      return data[this.language || "en"].index.block_list;
    }
  },
  mounted() {
    this.totalblocks();
  },
  methods: {
    //获取blocklist信息
    async totalblocks() {
      // console.log(this.$route.query.hash);
      // this.nowtimes = parseInt(Date.parse(new Date()) / 1000);
      try {
        // let res = await Home.totalblocks(this.pagesize, 0);
        let latest = await Home.postUrl("status",[])
        let datas = await Home.blockList(0);
        
        // if (res.data.resp) {
          if (datas.data.resp.blockList) {
            this.tableData = datas.data.resp.blockList;
            // console.log("data:",this.tableData)
          }
          this.blocknum = latest.data.result.sync_info.latest_block_height;
          this.total = datas.data.resp.count;
        // }
        if (datas.status == 200) this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    created: function() {
      this.total = this.tableData.length;
    },
    async current_change(currentPage) {
      this.currentPage = currentPage;
      // let res = await Home.totalblocks( 
      //   this.pagesize,
      //   (currentPage - 1) * this.pagesize
      // );
      let res = await Home.blockList(currentPage);
      if (res.data.resp) {
        if (res.data.resp.blockList) {
          this.tableData = res.data.resp.blockList;
        }
        this.blocknum = res.data.resp.count;
        this.total = res.data.resp.count;
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

.blocklistdata {
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
      .blocklistdata_info {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #aeafbe;
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
  .page_num {
    width: 1200px;
    margin: 20px auto 0;
    text-align: right;
  }
}
@include md-lg-lt-md() {
  .blocklistdata {
    .bd_show {
      .bd_show_title {
        width: 95%;
        margin: 0 2.5%;
        display: block;
        .bd_show_title_l {
          justify-content: initial;
        }
        .blocklistdata_info {
          margin: 20px auto 10px;
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
.blocklistdata {
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
