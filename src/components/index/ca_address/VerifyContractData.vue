<template>
  <section class="verify_data" v-loading="loading">
    <div class="bd_show">
      <div class="bd_show_title d-flex align-items-center justify-content-space-between">
        <div class="bd_show_title_l d-flex align-items-center justify-content-space-between">
          <img src="../../../assets/images/index/others/code.png">
          <p>{{verifycontract.csc}}</p>
        </div>
      </div>
      <div class="bd_show_data_first">
        <div class="bd_show_data_first_f">
          <dd class="d-flex align-items-center">
            <h4>{{verifycontract.title}}</h4>
          </dd>
          <dd class="d-flex align-items-center">
            <dl>{{verifycontract.step_1}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <dl>{{verifycontract.step_2}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <dl>{{verifycontract.step_3}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <h3>{{verifycontract.notes_title}}</h3>
          </dd>
          <dd class="d-flex align-items-center">
            <dl>{{verifycontract.note_1}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <dl>{{verifycontract.note_2}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <dl>{{verifycontract.note_3}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <dl>{{verifycontract.note_4}}</dl>
          </dd>
          <dd class="d-flex align-items-center">
            <dl>{{verifycontract.note_5}}</dl>
          </dd>
        </div>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <div class="bd_show_data_s d-flex align-items-center">
          <div class="bd_show_data_s_box">
            <p>{{verifycontract.contract_address}}</p>
            <el-form-item prop="input1">
            <el-input
              :placeholder="verifycontract.contract_address"
              suffix-icon="el-icon-document"
              v-model="form.input1">
            </el-input>
            </el-form-item>
          </div>
          <div class="bd_show_data_s_box">
            <p>{{verifycontract.contract_name}}</p>
            <el-form-item prop="input2">
            <el-input
              :placeholder="verifycontract.contract_name"
              suffix-icon="el-icon-document"
              v-model="form.input2">
            </el-input>
            </el-form-item>
          </div>
          <div class="bd_show_data_s_box">
            <p>{{verifycontract.compiler}}</p>
            <!-- <el-input
              :placeholder="verifycontract.please_select"
              v-model="input3">
            </el-input> -->
            <el-form-item prop="input3">
            <el-select v-model="form.input3" :placeholder="verifycontract.please_select" prop="input3">
              <el-option
                v-for="item in this.compilerVersions"
                :key="item.value"
                :value="item.value">
                {{item.name}}
              </el-option>
            </el-select>
            </el-form-item>
          </div>
          <div class="bd_show_data_s_box">
            <p>{{verifycontract.optimization}}</p>
            <!-- <el-input
              :placeholder="verifycontract.yes"
              v-model="input4">
            </el-input> -->
            <el-form-item>
            <el-checkbox v-model="form.checked"></el-checkbox>
            </el-form-item>
          </div>
        </div>
        <div class="bd_show_data_t">
          <div class="bd_show_data_t_box d-flex align-items-center justify-content-space-between">
            <dd>{{verifycontract.etsccb}}</dd>
            <dl class="github d-flex align-items-center">
              <img src="../../../assets/images/index/others/github.png" />
              <p>{{verifycontract.ffg}}</p>
            </dl>
          </div>
          <el-form-item prop="textarea">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="form.textarea">
          </el-input>
          </el-form-item>
        </div>
        <div class="bd_show_data_f">
          <div class="bd_show_data_f_box">
            <h3>{{verifycontract.optional_parameters}}</h3>
            <!-- <div class="optional_parameters d-flex align-items-center">
              <p>{{verifycontract.optional_parameters_1}}</p>
              <div class="input5"><el-input v-model="form.input5" size="mini" ></el-input></div>
            </div> -->
            <div class="optional_parameters">
              <p>{{verifycontract.optional_parameters_2}}</p>
            </div>
            <a href="#">
            <div class="optional_parameters see_kb_entry d-flex align-items-center">
              <p>{{verifycontract.see_kb_entry}}</p>
              <img src="../../../assets/images/index/others/link.png" />
            </div>
            </a>
            <div class="optional_parameters">
            <el-form-item prop="textarea1">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="form.textarea1">
              </el-input>
            </el-form-item>
            </div>
            <!-- <div class="optional_parameters">
              <p>{{verifycontract.optional_parameters_3}}</p>
            </div>
            <div class="optional_parameters">
              <div class="optional_parameters_3_box d-flex align-items-center">
                <p>{{verifycontract.name_1}}</p>
                <div class="name"><el-input v-model="name1" size="mini" ></el-input></div>
                <img src="../../../assets/images/index/others/roll_out_green.png" />
                <p>{{verifycontract.lca}}</p>
                <div class="name"><el-input v-model="name1_1" size="mini" ></el-input></div>
              </div>
              <div class="optional_parameters_3_box d-flex align-items-center">
                <p>{{verifycontract.name_2}}</p>
                <div class="name"><el-input v-model="name2" size="mini" ></el-input></div>
                <img src="../../../assets/images/index/others/roll_out_green.png" />
                <p>{{verifycontract.lca}}</p>
                <div class="name"><el-input v-model="name2_1" size="mini" ></el-input></div>
              </div>
              <div class="optional_parameters_3_box d-flex align-items-center">
                <p>{{verifycontract.name_3}}</p>
                <div class="name"><el-input v-model="name3" size="mini" ></el-input></div>
                <img src="../../../assets/images/index/others/roll_out_green.png" />
                <p>{{verifycontract.lca}}</p>
                <div class="name"><el-input v-model="name3_1" size="mini" ></el-input></div>
              </div>
              <div class="optional_parameters_3_box d-flex align-items-center">
                <p>{{verifycontract.name_4}}</p>
                <div class="name"><el-input v-model="name4" size="mini" ></el-input></div>
                <img src="../../../assets/images/index/others/roll_out_green.png" />
                <p>{{verifycontract.lca}}</p>
                <div class="name"><el-input v-model="name4_1" size="mini" ></el-input></div>
              </div>
              <div class="optional_parameters_3_box d-flex align-items-center">
                <p>{{verifycontract.name_5}}</p>
                <div class="name"><el-input v-model="name5" size="mini" ></el-input></div>
                <img src="../../../assets/images/index/others/roll_out_green.png" />
                <p>{{verifycontract.lca}}</p>
                <div class="name"><el-input v-model="name5_1" size="mini" ></el-input></div>
              </div>
            </div> -->
          </div>
        </div>
      </el-form>
        <div class="bd_show_data_btn">
          <div class="bd_show_data_btn_box d-flex align-items-center">
            <button class="vap" @click="submit('ruleForm')">{{verifycontract.vap}}</button>
            <button class="reset" @click="reset()">{{verifycontract.reset}}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueQr from "vue-qr";
import data from "../../../service/data";
import Home from "../../../service/Home";
import Web3utils from "../../../service/web3utils.js";

export default {
  name: "verify_data",
  components: {
    VueQr
  },
  data() {
    // 添加地址规则
    let input1 = (rule, value, callback) => {
      if (!Web3utils.isAddress(value)) {
        callback(new Error("地址不正确"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      compilerVersions: [],
      form: {
        input1: "",
        input2: "",
        input3: "",
        checked: false,
        textarea: "",
        // textarea1: ""
        // input5: ""
      },
      rules: {
        input1: [
          { required: true, message: "null", trigger: "blur" },
          { validator: input1, trigger: "blur" }
        ],
        input2: [{ required: true, message: "null", trigger: "blur" }],
        input3: [{ required: true, message: "null", trigger: "change" }],
        textarea: [{ required: true, message: "null", trigger: "blur" }],
        // textarea1: [{ required: true, message: "null", trigger: "blur" }]
      }
      // name1: "",
      // name2: "",
      // name3: "",
      // name4: "",
      // name5: "",
      // name1_1: "",
      // name2_1: "",
      // name3_1: "",
      // name4_1: "",
      // name5_1: ""
    };
  },
  props: ["language"],
  computed: {
    verifycontract() {
      return data[this.language || "en"].index.ca_address.verify_contract;
    }
  },
  mounted() {
    this.CompilerJson();
  },
  methods: {
    //请求外部的url（验证合约里面的一个json数据）
    buildVersion(build) {
      if (build.prerelease && build.prerelease.length > 0) {
        return build.version + "-" + build.prerelease;
      } else {
        return build.version;
      }
    },
    async CompilerJson() {
      let address = this.$route.query.address;
      try {
        let that = this;
        if (address != '' || address != null) that.form.input1 = address;
        let res = await Home.CompilerJson();
        res.data.builds.slice().reverse().forEach(function(build) {
            that.compilerVersions.push({
              name: that.buildVersion(build),
              value: "v" + build.longVersion
            });
          });
      } catch (e) {
        this.compilerVersions.push({
          name: "latest local version",
          value: "latest"
        });
        console.log(e);
      }
    },
    //提交
    submit(formName) {
      this.$refs[formName].validate(valid => {
        // let that = this;
        if (valid) {
          this.loading = true;
          let input1 = this.form.input1.slice(2);
          let input2 = this.form.input2;
          let input3 = this.form.input3;
          let checked = this.form.checked;
          let textarea = this.form.textarea;
          let textarea1 = this.form.textarea1;
          this.axios({
            method: "POST",
            url: "http://13.251.6.203:3001/compile",
            // url:"http://localhost:3001/compile",
            data: {
              address: input1,
              name: input2,
              version: input3,
              optimization: checked,
              code: textarea,
              abi: textarea1,
              action: "compile"
            }
          })
            .then(response => {
              if (response.status == 200) {
                this.loading = false;
                this.$message.success('success!');
              }
              // console.log(response); //请求成功返回的数据
            })
            .catch(error => {
              console.log("errer" + error); //请求失败返回的数据
              this.$message.error("errer" + error);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    //重置
    reset(formName) {
      this.form.input1 = '';
      this.form.input2 = '';
      this.form.input3 = '';
      this.form.checked = '';
      this.form.textarea = '';
      this.form.textarea1 = '';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "../../../../static/css/_util.scss";
@import "../../../../static/css/_app.scss";

.verify_data {
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  .bd_show {
    .bd_show_title {
      width: 1200px;
      margin: 20px auto 0;
      .bd_show_title_l {
        padding: 10px 0;
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
      .verify_data_info {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #aeafbe;
      }
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
        margin: 5px 40px;
        text-align: left;
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
      h4 {
        font-size: 16px;
        font-family: ArialMT;
        font-weight: 400;
        color: rgba(71, 77, 120, 1);
        margin: 10px 0 20px;
      }
      h3 {
        font-size: 16px;
        font-family: ArialMT;
        font-weight: 400;
        color: rgba(141, 155, 174, 1);
        margin: 20px 0 0;
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
      .bd_show_data_first_f {
        margin: 0;
      }
      .bd_show_data_s {
        border-top: 1px solid #eaebf4;
        margin: 40px 40px 0;
        padding-top: 40px;
        .bd_show_data_s_box {
          margin-right: 40px;
          p {
            margin: 10px 20px;
          }
        }
      }
      .bd_show_data_t {
        margin: 40px 40px 0;
        padding-bottom: 50px;
        border-bottom: 1px solid #eaebf4;
        .bd_show_data_t_box {
          margin-bottom: 10px;
          dd {
            font-size: 16px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(71, 77, 120, 1);
            margin: 0;
          }
          dl {
            background: #22b297;
            padding: 5px 15px;
            cursor: pointer;
            p {
              margin: 0 0 0 10px;
              width: auto;
              font-size: 14px;
              font-family: ArialMT;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }
            &:hover {
              background: #228eb2;
            }
          }
        }
      }
      .bd_show_data_f {
        margin: 0 40px;
        .bd_show_data_f_box {
          text-align: left;
          h3 {
            font-size: 14px;
            font-family: ArialMT;
            font-weight: 400;
            margin: 20px 0;
          }
          p {
            width: auto;
            font-size: 13px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(71, 77, 120, 1);
          }
          .optional_parameters {
            margin-bottom: 20px;
            .optional_parameters_3_box {
              margin: 0 0 15px 15px;
              p {
                margin: 0 10px 0 0;
                font-size: 15px;
                font-family: ArialMT;
                font-weight: 400;
                color: rgba(141, 155, 174, 1);
              }
              img {
                margin: 0 20px;
              }
              .name {
                width: 200px;
              }
            }
          }
          .see_kb_entry {
            margin-left: 20px;
            p {
              color: #1eb399;
              font-size: 13px;
              font-family: ArialMT;
              font-weight: 400;
            }
          }
          .input5 {
            width: 100px;
          }
        }
      }
      .bd_show_data_btn {
        margin: 40px 40px 20px;
        .bd_show_data_btn_box {
          .vap {
            width: 150px;
            height: 35px;
            background: rgba(34, 178, 151, 1);
            font-size: 14px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            border: 0;
            outline: none;
            margin-right: 20px;
            cursor: pointer;
          }
          .reset {
            width: 70px;
            height: 35px;
            background: rgba(146, 158, 156, 1);
            font-size: 14px;
            font-family: ArialMT;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            border: 0;
            outline: none;
            cursor: pointer;
          }
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
  .verify_data {
    .bd_show {
      .bd_show_title {
        width: 95%;
        margin: 0 2.5% 10px;
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
        .bd_show_data_s {
          display: block;
        }
        .bd_show_data_t {
          .bd_show_data_t_box {
            display: block;
          }
        }
        .bd_show_data_f {
          .bd_show_data_f_box {
            .see_kb_entry {
              margin: 0;
            }
            .optional_parameters {
              .optional_parameters_3_box {
                margin: 0 0 20px 0;
                flex-wrap: wrap;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" type="text/css">
.verify_data {
  .bd_show {
    .bd_show_data {
      .el-table thead {
        color: #474d78;
      }
    }
  }
}
</style>
