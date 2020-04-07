<template>
    <!--公告，这里是迷你横条-->
    <div class="select_input">
      <div class="select_box">
        <p class="box_title font-size-14">{{selectinput.title}}</p>
        <div class="input_box d-flex align-items-center justify-content-end">
          <form name="form.searchForm" class="d-flex align-items-center justify-content-end">
            <input type="text" :placeholder="selectinput.remind" v-model="form.searchInput" />
            <button @click.prevent="searchQuery(form.searchInput)" :plain="true"><img src="../../src/assets/images/input/icon_search.png"/></button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import data from "../service/data";
import Web3utils from "../service/web3utils.js";
import Home from "../service/home";

export default {
  name: "selectinput",
  data() {
    return {
      form: {}
    };
  },
  props: ["language"],
  inject: ["reload"],
  computed: {
    selectinput() {
      return data[this.language || "en"].selectinput;
    }
  },
  methods: {
    async searchQuery(s) {
      let that = this;
      if (s == "" || s == null || !s)
        this.$message.error(that.selectinput.input_info);
      else {
        
        // var search = s.toLowerCase();
        let search = s.replace(/(^\s*)|(\s*$)/g, "");
        // search = search.replace(/\"/g, "");
        this.form.searchInput = "";
        // this.form.searchForm.$setPristine();
        // this.form.searchForm.$setUntouched();
        //地址开始
        if (await Web3utils.isAccount(search)) {
          console.log("is account ....")
          // this.$router.push({path: 'eaaddress', query: {address: search}});
          //判断地址是内部还会外部
          let res = await Home.tokenrelay(search);
          if (res.data == "" || res.data == null) {
            this.$router.push({
              path: "eaaddress",
              query: { address: search }
            });
          } else {
            this.$router.push({
              path: "caaddress",
              query: { address: search }
            });
          }
          //地址结束
        } else if (await Web3utils.isTransaction(search)) {
          console.log("is tx hash");
          // this.$router.push({path: 'txeadetail', query: {hash: search}});
          // $location.path("/tx/" + search);
          if (search.length == 44) {
            let xreg = await Home.transactionRelay(search);
            console.log("xreg:",xreg)
            if (xreg.data.contractLable) {
              this.$router.push({
                path: "txcadetail",
                query: { hash: search }
              });
            } else {
              this.$router.push({
                path: "txeadetail",
                query: { hash: search }
              });
            }
          }
          if (search.length == 64) {
            let reg = await Home.transactionRelay(search);
            if (reg.data.contractLable) {
              this.$router.push({
                path: "txcadetail",
                query: { hash: search }
              });
            } else {
              this.$router.push({
                path: "txeadetail",
                query: { hash: search }
              });
            }
          }
          // console.log(reg.data.tokenTransfer);
          //hash结束
        } else if (!isNaN(search)) {
          console.log("is blocknum...")
          this.$router.push({
            path: "blocklistdetail",
            query: { block: search }
          });
          this.reload();
        } else
          // $location.path("/block/" + search);
          this.$message.error(that.selectinput.input_error);
        //主节点开始
        // else if (search.length == 16) {
        //   //master node address
        //   this.$router.push({
        //     path: "mndetail",
        //     query: { address: search }
        //   });
        // }
        // else if (search.length == 18) {
        //   //master node address
        //   if (search.indexOf("se") == 0) {
        //     // $location.path("/miner/" + search.substr(2));
        //     this.$router.push({
        //       path: "mndetail",
        //       query: { address: search.slice(2) }
        //     });
        //   }
        //   if (search.indexOf("0x") == 0) {
        //     // $location.path("/miner/" + search.substr(2));
        //     this.$router.push({
        //       path: "mndetail",
        //       query: { address: search.slice(2) }
        //     });
        //   }
        // }
        //主节点结束
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../static/css/_util.scss";
@import "../../static/css/_app.scss";

input[type="button"],
input[type="submit"],
input[type="reset"] {
  -webkit-appearance: none;
}
textarea {
  -webkit-appearance: none;
}
.select_input {
  width: 100%;
  height: 120px;
  .select_box {
    width: 1200px;
    margin: 0 auto;
    text-align: left;
    .box_title {
      background: #239e86;
      width: auto;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      color: #ffffff;
      margin: 0;
      text-align: center;
      font-family: "MicrosoftYaHei";
      // float: left;
    }
    .input_box {
      form {
        width: 100%;
      }
      input {
        border: 3px solid rgba(38, 40, 86, 1);
        line-height: 50px;
        height: 50px;
        width: calc(100% - 100px);
        padding-left: 10px;
        outline: none;
        font-size: 15px;
        color: #5e6875;
      }
      button {
        width: 110px;
        height: 58px;
        background: #239e86;
        border: 0;
        outline: none;
        cursor: pointer;
      }
      // float: left;
    }
  }
}
// x < 1200
@include md-lg-lt-md() {
  .select_input {
    width: calc(100% - 20px);
    margin: 0 10px;
    height: 80px;
    .select_box {
      width: auto;
      .box_title {
        height: 24px;
        line-height: 24px;
        font-size: 12px;
      }
      .input_box {
        input {
          height: 22px;
          width: calc(100% - 60px);
          border-radius: 0;
          line-height: 20px;
          padding: 5px 0 5px 10px;
          font-size: 12px;
        }
        button {
          height: 38px;
          width: 60px;
        }
      }
    }
  }
}
</style>
