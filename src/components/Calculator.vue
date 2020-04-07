<template>
    <div class="calculatorbox">
      <nav-bar  @languageSwitched="listenLangSwitch" :is-show-nav="true"
          currentSection="calculator" :sectionRefs="$refs" :language="language"/>
        <div class="calculatorbox_con">
        <div class="disclaimer">
          <dl>{{content.calculator.disclaimer}}</dl>
          <dd>{{content.calculator.disclaimer_info}}</dd>
        </div>
        <el-form :model="form" style="text-align: left;">
          <h4>{{content.calculator.title2}}</h4>
          <el-form-item :label="content.calculator.cpb">
            <el-input v-model="form.block" autocomplete="off" @input="size(form.unit)"></el-input>
          </el-form-item>
          <el-form-item :label="content.calculator.bt">
            <el-input v-model="form.target" autocomplete="off" @input="size(form.unit)"></el-input>
          </el-form-item>
          <el-form-item :label="content.calculator.tps">
            <el-input v-model="form.size" autocomplete="off" @input="size(form.unit)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.unit" @change="size(form.unit)">
              <el-option label="GB" value="gb"></el-option>
              <el-option label="TB" value="tb"></el-option>
              <el-option label="PB" value="pb"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="content.calculator.erpd">
            <el-input v-model="form.erpd" autocomplete="off" @input="size(form.unit)"></el-input>
          </el-form-item>
          <div class="resultbox d-flex">
            <h2>{{content.calculator.result}}</h2>
            <p>{{content.calculator.pd}}<span>{{pd}}</span> CBase , {{content.calculator.pw}}<span>{{pw}}</span> CBase , {{content.calculator.pm}}<span>{{pm}}</span> CBase .</p>
          </div>
          <!-- <h4>{{content.calculator.title3}}</h4>
          <el-form-item :label="content.calculator.currency">
            <el-select v-model="form.currency" @change="currency()">
              <el-option label="CBase" value="CBase"></el-option>
              <el-option label="BTC" value="btc"></el-option>
              <el-option label="EUR" value="eur"></el-option>
              <el-option label="USD" value="usd"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="content.calculator.amount">
            <el-input v-model="form.amount" autocomplete="off" @input="currency()"></el-input>
          </el-form-item>
          <div class="price_calculator">
            <dd>
              <p class="d-flex align-items-center">
                <span>1 </span> {{all_left}} <span> = </span>
                <el-input v-model="f_right_num" autocomplete="off" @input="currency()"></el-input>
                <span>{{f_right_unit}}</span>
              </p>
              <p>Total {{f_right_unit}} : {{f_total}}</p>
            </dd>
            <dd>
              <p class="d-flex align-items-center">
                <span>1 </span> {{all_left}} <span> = </span>
                <el-input v-model="s_right_num" autocomplete="off" @input="currency()"></el-input>
                <span>{{s_right_unit}}</span>
              </p>
              <p>Total {{s_right_unit}} : {{s_total}}</p>
            </dd>
            <dd>
              <p class="d-flex align-items-center">
                <span>1 </span> {{all_left}} <span> = </span>
                <el-input v-model="t_right_num" autocomplete="off" @input="currency()"></el-input>
                <span>{{t_right_unit}}</span>
              </p>
              <p>Total {{t_right_unit}} : {{t_total}}</p>
            </dd>
          </div> -->
        </el-form>
      </div>
    </div>
</template>

<script>
import data from "../service/data";
import NavBar from "../components/NavBar";

export default {
  name: "Calculator",
  props: ["calculatorshow"],
  components: {
    "nav-bar": NavBar
  },
  data() {
    return {
      language: "",
      currentSection: "calculator",
      form: {
        block: "100",
        target: "8947848",
        size: "0",
        unit: "tb",
        erpd: "0.4",
        currency: "CBase",
        amount: "394"
      },
      pd: "0",
      pw: "0",
      pm: "0",
      all_left: "Burst",
      f_right_num: "0",
      f_right_unit: "BTC",
      f_total: "0",
      s_right_num: "0",
      s_right_unit: "EUR",
      s_total: "0",
      t_right_num: "0",
      Burst: "1.00000000",
      BTC: "0.00000035",
      EUR: "0.00298373",
      USD: "0.00330419",
      t_right_unit: "USD",
      t_total: "0"
    };
  },
  computed: {
    isCurrentAbout() {
      return this.currentSection === "Calculator";
    },
    content() {
      return data[this.language || "en"].nav;
    }
  },
  mounted() {
    this.currency();
  },
  methods: {
    listenLangSwitch: function(language) {
      this.language = language;
      this.$route.query.lang = language;
      let data = { lang: undefined };
      if (language == "ch") {
        data.lang = "ch";
      } else {
        data.lang = "en";
      }
      // this.$router.replace({ path: "/miner", query: data });
      localStorage.setItem("language", JSON.stringify(language));
    },
    size(data) {
      let that = this;
      let b = 1;
      let d = parseInt(that.form.block);
      let c = parseInt(that.form.target);
      let r = parseFloat(that.form.erpd);
      let size = parseFloat(that.form.size);
      if (data == "pb") {
        b = b * 1e3 * 1e3 * 1e3;
      } else if (data == "tb") {
        b = b * 1e3 * 1e3;
      } else if (data == "gb") {
        b = b * 1e3;
      } else {
        return false;
      }
      // switch (data) {
      //   case "pb":
      //     b *= 1e3;
      //   case "tb":
      //     b *= 1e3;
      //   case "gb":
      //     b *= 1e3;
      // }
      // alert(b);
      let magicFactor = 0.85;
      let a = 4 * size * b;
      a = Math.pow(2, 64) / c / a;
      d = 3600 * d / a;
      a = 24 * d * magicFactor;
      let day = a * r;
      let week = day * 7;
      let month = day * 30;
      that.pd = Number(day).toFixed(2);
      that.pw = Number(week).toFixed(2);
      that.pm = Number(month).toFixed(2);
    },
    currency() {
      let that = this;
      if (that.form.currency == "CBase") {
        that.all_left = "Burst";
        that.f_right_unit = "BTC";
        that.s_right_unit = "EUR";
        that.t_right_unit = "USD";
        that.f_right_num = that.BTC / that.Burst;
        that.s_right_num = that.EUR / that.Burst;
        that.t_right_num = that.USD / that.Burst;
        that.f_total = (that.f_right_num * that.form.amount).toFixed(3);
        that.s_total = (that.s_right_num * that.form.amount).toFixed(3);
        that.t_total = (that.t_right_num * that.form.amount).toFixed(3);
        that.f_right_num = that.f_right_num.toFixed(8);
        that.s_right_num = that.s_right_num.toFixed(8);
        that.t_right_num = that.t_right_num.toFixed(8);
      } else if (that.form.currency == "btc") {
        that.all_left = "BTC";
        that.f_right_unit = "Burst";
        that.s_right_unit = "EUR";
        that.t_right_unit = "USD";
        that.f_right_num = that.Burst / that.BTC;
        that.s_right_num = that.EUR / that.BTC;
        that.t_right_num = that.USD / that.BTC;
        that.f_total = (that.f_right_num * that.form.amount).toFixed(3);
        that.s_total = (that.s_right_num * that.form.amount).toFixed(3);
        that.t_total = (that.t_right_num * that.form.amount).toFixed(3);
        that.f_right_num = that.f_right_num.toFixed(8);
        that.s_right_num = that.s_right_num.toFixed(8);
        that.t_right_num = that.t_right_num.toFixed(8);
      } else if (that.form.currency == "eur") {
        that.all_left = "EUR";
        that.f_right_unit = "Burst";
        that.s_right_unit = "BTC";
        that.t_right_unit = "USD";
        that.f_right_num = that.Burst / that.EUR;
        that.s_right_num = that.BTC / that.EUR;
        that.t_right_num = that.USD / that.EUR;
        that.f_total = (that.f_right_num * that.form.amount).toFixed(3);
        that.s_total = (that.s_right_num * that.form.amount).toFixed(3);
        that.t_total = (that.t_right_num * that.form.amount).toFixed(3);
        that.f_right_num = that.f_right_num.toFixed(8);
        that.s_right_num = that.s_right_num.toFixed(8);
        that.t_right_num = that.t_right_num.toFixed(8);
      } else if (that.form.currency == "usd") {
        that.all_left = "USD";
        that.f_right_unit = "Burst";
        that.s_right_unit = "BTC";
        that.t_right_unit = "EUR";
        that.f_right_num = that.Burst / that.USD;
        that.s_right_num = that.BTC / that.USD;
        that.t_right_num = that.EUR / that.USD;
        that.f_total = (that.f_right_num * that.form.amount).toFixed(3);
        that.s_total = (that.s_right_num * that.form.amount).toFixed(3);
        that.t_total = (that.t_right_num * that.form.amount).toFixed(3);
        that.f_right_num = that.f_right_num.toFixed(8);
        that.s_right_num = that.s_right_num.toFixed(8);
        that.t_right_num = that.t_right_num.toFixed(8);
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../static/css/_util.scss";
@import "../../static/css/_app.scss";
.mini-notice {
  padding: 10px 0;
  .notice_box {
    width: 1200px;
    margin: 0 auto;
    height: 14px;
    .note {
      height: 14px;
      .item {
        padding-left: 10px;
        color: #1b4a74;
        font-size: 12px;
        text-align: left;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 500px;
        &:hover {
          color: #ff0000 !important;
        }
      }
    }
  }
}
// x < 1200
@include md-lg-lt-md() {
  .mini-notice {
    .notice_box {
      width: auto;
      margin: 0 10px;
      .note {
        .item {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 80%;
          display: inline-block;
        }
      }
    }
  }
}
.calculatorbox {
  .calculatorbox_con {
    width: 90%;
    margin: 20px auto;
  }
  .disclaimer {
    dl {
      color: #000;
      font-weight: bold;
      margin: 0 10px 10px 0;
      font-size: 16px;
      text-align: left;
    }
    dd {
      text-align: left;
    }
  }
  h4 {
    text-align: left;
    color: #000;
    font-size: 16px;
  }
  h2 {
    text-align: left;
    color: #000;
    margin: 0;
    font-size: 14px;
  }
  .resultbox {
    p {
      margin-left: 10px;
      span {
        color: #000;
        font-weight: bold;
      }
    }
  }
  .price_calculator {
    dd {
      margin: 10px auto 20px;
      p {
        &:nth-child(1) {
          margin-right: 30px;
          margin-bottom: 10px;
          span {
            &:nth-child(1) {
              margin-right: 5px;
            }
            &:nth-child(2) {
              margin: 0 5px;
            }
            &:nth-last-child(1) {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  // .el-form-item{
  //   margin-bottom: 0;
  // }
}
</style>
<style lang="scss">
.el-dialog__title {
  line-height: 24px;
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}
</style>
