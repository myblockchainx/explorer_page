<template>
	<div class="content">
		<p class="prompt_p">{{echart.echart_title}}</p>
		<div class="table_echarts"  id="echart">
		</div>
	</div>
</template>

<script type="text/javascript">
import data from "../service/data";

export default {
  props: {
    xdata: {
      type: Array
    },
    ydata: {
      type: Array
    }
  },
  data() {
    return {
      table_chart: null,
    };
  },
  mounted: function() {
    this.get_echarts();
  },
  computed: {
    echart() {
      return data[this.language || "en"].miner.mn_detail;
    }
  },
  methods: {
    get_echarts: function() {
      this.table_chart = this.echarts.init(document.getElementById("echart"));
      // 把配置和数据放这里
      this.table_chart.setOption({
        title: {
          // text: '222222',//自带的标题
          // subtext: '123',
          x: "center",
          align: "center"
        },
        //移上去说明
        tooltip: {
          trigger: "axis"
        },
        //表格间距
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            magicType: { type: ["line", "bar"] }, //柱状图和西和折线图切换
            restore: {}, //刷新
            saveAsImage: {} //保存图片
          }
        },
        xAxis: {
          // name: this.echart.times_day,
          type: "category",
          boundaryGap: false,
          data: this.xdata
        },
        yAxis: {
          name: this.echart.block_num,
          nameLocation: "end",
          type: "value",
          axisLabel: {
            formatter: "{value} "
          }
        },
        series: [
          {
            name: this.echart.block_num,
            type: "line",
            data: this.ydata,
            lineStyle: {
              //设置折线色颜色
              color: "#7d89af"
            },
            itemStyle: {
              //设置折线折点的颜色
              normal: {
                color: "#7d89af"
              }
            }
          }
        ]
      });
    }
  },
  beforeDestroy() {
    if (!this.table_chart) {
      return;
    }
    this.table_chart.dispose();
    this.table_chart = null;
  }
};
</script>
<style lang="scss" type="text/css" scoped>
@import "../../static/css/_util.scss";
@import "../../static/css/_app.scss";

.content {
  width: 100%;
}
.content p {
  margin-top: 1rem;
  font-size: 0.4rem;
  color: #666666;
}
.table_echarts {
  height: 360px;
  width: 94%;
}
@include md-lg-lt-md() {
.table_echarts {
  height: 200px;
}
}
</style>
