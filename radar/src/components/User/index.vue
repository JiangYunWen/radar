<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button class="handle-add mr10" @click="addFile"
          ><i
            class="el-icon-circle-plus"
            style="font-size: 12px; color: #00ec00; margin-right: 5px"
          ></i
          >增加</el-button
        >
        <el-input
          placeholder="用户名"
          v-model="query.username"
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
        :data="tableData1"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名称"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间"></el-table-column>
        <el-table-column prop="editTime" label="修改时间" align="center">
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
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
      <div class="pagination">
        <el-pagination
          @size-change="changeSizeHandle"
          @current-change="currentChangeHandle"
          :current-page="query.pageIndex"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
          background
        >
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑用户" :visible.sync="editVisible" width="30%">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        style="width: 300px; margin-left: 50px"
      >
        <el-form-item label="用户名称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="form.roleIdList" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <template>
            <el-switch v-model="form.status"></el-switch>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!--用户增加弹出框-->
    <el-dialog title="增加用户 " :visible.sync="addVisible" width="30%">
      <el-form
        ref="form"
        :model="user"
        label-width="100px"
        style="width: 300px; margin-left: 50px"
      >
        <el-form-item label="用户名称">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="user.roleIdList" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <template>
            <el-switch
              v-model="user.status"
              active-value="0"
              inactive-value="1"
            ></el-switch>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
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
        username: "",
        limit: 10,
        pageIndex: 1,
        pageSize: 10,
      },
      tableData1: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      addVisible: false,
      user: {
        username: "",
        status: 0,
        roleIdList: [],
      },
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      options: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    checkRole() {
      this.$axios({
        method: "get",
        url: "/sys/user/info/" + this.form.userId,
        // headers: {
        //         'Content-Type': "application/json"
        //    },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.code === 0) {
            //勾选角色所拥有的菜单
            var menuIds = res.data.user.roleIdList;
            this.form.roleIdList = menuIds;
          }
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    getRole() {
      this.$axios({
        method: "get",
        url: "/sys/role/listData",
        withCredentials: true,
      })
        .then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.options = data.page.list;
            for (var i = 0; i < this.options.length; i++) {
              this.options[i] = {
                label: this.options[i].roleName,
                value: this.options[i].roleId,
              };
            }
          } else {
            this.$message.error(data.msg || "操作失败");
          }
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      this.$axios({
        method: "post",
        url: "/sys/user/listData",
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
            console.log(res.data.page.list);
            this.pageTotal = res.data.page.total || 10; //1页数据
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
    // 触发搜索按钮
    handleSearch() {
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      this.id = row.userId;

      // 二次确认删除
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
      ids.push(this.id + "");
      console.log(ids);
      this.$axios({
        method: "post",
        url: "/sys/user/delete",
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
        str.push(this.delList[i].id + "");
      }
      this.saveDelete(str);
      this.multipleSelection = [];
    },
    addFile() {
      this.addVisible = true;
      this.getRole();
    },
    saveAdd() {
      this.addVisible = false;
      this.$axios({
        method: "POST",
        url: "/sys/user/save",
        data: JSON.stringify(this.user),
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
    // 编辑操作
    handleEdit(index, row) {
      this.getRole();
      this.checkRole();

      this.idx = index;
      this.form = row;

      this.id = row.id;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      // 文件上传
      this.$axios({
        method: "POST",
        url: "/sys/user/update",
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
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.getData(); //局部刷新表格
          } else {
            this.$message.error(data.msg || "操作失败");
          }
        })
        .catch((e) => {
          this.$message.error(e);
        });
      // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      // this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    // 每页显示的条数改变
    changeSizeHandle(val) {
      this.query.pageSize = val; // 改变每页显示的条数
      this.query.pageIndex = 1; // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.getData(); // 点击每页显示的条数时，显示第一页
      console.log(`每页 ${val} 条`);
    },

    // current-change用于监听页数改变，而内容也发生改变
    currentChangeHandle(val) {
      this.query.pageIndex = val; // 改变默认的页数
      this.getData(); // 切换页码时，要获取每页显示的条数
      console.log(`当前页: ${val}`);
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
</style>
