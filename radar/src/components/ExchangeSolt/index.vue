<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="模块信息" name="first">

        <el-row :gutter="24" class="mgb20">
          <el-col :span="20">
            <el-card shadow="hover" :body-style="{ padding: '0px' }" style="height: 550px; width: auto">
              <div slot="header" class="clearfix">
                <h3>模块端口信息</h3>
              </div>
              <el-table :data="tableData1" border style="width: 100%" height="550">
                <el-table-column prop="Index" label="Index" align="center"> </el-table-column>
                <el-table-column prop="speed" label="speed" align="center"> </el-table-column>
                <el-table-column prop="mac" label="mac" align="center"> </el-table-column>
                <el-table-column prop="operStatus" label="operStatus" align="center"> </el-table-column>
                <el-table-column prop="inOctets" label="inOctets" align="center"> </el-table-column>
                <el-table-column prop="outOctets" label="outOctets" align="center"> </el-table-column>
                <el-table-column prop="inError" label="inError" align="center"> </el-table-column>
                <el-table-column prop="outError" label="outError" align="center"> </el-table-column>
                <el-table-column prop="inDiscard" label="inDiscard" align="center"> </el-table-column>

                <el-table-column prop="outDiscard" label="outDiscard" align="center"> </el-table-column>
                <el-table-column prop="inUcastPkts" label="inUcastPkts" align="center"> </el-table-column>
                <el-table-column prop="outUcastPkts" label="outUcastPkts" align="center"> </el-table-column>
                <el-table-column prop="inNUcastPkts" label="inNUcastPkts" align="center"> </el-table-column>
                <el-table-column prop="outNUcastPkts" label="outNUcastPkts" align="center"> </el-table-column>
              </el-table>

              <div class="pagination">
                <el-pagination @size-change="changeSizeHandle" @current-change="currentChangeHandle"
                  :current-page="query.pageIndex" layout="total, sizes, prev, pager, next, jumper"
                  :total="query.pageTotal" background>
                </el-pagination>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover" :body-style="{ padding: '0px' }" style="height: auto; width: auto">
              <div slot="header" class="clearfix">
                <h3>路由</h3>
              </div>
              <div v-for="o in tableRoute" :key="o" class="text">
                <span style="padding: 20px;line-height: 1.5em;">{{ o }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>

      </el-tab-pane>

      <!--el-tab-pane label="模块配置" name="second">
        <div style="display: flex; margin: 10px">
          <span style="margin-right: 20px">批量设置使能：</span>
          <el-select
            v-model="query.address"
            placeholder="==请选择=="
            class="handle-select"
            style="width: 120px"
          >
          </el-select>
          <el-button @click="drawer = true" type="primary" style="margin-left: 16px">
            设置使能
          </el-button>
        </div>
        <el-col :span="16">
          <el-row :gutter="20" class="mgb20">
            <el-col :span="12">
              <el-card
                shadow="hover"
                :body-style="{ padding: '0px' }"
                style="height: 450px; width: 1500px"
              >
                <div slot="header" class="clearfix">
                  <h3>交换模块端口信息</h3>
                </div>
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="port" label="端口号"></el-table-column>
                  <el-table-column prop="receive" label="mac地址"></el-table-column>
                  <el-table-column prop="receiveDiscard" label="对应的节点编号">
                  </el-table-column>
                  <el-table-column prop="receiveRetry" label="对应的节点网卡名">
                  </el-table-column>
                  <el-table-column label="使能">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.receiveBandwidth">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="display: flex; margin: 60px 600px">
                  <el-button type="primary" style="width: 100px; margin-right: 30px"
                    >获取</el-button
                  >
                  <el-button type="primary" style="width: 100px">设置</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-tab-pane-->
    </el-tabs>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {
        query: {
          limit: 10,
          pageIndex: 1,
          pageSize: 10,
          pageTotal: 0
        },

        activeName: 'first',
        options: [
          {
            value: 'enable',
            label: 'enable'
          },
          {
            value: 'disenable',
            label: 'disenable'
          }
        ],
        tableData1: [],
        tableRoute: [],
        tableData: [
          {
            port: 'eth0',
            receive: '以太网',
            receiveDiscard: '192.168.2.30',
            receiveRetry: 1,
            receiveBandwidth: 'disenable'
          },
          {
            port: 'eth1',
            receive: '以太网',
            receiveDiscard: '192.168.3.30',
            receiveRetry: 1,
            receiveBandwidth: 'enable'
          },
          {
            port: 'eth2',
            receive: '以太网',
            receiveDiscard: '192.168.4.30',
            receiveRetry: 1,
            receiveBandwidth: 'enable'
          },
          {
            port: 'eth3',
            receive: '以太网',
            receiveDiscard: '192.168.5.30',
            receiveRetry: 1,
            receiveBandwidth: 'enable'
          }
        ]
      };
    },
    methods: {
      // 获取 easy-mock 的模拟数据
      getData() {
        this.$axios({
          method: 'post',
          url: '/sys/device/status',
          data: JSON.stringify({
            id: this.item.deviceId,
            isSub: true,
            keys: ['brt_switch_port_status']
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
          .then((res) => {
            if (res.data.code == 0) {
              this.tableData1 = res.data.data.status.brt_switch_port_status.status;
              this.tableRoute = res.data.data.status.brt_switch_port_status.routes;
              // this.query.pageTotal = res.data.page.total || 10; //1页数据
              // this.query.pageIndex = res.data.page.page; //当前页
              // this.query.pageSize = res.data.page.limit; //数据总数
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((error) => {
            this.$message.error('获取数据失败！');
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
      }
    },
    mounted: function () {
      this.getData();
    }
  };
</script>

<style>
  .text {
    /* background-color: rgb(170, 175, 180); */
    font-size: 18px;
    margin-top: 2px;
    margin-bottom: 2px;
  }
</style>