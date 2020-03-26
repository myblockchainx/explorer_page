<template>
  <section class="ca_address_data"  v-loading="loading">
    <div class="bd_show">
      <div class="by_at">
        <dd>{{caaddress.created_by}}</dd>
        <span v-show="by">{{by}}</span>
        {{caaddress.at_txn}}
        <span v-show="at">{{at}}</span>
      </div>
    </div>
    <div class="bd_show">
      <div class="bd_show_title d-flex align-items-center justify-content-space-between">
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between">
          <img src="../../../assets/images/index/others/account_profile.png">
          <p>{{caaddress.title}}</p>
        </div>
      </div>
      <div class="bd_show_data_first d-flex align-items-center justify-content-space-between">
        <div class="bd_show_data_first_l">
          <dd class="d-flex align-items-center">
            <p>{{caaddress.account_add}}</p>
            <dl class="green">{{account_add}}</dl>
            <el-button class="copy_btn" type="text" size="medium"
              v-clipboard:copy="account_add"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"><img src="../../../assets/images/index/others/copy.png">
            </el-button>
          </dd>
          <dd class="d-flex align-items-center">
            <p>{{caaddress.yue}}</p>
            <dl>{{yue}}</dl>
          </dd>
         <!-- <dd class="d-flex align-items-center">
            <p>{{caaddress.account_type}}</p>
            <dl>{{account_type}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <p>{{caaddress.account_level}}</p>
            <dl>{{account_level}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <p>{{caaddress.seek_num}}</p>
            <dl>{{seek_num}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <p>{{caaddress.historical_transaction_number}}</p>
            <dl>{{historical_transaction_number}}</dl>
          </dd> -->
        </div>
        <div class="bd_show_data_first_r">
          <vue-qr :text="account_add" :size="140"></vue-qr>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="bd_show">
      <div class="bd_show_title bd_show_title_p d-flex align-items-center">
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between" :class="p1_active?'bg_active':'bg_unactive'" @click="p1()">
          <p>{{caaddress.regular_way}}</p>
        </div>
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between" :class="p2_active?'bg_active':'bg_unactive'" @click="p2()">
          <p>{{caaddress.internal_transaction}}</p>
        </div>
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between" :class="p3_active?'bg_active':'bg_unactive'" @click="p3()">
          <p>{{caaddress.contract_code}}</p>
        </div>
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between" v-show="erc" :class="p4_active?'bg_active':'bg_unactive'" @click="p4()">
          <p>{{caaddress.erc}}</p>
        </div>
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between" v-show="erc" :class="p5_active?'bg_active':'bg_unactive'" @click="p5()">
          <p>{{caaddress.token_exchange}}</p>
        </div>
      </div>
      <!-- p1 -->
      <div class="bd_show_p1" v-show="p1_active">
        <div class="bd_show_data">
          <el-table
            :data="tableData"
            style="width: 100%;">
            <el-table-column
              fixed
              :label="caaddress.hash">
              <template slot-scope="scope">
                <span style="color:#39BDA6;" class="cursor-pointer" @click="transactionRelay(scope.row.hash)">{{ scope.row.hash }}</span>
                <span v-if="scope.row.status == 0" class="fail">fail !</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.block">
              <template slot-scope="scope">
                <span>{{ scope.row.blockNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.mn_id">
              <template slot-scope="scope">
                <!-- <span style="color:#39BDA6;">{{ scope.row.witness}}</span> -->
                <router-link :to="{ path: 'eaaddress', query: { address: scope.row.witness}}" class="green cursor-pointer">{{scope.row.witness}}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.time">
              <template slot-scope="scope">
                <span>{{ scope.row.timestamp * 1000 | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.roll_out">
              <template slot-scope="scope">
                <span style="color:#39BDA6;" class="cursor-pointer" @click="tokenrelay(scope.row.from)">{{ scope.row.from }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.shift_to">
              <template slot-scope="scope">
                <span style="color:#39BDA6;" class="cursor-pointer" @click="tokenrelay(scope.row.to)">{{ scope.row.to }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.yue_change">
              <template slot-scope="scope">
              <p :class="(account_add == scope.row.to)?'green':'orange'">
                <span v-show="account_add == scope.row.to && scope.row.value != 0">+</span>
                <span v-show="account_add == scope.row.from && scope.row.value != 0">-</span>
                {{ scope.row.value }}
              </p>
            </template>
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
      <!-- p2 -->
      <div class="bd_show_p2" v-show="p2_active">
        <div class="bd_show_data">
          <el-table
            :data="tableData2"
            style="width: 100%;">
            <el-table-column
              fixed
              :label="caaddress.hash">
              <template slot-scope="scope">
                <span style="color:#39BDA6;" class="cursor-pointer" @click="transactionRelay(scope.row.hash)">{{ scope.row.hash }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.block">
              <template slot-scope="scope">
                <span>{{ scope.row.blockNumber }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column
              :label="caaddress.mn_id">
              <template slot-scope="scope">
                <span style="color:#39BDA6;">{{ scope.row.witness}}</span>
              </template>
            </el-table-column> -->
            <el-table-column
              :label="caaddress.time">
              <template slot-scope="scope">
                <span>{{ scope.row.timestamp * 1000 | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.roll_out">
              <template slot-scope="scope">
                <span style="color:#39BDA6;" class="cursor-pointer" @click="tokenrelay(scope.row.from)">{{ scope.row.from }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.shift_to">
              <template slot-scope="scope">
                <span style="color:#39BDA6;" class="cursor-pointer" @click="tokenrelay(scope.row.to)">{{ scope.row.to }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.yue_change">
              <template slot-scope="scope">
              <p :class="(account_add == scope.row.to)?'green':'orange'">
                <span v-show="account_add == scope.row.to && scope.row.value != 0">+</span>
                <span v-show="account_add == scope.row.from && scope.row.value != 0">-</span>
                {{ scope.row.value }}
              </p>
            </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page_num">
          <el-pagination
            background
            @current-change="current_change2"
            :total="total2"
            :page-size="pagesize"
            :pager-count="5"
            layout="prev, pager, next">
          </el-pagination>
        </div>
      </div>
      <!-- p3 -->
      <div class="bd_show_p3" v-show="p3_active">
        <div class="bd_show_data">
          <div class="p3_data_show d-flex justify-content-space-between">
            <div class="p3_data_show_l">
              <div class="p3_data_show_l_f d-flex align-items-center">
                <p>{{caaddress.contract_name}}</p>
                <dd>{{contract_name}}</dd>
              </div>
              <div class="d-flex align-items-center">
                <p>{{caaddress.contract_text}}</p>
                <dd>{{contract_text}}</dd>
              </div>
            </div>
            <div class="p3_data_show_l">
              <div class="p3_data_show_l_f d-flex align-items-center">
                <p>{{caaddress.optimization_enabled}}</p>
                <dd>{{optimization_enabled}}</dd>
              </div>
              <!-- <div class="d-flex align-items-center">
                <p>{{caaddress.runs}}</p>
                <dd>{{runs}}</dd>
              </div> -->
            </div>
            <div class="p3_data_show_l" v-show="!verified">
              <router-link :to="{ path: 'verifycontract', query: { address: account_add}}">
              <div class="contract_certification d-flex align-items-center">
                <img src="../../../assets/images/index/others/contract_certification.png" />
                <p>{{caaddress.contract_certification}}</p>
              </div>
              </router-link>
            </div>
            <div class="p3_data_show_l" v-show="verified">
              <div class="contract_is_verified d-flex align-items-center">
                <img src="../../../assets/images/index/others/contract_certification.png" />
                <p>{{caaddress.contract_is_verified}}</p>
              </div>
            </div>
          </div>
          <div class="p3_data_show_second ">
            <div class="p3_data_show_m d-flex align-items-center justify-content-space-between">
              <dl>{{caaddress.cs}}</dl>
              <el-button class="copy_btn" type="text" size="medium"
                v-clipboard:copy="cs"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"><img src="../../../assets/images/index/others/copy_gray.png">
              </el-button>
            </div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              readonly
              v-model="cs">
            </el-input>
          </div>
          <div class="p3_data_show_second ">
            <div class=" p3_data_show_m d-flex align-items-center justify-content-space-between">
              <dl>{{caaddress.ca}}</dl>
              <el-button class="copy_btn" type="text" size="medium"
                v-clipboard:copy="ca"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"><img src="../../../assets/images/index/others/copy_gray.png">
              </el-button>
            </div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              readonly
              v-model="ca">
            </el-input>
          </div>
          <div class="p3_data_show_second ">
            <div class="p3_data_show_m d-flex align-items-center justify-content-space-between">
              <dl>{{caaddress.ccc}}</dl>
              <div class="d-flex align-items-center">
                <p class="stov">{{caaddress.stov}}</p>
                <el-button class="copy_btn" type="text" size="medium">
                  <img src="../../../assets/images/index/others/cut.png">
                </el-button>
              </div>
            </div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              readonly
              v-model="cbc">
            </el-input>
          </div>
        </div>
      </div>
      <!-- p4 -->
      <div class="bd_show_p4" v-show="p4_active">
        <div class="bd_show_data">
          <div class="p4_data_show d-flex align-items-center justify-content-space-between">
            <div class="p4_data_show_l">
              <div class="p4_data_show_l_f d-flex align-items-center">
                <p>{{caaddress.erc_name}}</p>
                <dd>{{erc_name}}</dd>
              </div>
              <div class="p4_data_show_l_f d-flex align-items-center">
                <p>{{caaddress.erc_symbol}}</p>
                <dd>{{erc_symbol}}</dd>
              </div>
              <div class="p4_data_show_l_f d-flex align-items-center">
                <p>{{caaddress.erc_decimals}}</p>
                <dd>{{erc_decimals}}</dd>
              </div>
              <div class="p4_data_show_l_f d-flex align-items-center">
                <p>{{caaddress.erc_totalSupply}}</p>
                <dd>{{erc_totalSupply}}</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- p5 -->
      <div class="bd_show_p5" v-show="p5_active">
        <div class="bd_show_data">
          <el-table
            :data="tableData3"
            style="width: 100%;">
            <el-table-column
              :label="caaddress.exchange_hash">
              <template slot-scope="scope">
                <span style="color:#39BDA6;" class="cursor-pointer" @click="transactionRelay(scope.row.transactionHash)">{{ scope.row.transactionHash }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.block_old">
              <template slot-scope="scope">
                <span >{{ scope.row.blockNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.send">
              <template slot-scope="scope">
                <span style="color:#39BDA6;" class="cursor-pointer" @click="tokenrelay(scope.row.from)">{{ scope.row.from }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.reception">
              <template slot-scope="scope">
                <div class="d-flex align-items-center">
                  <img src="../../../assets/images/index/others/roll_out.png" />
                  <span style="color:#39BDA6; margin-left:10px;" class="cursor-pointer" @click="tokenrelay(scope.row.to)">{{ scope.row.to }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="caaddress.num">
              <template slot-scope="scope">
                <span :class="scope.row.status=='+'?'green':'orange'">{{ scope.row.amount }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page_num d-flex align-items-center justify-content-space-between">
          <p>{{caaddress.all}}<span>{{total3}}</span>{{caaddress.show_record}}</p>
          <el-pagination
            background
            @current-change="current_change3"
            :total="total3"
            :page-size="pagesize"
            :pager-count="5"
            layout="prev, pager, next">
          </el-pagination>
        </div>
      </div>
      <!-- end -->
    </div>
  </section>
</template>

<script>
import VueQr from "vue-qr";
import data from "../../../service/data";
import Home from "../../../service/Home";
import Web3utils from "../../../service/web3utils.js";

export default {
  name: "ca_address_data",
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
      by: "",
      at: "",
      code_url: "",
      account_add: "",
      yue: "",
      account_type: "",
      account_level: "",
      seek_num: "",
      historical_transaction_number: "",
      //second
      p1_active: true,
      p2_active: false,
      p3_active: false,
      p4_active: false,
      p5_active: false,
      pagesize: 10, //每页的数据条数
      total: 10, //p1默认数据总数
      currentPage: 1, //p1默认开始页面
      total2: 10, //p2默认数据总数
      currentPage2: 1, //p2默认开始页面
      total3: 10, //p3默认数据总数
      currentPage3: 1, //p3默认开始页面
      erc: true,
      loading: true,
      tableData: [],
      //p2
      tableData2: [],
      //p3
      contract_name: "",
      contract_text: "",
      optimization_enabled: "",
      runs: "",
      verified: true, //判断合约是否验证
      cs: "",
      ca: "",
      cbc: "",
      textarea1: "",
      textarea2: "",
      textarea3: "",
      //p4
      erc_name: "",
      erc_symbol: "",
      erc_decimals: "",
      erc_totalSupply: "",
      //p5
      tableData3: [],
      all_data_num: ""
    };
  },
  props: ["language"],
  computed: {
    caaddress() {
      return data[this.language || "en"].index.ca_address;
    }
  },
  mounted() {
    this.caaddressdata();
    this.addrress();
  },
  methods: {
    p1() {
      this.p1_active = true;
      this.p2_active = false;
      this.p3_active = false;
      this.p4_active = false;
      this.p5_active = false;
    },
    p2() {
      this.p1_active = false;
      this.p2_active = true;
      this.p3_active = false;
      this.p4_active = false;
      this.p5_active = false;
      this.loading = true;
      this.Adinnertx();
    },
    p3() {
      this.p1_active = false;
      this.p2_active = false;
      this.p3_active = true;
      this.p4_active = false;
      this.p5_active = false;
      this.loading = true;
      this.Compile();
    },
    p4() {
      this.p1_active = false;
      this.p2_active = false;
      this.p3_active = false;
      this.p4_active = true;
      this.p5_active = false;
    },
    p5() {
      this.p1_active = false;
      this.p2_active = false;
      this.p3_active = false;
      this.p4_active = false;
      this.p5_active = true;
      this.loading = true;
      this.contokenrelay();
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
    //获取address信息(p1)
    async addrress() {
      let that = this;
      // console.log(this.$route.query.hash);
      try {
        let address = this.$route.query.address;
        if (Web3utils.isAddress(address)) {
          let addrtx = await Home.addrTXcounts(address);
          let balance = await Home.web3relay(address);
          this.total = addrtx.data.count;
          let res = await Home.addr(
            address,
            this.total,
            1,
            1,
            this.pagesize,
            0
          );
          if (balance.status == 200 && res.status == 200) this.loading = false;
          if (JSON.stringify(res.data) == "{}") {
            this.$message.error(this.add.no_hash);
            this.$router.push("/home");
          }
          // console.log(res.data.data.length);
          this.account_add = address;
          this.yue = (balance.data.balance / 10 ** 18).toFixed(4);
          this.tableData = res.data.data;
          // console.log(this.tableData);
          this.code_url = address;
          // console.log(this.tableData);
        } else {
          this.$message.error(that.selectinput.input_error);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //获取address内部交易(p2)
    async Adinnertx() {
      let that = this;
      // console.log(this.$route.query.hash);
      let address = this.$route.query.address;
      try {
        if (!Web3utils.isAddress(address)) {
          this.$message.error(that.selectinput.input_error);
          return;
        }
        let innertx = await Home.Adinnertx(address, 0);
        // console.log(innertx.data);
        if (innertx.status == 200) this.loading = false;
        this.tableData2 = innertx.data;
        this.total2 = this.tableData2.length;
        // console.log(this.tableData2.length);
      } catch (e) {
        console.log(e);
      }
    },
    //账户内部概览信息
    async caaddressdata() {
      let that = this;
      this.loading = true;
      let address = this.$route.query.address;
      this.account_add = address;
      try {
        if (!Web3utils.isAddress(address)) {
          this.$message.error(that.selectinput.input_error);
          return;
        }
        let res = await Home.tokenrelay(address);
        // let balance = await Home.web3relay(address);
        if (res.status == 200) this.loading = false;
        this.by = res.data.creator;
        this.at = res.data.transaction;
        this.yue = res.data.balance;
        //判断是否有erc_20代币
        if (res.data.totalSupply == "" || res.data.totalSupply == null) {
          this.erc = false;
        } else {
          this.erc_name = res.data.name;
          this.erc_symbol = res.data.symbol;
          this.erc_decimals = res.data.decimals;
          this.erc_totalSupply = res.data.totalSupply;
        }
      } catch (e) {
        console.log(e);
      }
    },
    //合约代码（p3）
    async Compile(addr) {
      let that = this;
      let address = this.$route.query.address;
      try {
        if (!Web3utils.isAddress(address)) {
          this.$message.error(that.selectinput.input_error);
          return;
        }
        let res = await Home.Compile(address);
        let reg = await Home.tokenrelay(address);
        if (res.status == 200 && reg.status == 200) this.loading = false;
        // console.log(res.data);
        if (reg.data.isVerified) this.verified = true;
        else this.verified = false;
        this.contract_name = res.data.contractName;
        this.contract_text = res.data.compilerVersion;
        this.optimization_enabled = res.data.optimization;
        this.cs = res.data.sourceCode;
        this.ca = res.data.abi;
        this.cbc = res.data.byteCode;
      } catch (e) {
        console.log(e);
      }
    },
    //合约账户里面代币交易列表(p5)
    async contokenrelay() {
      let that = this;
      let address = this.$route.query.address;
      try {
        if (!Web3utils.isAddress(address)) {
          this.$message.error(that.selectinput.input_error);
          return;
        }
        let res = await Home.contokenrelay(address, 0);
        if (res.status == 200) this.loading = false;
        this.tableData3 = res.data;
        // console.log(this.tableData3);
        this.total3 = this.tableData3.length;
      } catch (e) {
        console.log(e);
      }
    },
    async current_change(currentPage) {
      this.currentPage = currentPage;
      let res = await Home.addr(
        this.account_add,
        this.total,
        1,
        1,
        this.pagesize,
        (currentPage - 1) * this.pagesize
      );
      this.tableData = res.data.data;
    },
    async current_change2(currentPage) {
      this.currentPage2 = currentPage;
      let res = await Home.Adinnertx(this.account_add, currentPage - 1);
      this.tableData = res.data;
    },
    async current_change3(currentPage) {
      this.currentPage3 = currentPage;
      let res = await Home.contokenrelay(this.account_add, currentPage - 1);
      this.tableData = res.data;
    },
    //判断是否为合约账户或者外部账户
    async tokenrelay(address) {
      let that = this;
      this.loading = true;
      try {
        if (!Web3utils.isAddress(address)) {
          this.$message.error(that.selectinput.input_error);
          return;
        }
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

.ca_address_data {
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
        background: #333671;
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
      .ca_address_data_info {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #aeafbe;
      }
    }
    .bd_show_title_p p {
      padding: 0 !important;
    }
    .by_at {
      margin: 0 auto;
      width: 1200px;
      background: rgba(232, 234, 241, 1);
      border: 1px solid rgba(220, 221, 233, 1);
      border-radius: 4px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      text-align: left;
      font-family: ArialMT;
      span {
        margin: 0 20px;
        color: #1eb399;
      }
      dd {
        display: inline-block;
        margin-left: 20px;
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
    .bd_show_p3 {
      .bd_show_data {
        padding: 40px 0;
        .p3_data_show {
          background: #eef0f6;
          margin: 0 40px;
          padding: 20px;
          .p3_data_show_l {
            font-size: 14px;
            font-family: ArialMT;
            .p3_data_show_l_f {
              margin-bottom: 10px;
            }
            .contract_certification {
              background: #22b297;
              padding: 15px;
              border-radius: 4px;
              p {
                font-size: 14px;
                font-family: MicrosoftYaHei-Bold;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                margin-left: 10px;
              }
              &:hover {
                background: #228eb2;
                cursor: pointer;
              }
            }
            .contract_is_verified {
              background: #228eb2;
              padding: 15px;
              border-radius: 4px;
              p {
                font-size: 14px;
                font-family: MicrosoftYaHei-Bold;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                margin-left: 10px;
              }
            }
            p {
              text-align: left;
            }
            dd {
              color: #39bda6;
              padding-left: 10px;
            }
          }
        }
      }
      .p3_data_show_second {
        margin: 0 40px;
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(71, 77, 120, 1);
        .p3_data_show_m {
          padding: 0 20px;
          .stov {
            font-size: 14px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(62, 182, 171, 1);
            margin-right: 10px;
          }
        }
      }
    }
    .bd_show_p4 {
      .bd_show_data {
        padding: 40px 0;
        .p4_data_show {
          background: #eef0f6;
          margin: 0 40px;
          padding: 20px;
          .p4_data_show_l {
            font-size: 14px;
            font-family: ArialMT;
            .p4_data_show_l_f {
              margin-bottom: 10px;
            }
            p {
              width: 180px;
              text-align: left;
            }
            dd {
              color: #39bda6;
            }
          }
        }
      }
    }
  }
  .green {
    color: #39bda6 !important;
  }
  .orange {
    color: #e67e22 !important;
  }
  .page_num {
    width: 1200px;
    margin: 20px auto 0;
    text-align: right;
  }
}
@include md-lg-lt-md() {
  .ca_address_data {
    .bd_show {
      .by_at {
        width: calc(95% - 20px);
        margin: 0 2.5%;
        height: auto;
        line-height: normal;
        padding: 10px;
        dd {
          margin-left: 0;
        }
        span {
          margin: 0 10px;
          word-break: break-all;
        }
      }
      .bd_show_title {
        width: 95%;
        margin: 20px 2.5% 0;
        .bd_show_title_l {
          padding: 5px;
          p {
            padding: 0;
            font-size: 14px;
          }
        }
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
      .bd_show_p3 {
        .bd_show_data {
          .p3_data_show {
            display: block;
            .p3_data_show_l {
              margin-bottom: 20px;
              dd {
                width: 50%;
                word-break: break-word;
                padding-left: 8px;
              }
            }
          }
        }
      }
      .bd_show_p5 {
        .bd_show_data {
          img {
            display: none;
          }
        }
        .page_num {
          display: block;
          p {
            width: 95%;
            margin: 0 2.5% 20px;
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
.ca_address_data {
  .bd_show {
    .bd_show_data {
      .el-table thead {
        color: #474d78;
      }
    }
  }
}
</style>
