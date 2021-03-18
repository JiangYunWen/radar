<template>
  <div class="container">
    <!--侧方栏配置信息-->
    <right-panel v-if="true">
      <settings :soltab="item" />
    </right-panel>

    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="配置" name="first">
        <div style="display: flex; margin: 10px">
          <span style="margin-right: 20px">定时刷新</span>
          <el-checkbox
            v-model="checked"
            @change="checkedFun"
            id="times"
            style="margin-right: 20px"
            size="medium"
          ></el-checkbox>
          <el-input v-model="input" style="width: 50px"></el-input>秒
        </div>
        <!--CPU使用情况-->
        <el-col :span="24">
          <!--drawLine /-->
          <!--内存使用情况 磁盘使用情况-->
          <drawCircle />
          <!--网络使用情况-->
          <!--netLine /-->
        </el-col>
      </el-tab-pane>

      <el-tab-pane label="状态" name="second">
        <!--状态信息-->
        <staticRecordMsg :staticdata="strdata" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import Settings from "@/components/Settings";
export default {
  props: ["item"],
  components: {
    RightPanel,
    Settings,
  },
  data() {
    return {
      activeName: "first",
      input: 1,
      checked: false,
      cpu: "",
      ssd: "",
      mem: "",
      rx: "",
      tx: "",
      series_data: new Array(),
      legend_names: new Array(),
      rx_name: new Array(),
      rx_data: new Array(),
      tx_name: new Array(),
      tx_data: new Array(),
      drawer: false,
      drawerWidth: "500px",
      strdata: [],
    };
  },
  //监听数据变化
  watch: {
    item: {
      handler(newVal) {
        this.item = newVal;
        this.getCPURate();
      },
      deep: true,
    },
  },
  methods: {
    getrealtime() {
      this.legend_names = [];
      this.series_data = [];
      this.$axios({
        method: "get",
        url: "sys/device/status/realtime/id?deviceId=" + this.item.deviceId,
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            for (var key in res.data.cpu.series) {
              this.legend_names.push(key);
              var swpdata = {};
              swpdata["name"] = key;
              swpdata["type"] = "line";
              swpdata["data"] = res.data.cpu.series[key];
              this.series_data.push(swpdata);
            }
            // this.legend_names.shift();
            // this.series_data.shift();
            // res.data.cpu.times.shift();
            let myChart = this.$echarts.init(document.getElementById("myChart"));
            myChart.setOption({
              legend: {
                data: this.legend_names,
                bottom: 0,
              },
              xAxis: {
                data: res.data.cpu.date,
              },
              series: this.series_data,
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
    getCPURate() {
      this.legend_names = [];
      this.series_data = [];
      this.$axios({
        method: "post",
        url: "/sys/device/status",
        data: JSON.stringify({
          id: this.item.deviceId,
          isSub: true,
          keys: ["bht_host_sys", "nettx", "netrx", "brt_bmc_sys"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            var items = res.data.data.status;
            this.strdata = res.data.data;
            this.getSSDRate(items);
            this.getMemRate(items);
            // this.getnettx(items);
            // this.getnetrx(items);
            // for (var key in items.bht_host_sys.cpu.series) {
            //   this.legend_names.push(key);
            //   var swpdata = {};
            //   swpdata["name"] = key;
            //   swpdata["type"] = "line";
            //   swpdata["data"] = items.bht_host_sys.cpu.series[key];
            //   this.series_data.push(swpdata);
            // }
            // this.legend_names.shift();
            // this.series_data.shift();
            // res.items.bht_host_sys.cpu.times.shift();

            // let myChart = this.$echarts.init(document.getElementById("myChart"));
            // myChart.setOption({
            //   legend: {
            //     data: this.legend_names,
            //     bottom: 0,
            //   },
            //   xAxis: {
            //     data: items.bht_host_sys.cpu.times,
            //   },
            //   series: this.series_data,
            // });
          } else {
            this.$message.error(res.data.msg);
            clearInterval(this.cpu);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
          clearInterval(this.cpu);
        });
    },
    getnetrx(items) {
      this.rx_name = [];
      this.rx_data = [];
      for (var key in items.bht_host_sys.netrx.series) {
        this.rx_name.push(key);
        var swpdata = {};
        swpdata["name"] = key;
        swpdata["type"] = "line";
        swpdata["data"] = items.bht_host_sys.netrx.series[key];
        this.rx_data.push(swpdata);
      }
      let myChart = this.$echarts.init(document.getElementById("Chartnetout"));
      myChart.setOption({
        legend: {
          data: this.rx_name,
          bottom: 0,
        },
        xAxis: {
          data: items.bht_host_sys.netrx.date,
        },
        series: this.rx_data,
      });
    },
    getnettx(items) {
      this.tx_name = [];
      this.tx_data = [];
      for (var key in items.bht_host_sys.nettx.series) {
        this.tx_name.push(key);
        var swpdata = {};
        swpdata["name"] = key;
        swpdata["type"] = "line";
        swpdata["data"] = items.bht_host_sys.nettx.series[key];
        this.tx_data.push(swpdata);
      }
      let myChart = this.$echarts.init(document.getElementById("Chartnetin"));
      myChart.setOption({
        legend: {
          data: this.tx_name,
          bottom: 0,
        },
        xAxis: {
          data: items.bht_host_sys.nettx.date,
        },
        series: this.tx_data,
      });
    },
    getSSDRate(items) {
      let myChart = this.$echarts.init(document.getElementById("container2"));
      myChart.setOption({
        series: [
          {
            data: [
              {
                value: items.brt_bmc_sys.SSDRate,
                name: "已占用磁盘",
              },
              {
                value: 100 - items.brt_bmc_sys.SSDRate,
                name: "未占用磁盘",
              },
            ],
          },
        ],
      });
    },
    getMemRate(items) {
      let myChart = this.$echarts.init(document.getElementById("container"));
      myChart.setOption({
        series: [
          {
            data: [
              {
                value: items.brt_bmc_sys.memRate,
                name: "已占用内存",
              },
              {
                value: 100 - items.brt_bmc_sys.memRate,
                name: "未占用内存",
              },
            ],
          },
        ],
      });
    },
    checkedFun(e, checkedFresh) {
      localStorage.setItem("check", e);
      console.log(e);
      if (e == true) {
        this.cpu = setInterval(this.getCPURate, parseInt(this.input) * 500);
      } else if (e == false) {
        clearInterval(this.cpu);
      }
    },
  },
  mounted: function () {
    this.getCPURate();
    $("#times").attr("checked", localStorage.getItem("check"));
  },
};
</script>
