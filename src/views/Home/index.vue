<template>
  <el-row :gutter="20" class="home">
    <el-col :span="8">
      <el-card shadow="always">
        <div class="user">
          <img :src="userImg" alt="" />
          <div class="userinfo">
            <p class="name">Name</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p><span>上次登录时间:</span><span>2020-2-1</span></p>
          <p><span>上次登录地点:</span><span>深圳</span></p>
        </div>
      </el-card>
      <el-card shadow="always" style="margin-top: 20px;">
        总是显示
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card shadow="always" v-for="item in 6" :key="item">
          <i class="icon"></i>
          <div class="detail">
            <p class="num">￥1234</p>
            <p class="tet">今日订单</p>
          </div>
        </el-card>
      </div>
      <echart
        ref="echart"
        shadow="always"
        style="height: 260px;"
        :chartData="echartData.order"
      ></echart>

      <div class="graph">
        <echart
          shadow="always"
          ref="echarts"
          style="height: 260px;width: 48%;"
          :chartData="echartData.user"
        ></echart>
        <echart
          ref="echart"
          shadow="always"
          style="height: 260px;width: 48%;"
          :chartData="echartData.video"
          :isAxisChart="false"
        ></echart>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHomeDate } from "@/utils/api";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("Crumbs");
import Echart from "@/components/Echatr";
export default {
  computed: {
    ...mapState(["collapseType"])
  },
  watch: {
    collapseType() {
      console.log(1111);
      console.log(this.$refs.echart.resizeChart, "this.$refs.echart");
      setTimeout(() => {
        this.$refs.echart.resizeChart();
        this.$refs.echarts.resizeChart();
      }, 300);
    }
  },
  data() {
    return {
      userImg: require("@/assets/xiao.jpg"),
      echartData: {
        order: {
          xData: [],
          series: [],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          }
        },
        user: {
          xData: [],
          series: [],
          axisLabel: "twoLine",
          title: {
            text: "天气情况统计",
            subtext: "虚构数据",
            left: "center"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          }
        },
        video: {
          title: {
            text: "某站点用户访问来源",
            subtext: "纯属虚构",
            left: "center"
          },
          tooltip: {
            show: true,
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: 335, name: "直接访问" },
                { value: 310, name: "邮件营销" },
                { value: 234, name: "联盟广告" },
                { value: 135, name: "视频广告" },
                { value: 1548, name: "搜索引擎" }
              ]
              // emphasis: {
              //   itemStyle: {
              //     shadowBlur: 10,
              //     shadowOffsetX: 0,
              //     shadowColor: "rgba(0, 0, 0, 0.5)"
              //   }
              // }
            }
          ]
        }
      }
    };
  },
  components: {
    Echart
  },
  mounted() {
    getHomeDate().then(res => {
      console.log(res, "oooo");
      //订单折线图
      const order = res.data.data.orderData;
      this.echartData.order.xData = order.date;
      this.echartData.user.xData = JSON.parse(JSON.stringify(order.date));
      this.echartData.user.series = [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar"
        },
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar"
        },
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar"
        }
      ];
      // this.echartData.video.xData = order.date;
      // 取出series中的name部分
      let keyArray = Object.keys(order.data[0]);
      keyArray.forEach(key => {
        this.echartData.order.series.push({
          name: this.keyDecorate(key),
          data: order.data.map(item => {
            return item[key];
          }),
          type: "line"
        });
      });
    });
  },
  methods: {
    //修改显示的 name
    keyDecorate(key) {
      switch (key) {
        case "a":
          key = "福田区";
          break;
        case "b":
          key = "华强北";
          break;
        case "c":
          key = "南山区";
          break;
        case "d":
          key = "蓬江区";
          break;
        case "e":
          key = "小榄镇";
          break;
        case "f":
          key = "古镇";
          break;
      }
      return key;
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
@import "./home";
</style>
