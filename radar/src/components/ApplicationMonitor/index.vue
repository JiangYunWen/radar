<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 应用监控信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="4" style="height: 400px">
          <el-card shadow="hover" class="mgb20">
            <div slot="header" class="clearfix">
              <h2>应用列表</h2>
            </div>
            <el-tree
              :data="treedata"
              node-key="menuId"
              :default-expanded-keys="[246]"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick"
            ></el-tree>
          </el-card>
        </el-col>
        <el-col :span="20">
          <el-card shadow="hover" class="mgb20">
            <!--div class="handle-box">
                应用名: <el-input v-model="query.appname" placeholder="应用名" class="handle-input mr10"></el-input>
                所处节点: <el-input v-model="query.appnade" placeholder="所处节点" class="handle-input mr10"></el-input>
            </div-->
            <el-table
              :data="tableData1"
              border
              class="table"
              ref="multipleTable"
              header-cell-class-name="table-header"
              :cell-class-name="rowClass"
            >
              <el-table-column
                type="selection"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column prop="USER" label="USER"></el-table-column>
              <el-table-column prop="PID" label="PID" align="center"> </el-table-column>
              <el-table-column prop="CPU" label="CPU" align="center"></el-table-column>
              <el-table-column prop="MEM" label="MEM" align="center"></el-table-column>
              <el-table-column prop="VSZ" label="VSZ"></el-table-column>
              <el-table-column prop="RSS" label="RSS" align="center"></el-table-column>
              <el-table-column prop="TTY" label="TTY" align="center"></el-table-column>
              <el-table-column prop="STAT" label="STAT" align="center"></el-table-column>
              <el-table-column
                prop="START"
                label="START"
                align="center"
              ></el-table-column>
              <el-table-column prop="TIME" label="TIME" align="center"></el-table-column>
              <el-table-column
                prop="COMMAND"
                label="COMMAND"
                align="center"
              ></el-table-column>
            </el-table>
            <!--div class="pagination">
                <el-pagination @size-change="changeSizeHandle" @current-change="currentChangeHandle" :current-page="query.pageIndex" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal" background>
                </el-pagination>
            </div-->
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { fetchData } from '../../api/index';
export default {
  name: "basetable",
  data() {
    return {
      query: {
        appname: "",
        limit: 10,
        pageIndex: 1,
        pageSize: 10,
      },
      tableData1: [],
      multipleSelection: [],
      delList: [],
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      options: [],
      items: [],
      treedata: [],
      defaultProps: {
        children: "sublist",
        label: "name",
      },
    };
  },
  created() {
    this.getData();
    this.gettree();
  },
  methods: {
    gettree() {
      this.$axios({
        method: "get",
        url: "/sys/app/appdevices",
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.treedata = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败!");
        });
    },
    //控制树形菜单
    handleNodeClick(data) {
      this.tableData1 = [];
      this.$axios({
        method: "post",
        url: "/sys/device/status",
        data: JSON.stringify({
          id: data.deviceId,
          isSub: false,
          keys: ["bht_host_app_status"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            if (
              JSON.stringify(res.data.data.status.bht_host_app_status) != "{}" &&
              JSON.stringify(res.data.data.status.bht_host_app_status) != undefined
            ) {
              this.mapKeyValue(res.data.data.status.bht_host_app_status);
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败!");
        });
    },
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 5 && columnIndex === 4) {
        return "rgb196";
      } else if (rowIndex === 6 && columnIndex === 4) {
        return "bacColorf4984e";
      } else if (rowIndex === 6 && columnIndex === 5) {
        return "bacColor317eb0";
      }
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      this.$axios({
        method: "post",
        url: "/sys/device/status",
        data: JSON.stringify({
          isSub: true,
          keys: ["bht_host_app_status"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            for (var list in res.data.data.list) {
              var sublist = res.data.data.list[list].list;
              for (var su in sublist) {
                if (
                  JSON.stringify(sublist[su].status.bht_host_app_status) != "{}" &&
                  JSON.stringify(sublist[su].status.bht_host_app_status) != undefined
                ) {
                  this.mapKeyValue(sublist[su].status.bht_host_app_status);
                }
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败!");
        });
    },
    // 触发搜索按钮
    handleSearch() {
      this.getData();
    },
    mapKeyValue(status) {
      for (var key in status) {
        console.log(key + " = " + status[key]);
        this.tableData1.push(status[key]);
      }
    },
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 10px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 200px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

.el-table .rgb196 {
  background: rgb(196, 196, 196);
}

.el-table .bacColor317eb0 {
  background: #317eb0;
}

.el-table .bacColorf4984e {
  background: #f4984e;
}
</style>
