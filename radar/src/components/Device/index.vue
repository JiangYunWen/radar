<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 设备管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="4" style="height: 400px">
          <el-card shadow="hover" class="mgb20">
            <div slot="header" class="clearfix">
              <h2>设备列表</h2>
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
            <div class="handle-box">
              <el-button class="handle-add mr10" @click="addDevice"
                ><i
                  class="el-icon-circle-plus"
                  style="font-size: 12px; color: #00ec00; margin-right: 5px"
                ></i
                >增加</el-button
              >
              <el-input
                placeholder="设备名"
                v-model="form.name"
                class="handle-input mr10"
              ></el-input>
              <el-button @click="handleSearch"
                ><i
                  class="el-icon-search"
                  style="font-size: 12px; color: blue; margin-right: 5px"
                ></i
                >搜索</el-button
              >
            </div>
            <el-table
              :data="items"
              style="width: 100%; margin-bottom: 20px"
              border
              stripe
              default-expand-all
            >
              <el-table-column prop="deviceId" label="设备编号"></el-table-column>
              <el-table-column prop="name" label="设备名称" width="180"></el-table-column>

              <el-table-column
                prop="type"
                label="设备类型"
                width="180"
                :formatter="formatType"
              >
              </el-table-column>
              <el-table-column
                prop="subtype"
                label="设备子类型"
                width="180"
                :formatter="formatsubType"
              >
              </el-table-column>
              <el-table-column prop="hostIp" label="主机IP"></el-table-column>
              <el-table-column prop="ipmiIp" label="BMCIP"></el-table-column>
              <el-table-column prop="position" label="槽位号"></el-table-column>

              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <!--分页组件>
                    <pagination  :query1="form"/-->
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑设备" :visible.sync="editVisible" width="30%">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        style="width: 300px; margin-left: 50px"
      >
        <el-form-item label="设备名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="item.code" :key="item.code" v-for="item in type">{{
              item.value
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="form.type === 4">
          <el-form-item label="设备子类型">
            <el-select v-model="form.subtype">
              <el-option
                v-for="device in deviceType"
                :key="device.code"
                :label="device.value"
                :value="device.code"
                >{{ device.value }}</el-option
              >
            </el-select>
            <!--el-radio-group v-model="form.subtype">
                <el-radio :label="item.code" :key="item.code" v-for="item in deviceType">{{item.value}}</el-radio>
            </el-radio-group-->
          </el-form-item>
        </template>
        <template v-else-if="form.type === 5">
          <el-form-item label="上级设备">
            <el-select v-model="form.parentId">
              <el-option
                v-for="tree in items1"
                :key="tree.deviceId"
                :label="tree.name"
                :value="tree.deviceId"
                >{{ tree.name }}</el-option
              >
            </el-select>
            <!--el-radio-group v-model="form.subtype">
                        <el-radio :label="item.code" :key="item.code" v-for="item in deviceType">{{item.value}}</el-radio>
                    </el-radio-group-->
          </el-form-item>
          <el-form-item label="设备子类型">
            <el-select v-model="form.subtype">
              <el-option
                v-for="solt in subtype"
                :key="solt.code"
                :label="solt.value"
                :value="solt.code"
              >
                {{ solt.value }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="主机IP">
            <el-input v-model="form.hostIp"></el-input>
          </el-form-item>
          <el-form-item label="BMCIP">
            <el-input v-model="form.ipmiIp"></el-input>
          </el-form-item>
          <template v-if="form.subtype === 6">
            <el-form-item label="槽位号" hidden>
              <el-input v-model="form.position"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="槽位号">
              <el-input v-model="form.position"></el-input>
            </el-form-item>
          </template>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!--增加弹出框-->
    <el-dialog title="增加设备" :visible.sync="addVisible" width="40%">
      <el-form
        :model="addform"
        :rules="rules"
        ref="addform"
        label-width="100px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="addform.name"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-radio-group v-model="addform.type">
            <el-radio :label="item.code" :key="item.code" v-for="item in type">{{
              item.value
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="addform.type === 4">
          <el-form-item label="设备子类型">
            <el-select v-model="addform.subtype">
              <el-option
                v-for="device in deviceType"
                :key="device.code"
                :label="device.value"
                :value="device.code"
                >{{ device.value }}</el-option
              >
            </el-select>
          </el-form-item>
        </template>
        <template v-else-if="addform.type === 5">
          <el-form-item label="上级设备">
            <el-select v-model="addform.parentId">
              <el-option
                v-for="tree in items1"
                :key="tree.deviceId"
                :label="tree.name"
                :value="tree.deviceId"
                >{{ tree.name }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="设备子类型">
            <el-select v-model="addform.subtype">
              <el-option
                v-for="solt in subtype"
                :key="solt.code"
                :label="solt.value"
                :value="solt.code"
              >
                {{ solt.value }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="主机IP" prop="hostIp">
            <el-input v-model="addform.hostIp"></el-input>
          </el-form-item>
          <el-form-item label="BMCIP" prop="ipmiIp">
            <el-input v-model="addform.ipmiIp"></el-input>
          </el-form-item>
          <template v-if="addform.subtype == 6">
            <el-form-item label="槽位号" hidden>
              <el-input v-model="addform.position"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="槽位号">
              <el-input v-model="addform.position"></el-input>
            </el-form-item>
          </template>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd('addform')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/utils/pagination";
export default {
  components: {
    pagination,
  },
  data() {
    let validateIPAddress = (rule, value, callback) => {
      let regexp = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
      let valdata = value.split(",");
      let isCorrect = true;
      if (valdata.length) {
        for (let i = 0; i < valdata.length; i++) {
          if (regexp.test(valdata[i]) == false) {
            isCorrect = false;
          }
        }
      }
      if (value == "") {
        return callback(new Error("请输入iP地址"));
      } else if (!isCorrect) {
        callback(new Error("请输入正确的ip地址"));
      } else {
        callback();
      }
    };
    return {
      form: {
        id: "",
        name: "",
        type: "",
        subtype: "",
        parentId: "",
        hostIp: "",
        ipmiIp: "",
        position: "",
        limit: 10,
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 0,
      },
      addform: {},
      items: [],
      items1: [],
      treedata: [],
      defaultProps: {
        children: "sublist",
        label: "name",
      },
      tableData: [],
      solts: [],
      type: [],
      deviceType: [],
      subtype: [],
      editVisible: false,
      addVisible: false,
      idx: -1,
      rules: {
        name: [
          {
            required: true,
            message: "请输入设备名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择设备类型",
            trigger: "change",
          },
        ],
        hostIp: [
          {
            required: true,
            validator: validateIPAddress,
            trigger: ["blur"],
          },
        ],
        ipmiIp: [
          {
            required: true,
            validator: validateIPAddress,
            trigger: ["blur"],
          },
        ],
      },
    };
  },
  methods: {
    gettree() {
      this.$axios({
        method: "get",
        url: "/sys/device/select",
        // data: JSON.stringify({
        //     subtypes: []
        // }),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.treedata = res.data.data;
            for (var i = 0; i < res.data.data.length; i++) {
              this.items = res.data.data[i].sublist;
            }
            this.items1 = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
    gettype() {
      this.$axios({
        method: "get",
        url: "/getData/getEnum?enumName=DeviceEnum",
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.type = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
    formatType(row, column) {
      var typelable = "";
      for (var i = 0; i < this.type.length; i++) {
        if (row.type === this.type[i].code) {
          typelable = this.type[i].value;
        }
      }
      return typelable;
    },
    getDevicetype() {
      this.$axios({
        method: "get",
        url: "/getData/getEnum?enumName=ChassisEnum",
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.deviceType = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
    getSubtype() {
      this.$axios({
        method: "get",
        url: "/getData/getEnum?enumName=BladeEnum",
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.subtype = res.data.data;
            this.subtype.shift();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败！");
        });
    },
    formatsubType(row, column) {
      var typelable = "";
      for (var i = 0; i < this.type.length; i++) {
        if (row.type === this.type[i].code && this.type[i].code === 4) {
          for (var d = 0; d < this.deviceType.length; d++) {
            if (row.subtype === this.deviceType[d].code) {
              typelable = this.deviceType[d].value;
            }
          }
        } else if (row.type === this.type[i].code && this.type[i].code === 5) {
          for (var j = 0; j < this.subtype.length; j++) {
            if (row.subtype === this.subtype[j].code) {
              typelable = this.subtype[j].value;
            }
          }
        }
      }
      return typelable;
    },
    //添加设备
    addDevice() {
      this.addVisible = true;
    },
    saveAdd(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.addVisible = false;
          if (this.addform.parentId == "") {
            this.addform.parentId = this.items[0].parentId;
          }
          this.$axios({
            method: "POST",
            url: "/sys/device/save",
            data: JSON.stringify(this.addform),
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
            .then((res) => {
              let data = res.data;
              if (data.code == 0) {
                this.$message.success("操作完成");
                this.gettree(); //局部刷新表格
              } else {
                this.$message.error(data.msg || "操作失败");
              }
              this.uploadLoading = false;
            })
            .catch((e) => {
              this.uploadLoading = false;
              this.$message.error(e);
            });
        } else {
          return false;
        }
      });
    },
    // 触发搜索按钮
    handleSearch() {
      this.gettree();
    },
    // 删除操作
    handleDelete(index, row) {
      if (row.type === 4) {
        this.form.id = row.menuId;
      } else {
        this.form.id = row.deviceId;
      }
      // 确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.saveDelete();
        })
        .catch(() => {});
    },
    saveDelete() {
      let ids = [];
      ids.push(this.form.id + "");
      this.$axios({
        method: "post",
        url: "/sys/device/delete",
        data: JSON.stringify(ids),
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
            this.gettree(); //局部刷新表格
          } else {
            this.$message.error(data.msg || "操作失败");
          }
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    // 编辑操作
    handleEdit(index, row) {
      this.editVisible = true;
      // this.idx = index;
      this.form = row;
      if (row.type === 4) {
        this.form.id = row.menuId;
      } else {
        this.form.id = row.deviceId;
      }
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      // 文件上传
      this.$axios({
        method: "POST",
        url: "/sys/device/update",
        data: JSON.stringify(this.form),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.$message.success("操作完成");
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.gettree(); //局部刷新表格
          } else {
            this.$message.error(data.msg || "操作失败");
          }
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    //控制树形菜单
    handleNodeClick(data) {
      if (data) {
        if (data.sublist.length > 0) {
          this.items = data.sublist;
        } else {
          var select = [];
          select.push(data);
          this.items = select;
        }
      }
    },
  },
  created: function () {
    this.gettype();
    this.getDevicetype();
    this.getSubtype();
    this.gettree();
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
</style>
