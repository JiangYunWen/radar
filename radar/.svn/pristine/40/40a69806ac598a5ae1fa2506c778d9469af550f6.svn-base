<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 应用分发
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          class="handle-add mr10"
          @click="addFile"
          >增加
        </el-button>
        <el-button type="danger" @click="delAllSelection"
          ><i class="el-icon-delete" style="font-size: 12px; margin-right: 5px"></i
          >删除</el-button
        >
      </div>
      <el-table
        :data="tableData1"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="应用名" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.appName"
              style="width: 150px"
              @change="handleEdit(scope.$index, scope.row)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="程序" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.appFileId"
              @change="handleEdit(scope.$index, scope.row)"
            >
              <el-option
                v-for="item in applications"
                :key="item.id"
                :label="item.fileName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="参数" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.appParam"
              style="width: 150px"
              @change="handleEdit(scope.$index, scope.row)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="节点" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.appNode"
              @click.native="setNodeDialog(scope.$index, scope.row)"
              ref="start"
              popper-class="select-class"
            >
              <el-option
                v-for="item in nodes"
                :key="item.deviceId"
                :label="item.name"
                :value="item.deviceId"
                hidden
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="调度优先级" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.startNow">
              <el-option
                v-for="item in startNows"
                :key="item.value"
                :label="item.lable"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="是否允许故障修复" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.appFaultRecovery"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="debug" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.appDebug"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="changeSizeHandle"
          @current-change="currentChangeHandle"
          :current-page="query.pageIndex"
          layout="total, sizes, prev, pager, next, jumper"
          :total="query.pageTotal"
          background
        >
        </el-pagination>
      </div>

      <div class="btn">
        <el-button type="primary" style="width: 5%" @click="control('start')"
          >运行</el-button
        >
        <el-button type="primary" style="width: 5%" @click="control('stop')"
          >停止</el-button
        >
        <el-button type="primary" style="width: 5%" @click="control('reset')"
          >重启</el-button
        >
      </div>
    </div>

    <!--增加弹出框-->
    <el-dialog title="增加应用 " :visible.sync="addVisible" width="30%">
      <el-form
        ref="form"
        :model="app"
        label-width="100px"
        style="width: 300px; margin-left: 50px"
      >
        <el-form-item label="应用名称">
          <el-input v-model="app.appName"></el-input>
        </el-form-item>
        <el-form-item label="程序">
          <el-select v-model="app.appFileId" placeholder="请选择">
            <el-option
              v-for="item in applications"
              :key="item.id"
              :label="item.fileName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数">
          <el-input v-model="app.appParam"></el-input>
        </el-form-item>
        <el-form-item label="节点">
          <el-select
            v-model="app.appNode"
            placeholder="请选择"
            @click.native="setNodeDialog1(1, app)"
            popper-class="select-class"
          >
            <el-option
              v-for="item in nodes"
              :key="item.deviceId"
              :label="item.name"
              :value="item.deviceId"
              hidden
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否允许故障修复">
          <el-switch v-model="app.appFaultRecovery" active-color="#13ce66"> </el-switch>
        </el-form-item>
        <el-form-item label="debug">
          <el-switch v-model="app.appDebug" active-color="#13ce66"> </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd()">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑节点弹出框-->
    <el-dialog title="编辑节点" :visible.sync="editVisible" width="30%">
      <div style="height: 400px" class="scrollbar">
        <el-scrollbar style="height: 100%">
          <el-form
            ref="form"
            :model="app"
            label-width="100px"
            style="width: 300px; margin-left: 50px"
          >
            <el-form-item label="节点" v-model="app.appNode">
              <ul id="menuTree" class="ztree"></ul>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit(1, app)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑节点1" :visible.sync="editVisible1" width="30%">
      <div style="height: 400px" class="scrollbar">
        <el-scrollbar style="height: 100%">
          <el-form
            ref="form"
            :model="app"
            label-width="100px"
            style="width: 300px; margin-left: 50px"
          >
            <el-form-item label="节点" v-model="app.appNode">
              <ul id="menuTree" class="ztree"></ul>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="saveNode()">确 定</el-button>
      </span>
    </el-dialog>
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
        pageTotal: 0,
      },
      app: {},
      tableData1: [],
      startNows: [],
      applications: [],
      nodes: [],
      multipleSelection: [],
      delList: [],
      strdata: [],
      editVisible: false,
      addVisible: false,
      editVisible1: false,
      form: {},
      idx: -1,
      id: -1,
      options: [],
      ztree: "",
      setting: {
        data: {
          simpleData: {
            enable: true,
            idKey: "deviceId",
            pIdKey: "parentId",
            rootPId: -1,
          },
          key: {
            url: "nourl",
            children: "sublist",
          },
        },
        check: {
          enable: true,
          nocheckInherit: true,
        },
      },
    };
  },
  created() {
    for (var s = 1; s <= 50; s++) {
      var str = {};
      str["value"] = s;
      str["lable"] = s;
      this.startNows.push(str);
    }
    this.getTreeData2();
    this.getData();
    this.getDatafile();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      this.$axios({
        method: "post",
        url: "/sys/app/listData",
        data: JSON.stringify({
          page: this.query.pageIndex,
          limit: this.query.pageSize,
          username: this.query.username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.tableData1 = res.data.page.list;
            for (var tab in this.tableData1) {
              //   this.tableData1[tab]["startNow"] = "";
              this.$set(this.tableData1[tab], "startNow", parseInt(tab) + 1);
            }
            console.log("this.sds", this.tableData1);
            this.query.pageTotal = res.data.page.total || 10; //1页数据
            this.query.pageIndex = res.data.page.page; //当前页
            this.query.pageSize = res.data.page.limit; //数据总数
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
    setNodeDialog(index, row) {
      this.$refs.start.blur();
      this.app = row;
      this.editVisible = true;
      this.getTreeData();
    },
    setNodeDialog1(index, row) {
      this.app = row;
      this.editVisible1 = true;
      this.getTreeData();
    },

    getTreeData() {
      this.$axios({
        method: "post",
        url: "/sys/device/select",
        data: JSON.stringify([2]),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          let data = res.data;
          // var sublist =[];

          if (data.code == 0) {
            for (var node in data.data) {
              for (var sub in data.data[node].sublist)
                this.nodes.push(data.data[node].sublist[sub]);
            }

            this.ztree = $.fn.zTree.init($("#menuTree"), this.setting, data.data);
            //展开所有节点
            this.ztree.expandAll(true);
          } else {
            this.$message.error(data.msg || "操作失败");
          }
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    getTreeData2() {
      this.$axios({
        method: "post",
        url: "/sys/device/select",
        data: JSON.stringify([2]),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          let data = res.data;
          if (data.code == 0) {
            for (var node in data.data) {
              for (var sub in data.data[node].sublist)
                this.nodes.push(data.data[node].sublist[sub]);
            }
          } else {
            this.$message.error(data.msg || "操作失败");
          }
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    getDatafile() {
      this.$axios({
        method: "post",
        url: "/sys/file/listData",
        data: JSON.stringify({
          page: this.query.pageIndex,
          limit: this.query.pageSize,
          username: this.query.username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.applications = res.data.page.list;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
    saveDelete(str) {
      this.$axios({
        method: "post",
        url: "/sys/app/delete",
        data: JSON.stringify(str),
        // 设置请求头
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, //跨域请求
      })
        .then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.$message.success("操作完成");
            this.getData(); //局部刷新表格
          } else {
            this.$message.error(data.msg || "操作失败");
          }
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = [];
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < this.delList.length; i++) {
        str.push(this.delList[i].appId + "");
      }
      this.saveDelete(str);
      this.multipleSelection = [];
    },
    addFile() {
      this.addVisible = true;
    },
    saveNode() {
      //获取选择的菜单
      this.editVisible1 = false;
      var nodes = this.ztree.getCheckedNodes(true);
      var menuIdList = new Array();
      for (var i = 0; i < nodes.length; i++) {
        menuIdList.push(nodes[i].deviceId);
      }

      //向form表单中添加选中的菜单
      if (menuIdList.length > 0) {
        this.app.appNode = menuIdList[1];
      }
    },
    saveAdd() {
      this.addVisible = false;

      this.$axios({
        method: "POST",
        url: "/sys/app/save",
        data: JSON.stringify(this.app),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.$message.success("操作完成");
            this.getData(); //局部刷新表格
          } else {
            this.$message.error(data.msg || "操作失败");
          }
          this.uploadLoading = false;
        })
        .catch((e) => {
          this.uploadLoading = false;
          this.$message.error(e);
        });
    },
    control(cmd) {
      const length = this.multipleSelection.length;
      var str = [];
      this.delList = [];
      this.delList = this.delList.concat(this.multipleSelection);

      //根据优先级排序后遍历
      str = this.delList.sort(function (a, b) {
        return a.startNow - b.startNow;
      });

      for (let i = 0; i < str.length; i++) {
        this.saveControl(str[i].appId, cmd);
      }
    },

    saveControl(str, cmd) {
      this.$axios({
        method: "POST",
        url: "/sys/app/control",
        data: JSON.stringify({
          appId: str,
          cmd: cmd,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.$message.success("操作完成");
            // this.getData(); //局部刷新表格
          } else {
            this.$message.error(data.msg || "操作失败");
          }
          this.uploadLoading = false;
        })
        .catch((e) => {
          this.uploadLoading = false;
          this.$message.error(e);
        });
    },
    // 编辑操作
    handleEdit(index, row) {
      this.form = row;
      this.editVisible = false;
      //获取选择的菜单
      var nodes = this.ztree.getCheckedNodes(true);
      var menuIdList = new Array();
      for (var i = 0; i < nodes.length; i++) {
        menuIdList.push(nodes[i]);
      }
      //向form表单中添加选中的菜单
      if (menuIdList.length > 0) {
        this.form.appNode = menuIdList[1].deviceId;
        // this.nodes=menuIdList;
      }

      this.$axios({
        method: "POST",
        url: "/sys/app/update",
        data: JSON.stringify(this.form),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          let data = res.data;
          if (data.code == 0) {
            // this.$message.success('操作完成') ;
            this.$message.success(`修改成功`);
            this.getData(); //局部刷新表格
            this.getTreeData2();
          } else {
            this.$message.error(data.msg || "操作失败");
          }
        })
        .catch((e) => {
          this.$message.error(e);
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
};
</script>

<style lang="less">
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

.btn {
  position: relative;
  left: 40%;
}

.select-class {
  z-index: 0 !important;
}

.scrollbar {
  white-space: nowrap;

  /*强制一行显示（看需要）*/
  .el-scrollbar {
    display: flex;
    justify-content: space-around;
    padding: 0 0px;
  }

  .el-scrollbar__wrap {
    /* 必要的*/
    overflow: scroll;
    width: 110%;
    /*隐藏侧边默认滚动条 （达不到效果可以自己试着微调） 如解决不了可尝试用 `margin-right -60px`*/
    height: 110%;
    /*隐藏底部滚动条  （100%如果达不到效果可以试着用110%）   */
  }
}
</style>
