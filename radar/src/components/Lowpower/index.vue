<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="模块信息" name="first">
        <el-col :span="24">
          <el-row :gutter="24" class="mgb20">
            <el-col :span="24">
              <el-card
                shadow="hover"
                :body-style="{ padding: '0px' }"
                style="width: 100%"
              >
                <div slot="header" class="clearfix">
                  <h3>模块信息</h3>
                </div>
                <!--table style="width: 100%" class="myTable">
                                <tr v-for="(item,i) in tableData1" :key="i">
                                    <td class="column">{{ item.key }}</td>
                                    <td class="column">{{ item.value }}</td>
                                </tr>
                            </table-->
                <el-table :data="tableData1" border style="width: 100%">
                  <el-table-column prop="BoardTemp" label="BoardTemp"></el-table-column>
                  <el-table-column prop="DIMMTemp" label="DIMMTemp"></el-table-column>
                  <el-table-column prop="P1V05" label="P1V05"> </el-table-column>
                  <el-table-column prop="P1V05_SUS" label="P1V05_SUS"> </el-table-column>
                  <el-table-column prop="P1V5" label="P1V5"> </el-table-column>
                  <el-table-column prop="P3V3" label="P3V3"> </el-table-column>
                  <el-table-column prop="P3V3_AUX" label="P3V3_AUX"> </el-table-column>
                  <el-table-column prop="P5V" label="P5V"> </el-table-column>
                  <el-table-column prop="P12V" label="P12V"> </el-table-column>
                  <el-table-column prop="SSDRate" label="SSDRate"></el-table-column>

                  <el-table-column prop="VCCIN" label="VCCIN"> </el-table-column>
                  <el-table-column prop="VCCIO" label="VCCIO"> </el-table-column>
                  <el-table-column prop="VDDQ_AB" label="VDDQ_AB"> </el-table-column>
                  <el-table-column prop="VDDQ_CD" label="VDDQ_CD"> </el-table-column>
                  <el-table-column prop="VPP_AB" label="VPP_AB"> </el-table-column>
                  <el-table-column prop="VPP_CD" label="VPP_CD"></el-table-column>

                  <el-table-column prop="VTT_AB" label="VTT_AB"> </el-table-column>
                  <el-table-column prop="VTT_CD" label="VTT_CD"> </el-table-column>
                  <el-table-column prop="VideoCardtemp" label="VideoCardtemp">
                  </el-table-column>
                  <el-table-column prop="biosversion" label="biosversion">
                  </el-table-column>
                  <el-table-column prop="cpumodel" label="cpumodel"> </el-table-column>
                  <el-table-column prop="cpurate" label="cpurate"></el-table-column>

                  <el-table-column prop="cputemp" label="cputemp"> </el-table-column>
                  <el-table-column prop="eth0Rate" label="eth0Rate"> </el-table-column>
                  <el-table-column prop="eth1Rate" label="eth1Rate"> </el-table-column>
                  <el-table-column prop="eth2Rate" label="eth2Rate"> </el-table-column>
                  <el-table-column prop="eth3Rate" label="eth3Rate"> </el-table-column>
                  <el-table-column prop="eth4Rate" label="eth4Rate"></el-table-column>

                  <el-table-column prop="eth5Rate" label="eth5Rate"> </el-table-column>
                  <el-table-column prop="inletTemp" label="inletTemp"> </el-table-column>
                  <el-table-column prop="memRate" label="memRate"> </el-table-column>
                  <el-table-column prop="osversion" label="osversion"> </el-table-column>
                  <el-table-column prop="outletTemp" label="outletTemp">
                  </el-table-column>
                  <el-table-column prop="ramSpeed" label="ramSpeed"></el-table-column>

                  <el-table-column prop="rawSize" label="rawSize"> </el-table-column>
                  <el-table-column prop="servicePack" label="servicePack">
                  </el-table-column>
                  <el-table-column prop="ssdsize" label="ssdsize"> </el-table-column>
                  <el-table-column prop="sysversion" label="sysversion">
                  </el-table-column>
                  <el-table-column prop="usedSSDSize" label="usedSSDSize">
                  </el-table-column>
                </el-table>

                <!--div class="pagination">
                                <el-pagination @size-change="changeSizeHandle" @current-change="currentChangeHandle" :current-page="query.pageIndex" layout="total, sizes, prev, pager, next, jumper" :total="query.pageTotal" background>
                                </el-pagination>
                            </div-->
              </el-card>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="24">
          <el-row :gutter="24" class="mgb20">
            <el-col :span="24">
              <el-card
                shadow="hover"
                :body-style="{ padding: '0px' }"
                style="width: 100%"
              >
                <div slot="header" class="clearfix">
                  <h3>模块信息2</h3>
                </div>
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="BoardMfg" label="BoardMfg"></el-table-column>
                  <el-table-column
                    prop="BoardProduct"
                    label="BoardProduct"
                  ></el-table-column>
                  <el-table-column prop="BoardSerial" label="BoardSerial">
                  </el-table-column>
                </el-table>

                <!--div class="pagination">
                    <el-pagination @size-change="changeSizeHandle" @current-change="currentChangeHandle" :current-page="query.pageIndex" layout="total, sizes, prev, pager, next, jumper" :total="query.pageTotal" background>
                    </el-pagination>
                </div-->
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      query: {
        limit: 10,
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 0,
      },
      activeName: "first",
      tableData1: [],
      tableData: [],
    };
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      this.$axios({
        method: "post",
        url: "/sys/device/status",
        data: JSON.stringify({
          id: this.item.deviceId,
          isSub: false,
          // keys: ['brt_switch_port_status']
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.tableData1.push(res.data.data.status.brt_bmc_sys);
            this.tableData.push(res.data.data.status.bst_bmc_fru);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
    // 分页导航
    // 每页显示的条数改变
    changeSizeHandle(val) {
      this.query.pageSize = val; // 改变每页显示的条数
      this.query.pageIndex = 1; // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.getData(); // 点击每页显示的条数时，显示第一页
    },

    // current-change用于监听页数改变，而内容也发生改变
    currentChangeHandle(val) {
      this.query.pageIndex = val; // 改变默认的页数
      this.getData(); // 切换页码时，要获取每页显示的条数
    },
  },
  mounted: function () {
    this.getData();
  },
};
</script>

<style scoped>
.myTable {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}

.myTable td,
.myTable th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 60px;
}
</style>
