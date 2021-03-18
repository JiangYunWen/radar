<template>
  <el-col :span="24">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <h3>静态信息</h3>
          </div>

          <el-table
            :data="tableData2"
            :header-cell-style="{ background: 'green', color: 'green' }"
            style="width: 100%"
          >
            <el-table-column
              prop="port"
              label="节点信息"
              header-align="left"
              align="center"
              style="font-size: 12px"
            ></el-table-column>
            <el-table-column prop="portValue" label=""></el-table-column>
            <el-table-column
              prop="firmware"
              label="FRU信息"
              header-align="left"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="firmwareModel" label=""> </el-table-column>
            <el-table-column
              prop="SSD"
              label="磁盘信息"
              header-align="left"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="SSDValue" label=""> </el-table-column>
          </el-table>
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column
              prop="cpu"
              label="CPU信息"
              header-align="left"
              align="center"
            ></el-table-column>
            <el-table-column prop="cpuValue" label=""></el-table-column>
            <el-table-column
              prop="mem"
              label="内存信息"
              header-align="left"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="memValue" label=""> </el-table-column>
            <el-table-column
              prop="os"
              label="操作系统信息"
              header-align="left"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="osValue" label=""> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card
          shadow="hover"
          :body-style="{ padding: '0px' }"
          style="height: 400px"
          v-if="this.staticdata.subtype != 7"
        >
          <div slot="header" class="clearfix">
            <h3>网卡信息</h3>
          </div>
          <el-table :data="configData" border height="200" style="width: 100%">
            <el-table-column prop="name" label="网卡名称"></el-table-column>
            <el-table-column prop="linkEncap" label="网卡类型"></el-table-column>
            <el-table-column prop="hwAddress" label="MAC地址"> </el-table-column>
            <el-table-column prop="speed" label="网卡带宽"> </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status === true" style="color: green">true</span>
                <span v-if="scope.row.status === false" style="color: red">false</span>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex; margin: 60px 600px">
            <el-button type="primary" style="width: 150px; margin-right: 30px"
              >获取</el-button
            >
            <el-button type="primary" style="width: 150px">设置</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card
          shadow="hover"
          :body-style="{ padding: '0px' }"
          style=""
          v-if="this.staticdata.subtype != 7"
        >
          <div slot="header" class="clearfix">
            <h3>系统进程运行状态</h3>
          </div>
          <el-table :data="progressData" border height="300" style="width: 100%">
            <el-table-column prop="uID" label="UID"> </el-table-column>
            <el-table-column prop="pID" label="PID"></el-table-column>
            <el-table-column prop="pPID" label="PPID"></el-table-column>
            <el-table-column prop="cPURate" label="C"> </el-table-column>
            <el-table-column prop="tTY" label="TTY"> </el-table-column>
            <el-table-column prop="tIME" label="TIME"> </el-table-column>
            <el-table-column prop="cMD" label="CMD"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
export default {
  props: ["staticdata"],
  data() {
    return {
      tableData2: [
        {
          port: "节点类型",
          portValue: "",
          firmware: "固件名",
          firmwareModel: "",
          SSD: "型号",
          SSDValue: "",
        },
        {
          port: "节点状态",
          portValue: false,
          firmware: "版本号",
          firmwareModel: "",
          SSD: "容量",
          SSDValue: "",
        },
      ],
      tableData1: [
        {
          cpu: "型号",
          cpuValue: "",
          mem: "容量",
          memValue: "",
          os: "节点编号",
          osValue: "",
        },
        {
          cpu: "核数",
          cpuValue: "",
          mem: "频率",
          memValue: "",
          os: "操作系统版本",
          osValue: "",
        },
      ],
      configData: [],
      progressData: [],
    };
  },
  methods: {
    bianli() {
      this.$axios({
        method: "post",
        url: "/sys/device/status",
        data: JSON.stringify({
          id: this.$route.params.menuId,
          isSub: true,
          keys: ["bst_info"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            var bst_info = res.data.data.status.bst_info;
            for (var bst in bst_info) {
              switch (bst) {
                case "nodeType":
                  this.tableData2[0].portValue = bst_info[bst];
                  break;
                case "alive":
                  if (bst_info[bst] == true) {
                    this.tableData2[1].portValue = "在线";
                  } else {
                    this.tableData2[1].portValue = "离线";
                  }
                  break;
                case "ssdmodel":
                  this.tableData2[0].SSDValue = bst_info[bst];
                  break;
                case "ssdSize":
                  this.tableData2[1].SSDValue = bst_info[bst];
                  break;
                case "BoardProduct":
                  this.tableData2[0].firmwareModel = bst_info[bst];
                  break;
                case "BoardSerial":
                  this.tableData2[1].firmwareModel = bst_info[bst];
                  break;

                case "cpumodel":
                  this.tableData1[0].cpuValue = bst_info[bst];
                  break;
                case "cpunumber":
                  this.tableData1[1].cpuValue = bst_info[bst];
                  break;
                case "ramSpeed":
                  this.tableData1[0].memValue = bst_info[bst];
                  break;
                case "rawSize":
                  this.tableData1[1].memValue = bst_info[bst];
                  break;
                case "osname":
                  this.tableData1[0].osValue = bst_info[bst];
                  break;
                case "osversion":
                  this.tableData1[1].osValue = bst_info[bst];
                  break;
              }
            }
            // this.configData = res.data.data.config.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
    getconfig() {
      this.$axios({
        method: "post",
        url: "/sys/device/getconfig",
        data: JSON.stringify({
          deviceId: this.$route.params.menuId,
          key: "bhost_netconfig",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.configData = res.data.data.config.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
    getProgressData() {
      this.$axios({
        method: "post",
        url: "/sys/device/status",
        data: JSON.stringify({
          id: this.$route.params.menuId,
          isSub: true,
          keys: ["bht_host_sysprocess"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.progressData = res.data.data.status.bht_host_sysprocess;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
  },
  mounted: function () {
    this.bianli();
    // this.getconfig();
    // this.getProgressData();
  },
};
</script>
