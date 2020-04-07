<template>
  <section class="mndata" v-loading="loading">
    <!-- <div class="mndatatitle d-flex justify-content-space-between">
      <div class="mn_title">
        <p>{{miner.mn_address}}</p>
        <dl>se000000000000000000000000000000000000000a</dl>
      </div>
    </div> -->
    <div class="mndata_first">
      <div class="message d-flex justify-content-space-between">
      <div class="message_left">
        <div class="left_title d-flex align-items-center">
          <div class="left_title_l d-flex align-items-center justify-content-space-between">
            <img src="../../assets/images/miner/mn_s.png">
            <p>{{miner.all_mn.title}}</p>
          </div>
        </div>
        <!-- 矿工数量 -->
        <div class="message_data d-flex align-items-center justify-content-space-between" >
          <div class="data_time">
            <dl>{{miner.all_mn.miner_num}}</dl>
          </div>
          <div class="data_add">
            <dl>{{miner_num}}<span>{{miner.all_mn.ge}}</span></dl>
          </div>
        </div>
        <!-- 累计燃烧 -->
        <!-- <div class="message_data d-flex align-items-center justify-content-space-between" >
          <div class="data_time">
            <dl>{{miner.all_mn.brun_total}}</dl>
          </div>
          <div class="data_add">
            <dl>{{brun_total}}</dl>
          </div>
        </div>
        <div class="message_data d-flex align-items-center justify-content-space-between" >
          <div class="data_time">
            <dl>{{miner.all_mn.yield_total}}</dl>
          </div>
          <div class="data_add">
            <dl>{{yield_total}}</dl>
          </div>
        </div> -->
      </div>
      <!-- <div class="message_right">
        <div class="right_title d-flex align-items-center">
          <div class="right_title_l d-flex align-items-center justify-content-space-between">
            <img src="../../assets/images/miner/version.png">
            <p>{{miner.version.title}}</p>
          </div>
        </div>
        <div class="exchange_data">
          <el-table
          :data="versiondata"
          style="width: 100%;">
          <el-table-column
            :label="miner.version.versions">
            <template slot-scope="scope">
              <span>{{ scope.row._id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            :label="miner.version.ratio">
            <template slot-scope="scope">
              <span>{{ scope.row.count / version_reward_add * 100}}%</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="miner.version.average">
            <template slot-scope="scope">
              <span>{{ scope.row.reward }}</span>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </div> -->
    </div>
    </div>
    <div class="bd_show">
      <div class="bd_show_title d-flex align-items-center">
          <div class="bd_show_title_l d-flex align-items-center justify-content-space-between">
            <img src="../../assets/images/miner/mn_b.png">
            <p>{{miner.all_mn.title_1}}</p>
          </div>
        </div>
      <div class="bd_show_data">
        <el-table
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            width="400"
            :label="miner.all_mn_data.id">
            <template slot-scope="scope">
              <!-- <span style="color:#39BDA6;">{{ scope.row.witness }}</span> -->
              <router-link :to="{ path: 'eaaddress', query: { address: scope.row.account_id}}" style="color:#39BDA6;" class="green cursor-pointer">{{scope.row.account_id}}</router-link>
            </template>
          </el-table-column>
          <!-- <el-table-column
            :label="miner.all_mn_data.version">
            <template slot-scope="scope">
              <span>{{ scope.row.version }}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            :label="miner.all_mn_data.block">
            <template slot-scope="scope">
              <span style="color:#39BDA6;">{{ scope.row.num_header }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            :label="miner.all_mn_data.award">
            <template slot-scope="scope">
              <span>{{ scope.row.reward | typefixed(4) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="miner.all_mn_data.brun">
            <template slot-scope="scope">
              <span>{{ scope.row.burntCoin }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="miner.all_mn_data.ratio">
            <template slot-scope="scope">
              <span>{{ scope.row.refundRate * 100 | typefixed(4) }} %</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="miner.all_mn_data.block_height"
            width="200">
            <template slot-scope="scope">
              <router-link :to="{ path: 'blocklistdetail', query: { block: scope.row.blockNumber}}"><span style="color:#39BDA6;">{{scope.row.blockNumber}}</span></router-link>
            </template> 
          </el-table-column>-->
          <!-- <el-table-column
            :label="miner.all_mn_data.average">
            <template slot-scope="scope">
              <span>{{ scope.row.avgReward }}</span>
            </template>
          </el-table-column> -->
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
import data from "../../service/data";
import Home from "../../service/home";

export default {
  name: "mndata",
  data() {
    return {
      tableData: [],
      total: 10, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      loading: true, //loading遮罩
      miner_num: "",
      brun_total: "",
      yield_total: "",
      versiondata: [],
      version_reward_add: 0
    };
  },
  props: ["language"],
  computed: {
    miner() {
      return data[this.language || "en"].miner;
    },
    account() {
      return data[this.language || "en"].account;
    },
    message() {
      return data[this.language || "en"].index.message;
    }
  },
  mounted() {
    this.witnessListData(0);
  },
  methods: {
    //查询主节点列表
    async witnessListData(page) {
      // console.log(this.$route.query.hash);
      try {
        let res = await Home.minerList(page);
        console.log("res:miner:",res)
        // console.log(mndata.data);
        if (res.status == 200) this.loading = false;
        let datas = res.data.resp;
        if (datas) {
          if (datas.accountList && datas.accountList.length > 0) {
            this.tableData = datas.accountList;
          }
          if (datas.count > 0) {
            this.total = datas.count;
            this.miner_num = datas.count;
          }
        }
        // this.tableData = res.data.resp;
        // this.total = res.data.resp.length;

        // let latedata = await Home.dataCal();
        // if (latedata.data.resp.code == 1000) {
        //   let dataCall = latedata.data.resp.data;
        //   this.miner_num = dataCall.count;
        //   this.brun_total = dataCall.burnt;
        //   this.yield_total = dataCall.reward;
        // }
        // this.versiondata = verdata.data;
      } catch (e) {
        console.log(e);
      }
    },
    async current_change(currentPage) {
      // console.log("currentPage....",currentPage)
      this.currentPage = currentPage;
      let res = await Home.minerList(this.currentPage);
      if (res.data.resp && res.data.resp.list) {
        this.tableData = res.data.resp.list;
        console.log("list....len ", res.data.resp.list.length);
        this.total = res.data.resp.count;
      }
    }
  },
  filters: {
    typefixed: function(value, num) {
      let nowrate = value;
      return nowrate;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "../../../static/css/_util.scss";
@import "../../../static/css/_app.scss";

.mndata {
  width: 100%;
  margin: 0 auto 50px;
  .mndatatitle {
    width: 1200px;
    margin: 0 auto 30px;
    align-items: flex-end;
    .mn_title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #e8eaf1;
      border: 1px solid #dcdde9;
      text-align: left;
      p {
        display: inline-block;
        margin: 0 40px 0 20px;
      }
      dl {
        color: #239e86;
        display: inline-block;
      }
    }
  }
  .mndata_first {
    margin-bottom: 40px;
    .message {
      width: 1200px;
      margin: 0 auto;
      .message_left {
        width: 100%;
        margin: 0;
        border: 1px solid #dcdde9;
        .left_title {
          border-bottom: 1px solid #dcdde9;
          background: #eef2f6;
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
            color: #239e86;
            cursor: pointer;
            img {
              padding-left: 5px;
            }
          }
        }
        .message_data {
          border-top: 0;
          width: 90%;
          padding: 30px 5% 0;
          &:last-child() {
            padding-bottom: 30px;
          }
          .data_time {
            width: 50%;
            dl {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(141, 155, 174, 1);
              text-align: left;
            }
          }
          .data_add {
            width: 50%;
            dl {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #5e6875;
              text-align: left;
              span {
                margin-left: 10px;
              }
            }
          }
        }
      }
      .message_right {
        width: 40%;
        margin-left: 5%;
        border: 1px solid #dcdde9;
        .right_title {
          border-bottom: 1px solid #dcdde9;
          background: #eef2f6;
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
            // border: 1px solid red;
            color: #239e86;
            cursor: pointer;
            img {
              padding-left: 5px;
            }
          }
        }
        .exchange_data {
          border-top: 0;
          width: 90%;
          padding: 20px 5%;
          .data_time {
            width: 100px;
            height: 60px;
            padding: 0 15px;
            dl {
              margin: 8px auto;
              font-size: 16px;
              font-family: ArialMT;
              font-weight: 400;
              color: rgba(71, 77, 120, 1);
              text-align: left;
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
                color: #239e86;
                display: inline-block;
                width: 350px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 0;
              }
            }
            p {
              margin: 0 auto;
              font-size: 13px;
              font-family: ArialMT;
              font-weight: 400;
              color: #239e86;
              text-align: left;
              display: inline-block;
              width: 120px;
              margin: 0 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 14px;
            }
          }
        }
      }
    }
  }
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
  .mndata {
    .mndatatitle {
      width: 100%;
      display: block;
      margin: 0 auto;
      .mn_title {
        height: auto;
        line-height: initial;
        width: 95%;
        margin: 0 2.5% 20px;
        p {
          margin: 10px;
        }
        dl {
          width: 90%;
          overflow: hidden;
          word-wrap: break-word;
          margin-left: 10px;
        }
      }
    }
    .mndata_first {
      margin-bottom: 30px;
      .message {
        display: block;
        width: 100%;
        .message_left {
          width: 95%;
          margin: 0 2.5% 20px;
          .message_data {
            padding: 15px 5%;
          }
        }
        .message_right {
          width: 95%;
          margin: 0 2.5%;
        }
      }
    }
    .bd_show {
      width: 95%;
      margin: 0 2.5%;
      .bd_show_title {
        width: 100%;
      }
      .bd_show_data {
        width: 95%;
        padding: 10px 2.5%;
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
.mndata {
  .bd_show {
    .bd_show_data {
      .el-table thead {
        color: #474d78;
      }
    }
  }
}
</style>
