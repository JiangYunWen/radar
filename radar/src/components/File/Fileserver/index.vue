<template>
<el-tabs v-model="activeName" type="card">
    <el-tab-pane label="服务器" name="first">
        <el-container>
            <el-col :span="24">
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-card shadow="hover" :body-style="{padding: '0px'}" style="height:250px;">
                            <div slot="header" class="clearfix">
                                <h2>文件上传</h2>
                            </div>
                            <el-form ref="form" :model="form" label-width="70px" class="fileform">
                                <el-form-item label="文件名 ">
                                    <el-input v-model="form.fileName" style="width:170px;"></el-input>
                                </el-form-item>
                                <el-form-item label="文件 ">
                                    <input type="file" id="people-export" ref="inputer" />
                                </el-form-item>
                            </el-form>
                            <div class="filebtn">
                                <el-button type="primary" @click="saveAdd()">上传至服务器</el-button>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="20">
                        <el-card shadow="hover" :body-style="{padding: '0px'}" style="height:500px;">
                            <div slot="header" class="clearfix">
                                <h2>服务器文件</h2>
                            </div>
                            <el-table :data="tableData1" border ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange" height="380">
                                <el-table-column type="selection" width="55" align="center"></el-table-column>
                                <el-table-column prop="fileName" label="文件名称"></el-table-column>
                                <el-table-column prop="fileMd5" label="MD5" width="280"></el-table-column>
                                <el-table-column prop="url" label="资源名称"></el-table-column>
                                <el-table-column prop="fileSize" label="文件大小（KB）" align="center" width="150"></el-table-column>

                                <el-table-column label="操作" width="180" align="center">
                                    <template slot-scope="scope">
                                        <!--el-button
                                        type="text"
                                        icon="el-icon-edit"
                                        @click="handleEdit(scope.$index, scope.row)"
                                    >编辑</el-button-->
                                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!--分页组件-->
                            <div class="pagination">
                                <el-pagination @size-change="changeSizeHandle" @current-change="currentChangeHandle" :current-page="query.pageIndex" layout="total, sizes, prev, pager, next, jumper" :total="query.pageTotal" background>
                                </el-pagination>
                            </div>

                            <!--div class="btn">
                                <el-button type="primary"><i class="el-icon-upload2" style="font-size:12px;margin-right: 5px;"></i>上传</el-button>
                                <el-button type="danger" @click="delAllSelection"><i class="el-icon-delete" style="font-size:12px;margin-right: 5px;"></i>删除</el-button>
                            </div-->
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="hover" :body-style="{padding: '0px'}" style="height: 500px">
                            <div slot="header" class="clearfix">
                                <div class="selectsolt">
                                    <div>
                                        <h3>节点信息</h3>
                                    </div>
                                    <el-select v-model="value" size="mini" placeholder="请选择" style="width:100px;margin:0 15px;" @change="selectTrigger(value)">
                                        <el-option v-for="tree in items" :key="tree.deviceId" :label="tree.name" :value="tree.deviceId">{{tree.name}}</el-option>
                                    </el-select>
                                </div>
                            </div>
                            <el-table :data="soltData" border ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange" height="380">
                                <el-table-column type="selection" width="55" align="center"></el-table-column>
                                <el-table-column prop="status" label="状态" align="center">
                                    <template slot-scope="scope">
                                        <i v-if="scope.row.status===0" class="el-icon-s-opportunity" style="color:#FF2D2D"></i>
                                        <i v-if="scope.row.status===1" class="el-icon-s-opportunity" style="color:#44e95f"></i>

                                    </template>
                                </el-table-column>
                                <el-table-column prop="node" label="节点" align="center"></el-table-column>
                            </el-table>
                            <div class="online">
                                <i class="el-icon-s-opportunity" style="color:#44e95f"></i>在线
                                <i class="el-icon-s-opportunity" style="color:#FF2D2D"></i>不在线
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-container>
    </el-tab-pane>
    <el-tab-pane label="节点" name="second">
        <div>
            <span>选择机箱：</span>
            <el-select v-model="serverValue" placeholder="请选择机箱" @change="selectNode(serverValue)">
                <el-option v-for="tree in items" :key="tree.deviceId" :label="tree.name" :value="tree.deviceId">{{tree.name}}</el-option>
            </el-select>
        </div>
        <br />
        <div>
            <span>选择节点：</span>
            <el-select v-model="nodeValue" placeholder="请选择节点">
                <el-option v-for="node in nodeItems" :key="node.status" :label="node.node" :value="node.status">{{node.node}}</el-option>
            </el-select>
        </div>
        <br />
        <el-table :data="tableData1" border ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="fileName" label="文件名称"></el-table-column>
            <el-table-column prop="fileMd5" label="MD5" width="280"></el-table-column>
            <el-table-column prop="url" label="资源名称"></el-table-column>
            <el-table-column prop="fileSize" label="文件大小（KB）" align="center" width="150"></el-table-column>

            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页组件-->
        <div class="pagination">
            <el-pagination @size-change="changeSizeHandle" @current-change="currentChangeHandle" :current-page="query.pageIndex" layout="total, sizes, prev, pager, next, jumper" :total="query.pageTotal" background>
            </el-pagination>
        </div>
    </el-tab-pane>
</el-tabs>

<!--div class="container">
            <div class="handle-box">
                 <el-button
                     type="danger"
                    @click="delAllSelection"
                ><i class="el-icon-delete" style="font-size:12px;margin-right: 5px;" ></i>批量删除</el-button> 
                 <el-button
                    type="primary"
                    @click="addFile"
                ><i class="el-icon-upload2" style="font-size:12px;margin-right: 5px;" ></i>文件上传</el-button>
                <el-input v-model="query.fileNameVague" placeholder="文件名" style="width: 200px;" class="handle-input mr10 box"></el-input>
                <el-button   type="primary"  @click="handleSearch" class="box">
                    <i class="el-icon-search" style="font-size:12px;margin-right: 5px;" ></i>查询
                </el-button>
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
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="fileName" label="文件名称"></el-table-column>
                <el-table-column prop="fileMd5" label="MD5" width="280"></el-table-column>
                <el-table-column prop="url" label="资源名称"></el-table-column>
                <el-table-column prop="fileSize" label="文件大小（KB）" align="center" width="150" ></el-table-column>
                <el-table-column prop="createTime" label="上传时间"></el-table-column>
                <el-table-column prop="editTime" label="修改时间" align="center"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table-->

<!-- 编辑弹出框 -->
<!--el-dialog title="编辑" :visible.sync="editVisible" width="30%" >
            <el-form ref="form" :model="form" label-width="70px" style="width: 300px; margin-left:50px;">
                <el-form-item label="文件名 ">
                    <el-input v-model="form.fileName"></el-input>
                </el-form-item>
                <el-form-item label="文件 ">
                    <input type="file"  id="people-export" ref="inputer" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog-->

<!--文件上传弹出框-->
<!--el-dialog title="文件上传 " :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="file" label-width="70px" style="width: 300px; margin-left:50px;">
                <el-form-item label="文件名">
                    <el-input v-model="file.fileName" ></el-input>
                </el-form-item>
                <el-form-item label="文件 ">
                    <input type="file"  ref="inputer"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog-->
</template>

<script>
import pagination from '@/components/utils/pagination'
export default {
    components: {
        pagination
    },
    data() {
        return {
            query: {
                fileNameVague: '',
                limit: 10,
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 0
            },
            activeName: 'first',
            tableData1: [],
            soltData: [],
            items: [],
            deviceItems: [],
            nodeItems: [],
            nodeValue: '',
            serverValue: '',
            value: '',
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            file: {
                fileName: '',
                url: '',
            },
            form: {},
            idx: -1,
            id: -1,
        };
    },
    created() {
        this.getData();
        this.gettree();
        this.getNode();
    },
    methods: {
        getNode() {
            for (var i = 0; i < 14; i++) {
                this.soltData.splice(i, 1, {
                    "status": 0,
                    "node": "节点" + (i + 1)
                })
            }
        },
        //服务器界面机箱
        selectTrigger(value) {
            this.getNode();
            this.getDevice(value);
        },
        //节点界面
        selectNode(value) {
            this.nodeItems = [];
            this.getselectNode(value);
        },
        //节点数据获取
        getselectNode(value) {
            this.$axios({
                method: "post",
                url: '/sys/device/status',
                data: JSON.stringify({
                    id: value,
                    isSub: true,
                    keys: ['brt_bmc_sys']
                }),
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true,
            }).then(res => {
                if (res.data.code === 0) {
                    this.deviceItems = res.data.data.list;
                    var slotPositions = [];
                    // console.log('this.deviceItems',this.deviceItems);
                    for (var s = 0; s < this.deviceItems.length; s++) {
                        slotPositions.push({
                            slotPosition: this.deviceItems[s].slotPosition,
                            deviceId: this.deviceItems[s].deviceId,
                        });
                    }
                    console.log('slotPositions', slotPositions);
                    if (slotPositions.length !== 0) {
                        for (var i = 0; i < this.soltData.length; i++) {
                            for (var j = 0; j < slotPositions.length; j++) {
                                if ((i + 1) === slotPositions[j].slotPosition) {
                                    this.nodeItems.splice(i, 1, {
                                        "status": slotPositions[j].deviceId,
                                        "node": "节点" + (i + 1)
                                    })
                                }
                            }
                        }
                    } else {
                        this.$forceUpdate();
                        this.nodeItems = [];
                    }
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(error => {
                this.$message.error('获取数据失败！');
            });
        },
        //机箱数据获取
        getDevice(value) {
            this.$axios({
                method: "post",
                url: '/sys/device/status',
                data: JSON.stringify({
                    id: value,
                    isSub: true,
                    keys: ['brt_bmc_sys']
                }),
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true,
            }).then(res => {
                if (res.data.code === 0) {
                    this.deviceItems = res.data.data.list;
                    var slotPositions = [];
                    for (var s = 0; s < this.deviceItems.length; s++) {
                        slotPositions.push({
                            slotPosition: this.deviceItems[s].slotPosition,
                            deviceId: this.deviceItems[s].deviceId,
                        });
                    }
                    console.log('slotPositions', slotPositions);
                    if (slotPositions.length !== 0) {
                        for (var i = 0; i < this.soltData.length; i++) {
                            for (var j = 0; j < slotPositions.length; j++) {
                                if ((i + 1) === slotPositions[j].slotPosition) {
                                    this.soltData.splice(i, 1, {
                                        "status": 1,
                                        "node": "节点" + (i + 1)
                                    })
                                }
                            }
                        }
                    } else {
                        this.getNode();
                        this.$forceUpdate();
                    }
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(error => {
                this.$message.error('获取数据失败！');
            });
        },
        gettree() {
            this.$axios({
                method: "get",
                url: '/sys/app/appdevices',
                withCredentials: true,
            }).then(res => {
                if (res.data.code == 0) {
                    this.treedata = res.data.data;
                    console.log('res.data.data', res.data.data);
                    // for (var i = 0; i < res.data.data.length; i++) {
                    this.items = res.data.data;
                    // }
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(error => {
                this.$message.error('获取数据失败！');
            });
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            this.$axios({
                method: "post",
                url: '/sys/file/listData',
                data: JSON.stringify({
                    page: this.query.pageIndex,
                    limit: this.query.pageSize,
                    fileNameVague: this.query.fileNameVague
                }),
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true,
            }).then(res => {
                if (res.data.code == 0) {
                    for (let index = 0; index < res.data.page.list.length; index++) {
                        const element = res.data.page.list[index];
                        element.fileSize = (element.fileSize / 1024).toFixed(2);
                    }
                    this.tableData1 = res.data.page.list;
                    this.query.pageTotal = res.data.page.total || 10; //1页数据
                    this.query.pageIndex = res.data.page.page; //当前页
                    this.query.pageSize = res.data.page.limit; //数据总数
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(error => {
                this.$message.error('获取数据失败！');
            });

        },
        // 触发搜索按钮
        handleSearch() {
            console.log(this.query);
            // this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            this.id = row.id;
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.saveDelete();
                })
                .catch(() => {});
        },
        saveDelete() {
            let ids = [];
            ids.push(this.id + "");
            this.$axios({
                method: "POST",
                url: '/sys/file/delete',
                data: JSON.stringify(ids),
                // 设置请求头
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true, //跨域请求
            }).then((res) => {
                let data = res.data
                if (data.code == 0) {
                    this.$message.success('操作完成');
                    this.getData(); //局部刷新表格               
                } else {
                    this.$message.error(data.msg || '操作失败')
                }
            }).catch((e) => {
                this.$message.error(e)
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
        //文件上传
        // addFile() {
        //     // this.addVisible = true;
        // },
        saveAdd(event) {
            // this.addVisible = false;

            let formData = new FormData();
            formData.append('filename', this.form.fileName);
            formData.append('file', document.querySelector('input[type=file]').files[0]);
            // 文件上传
            this.$axios({
                method: "POST",
                url: '/sys/file/save',
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            }).then((res) => {
                let data = res.data
                if (data.code == 0) {
                    this.$message.success('操作完成');
                    this.getData(); //局部刷新表格               
                } else {
                    this.$message.error(data.msg || '操作失败')
                }
                this.uploadLoading = false
            }).catch((e) => {
                this.uploadLoading = false
                this.$message.error(e)
            });
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;

            this.id = row.id;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            let formData = new FormData();
            formData.append('id', this.id);
            formData.append('filename', this.form.fileName);
            formData.append('file', document.getElementById('people-export').files[0]);
            // 文件上传
            this.$axios({
                method: "POST",
                url: '/sys/file/update',
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            }).then((res) => {
                let data = res.data
                if (data.code == 0) {
                    // this.$message.success('操作完成') ;
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    this.getData(); //局部刷新表格               
                } else {
                    this.$message.error(data.msg || '操作失败')
                }
            }).catch((e) => {
                this.$message.error(e)
            });
        },
        // 分页导航
        // 每页显示的条数改变
        changeSizeHandle(val) {
            this.query.pageSize = val // 改变每页显示的条数 
            this.query.pageIndex = 1 // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.getData(); // 点击每页显示的条数时，显示第一页
            console.log(`每页 ${val} 条`)
        },
        // current-change用于监听页数改变，而内容也发生改变
        currentChangeHandle(val) {
            this.query.pageIndex = val // 改变默认的页数
            this.getData(); // 切换页码时，要获取每页显示的条数
            console.log(`当前页: ${val}`)
        }
    }
};
</script>

<style scoped>
.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.handle-box {
    margin-bottom: 10px;
}

.box {
    /* margin-bottom: 20px; */
    position: relative;
    left: 71%;
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
    margin: -55px 550px;

}

.fileform {
    width: 300px;
    position: relative;
    top: 40px;
    left: 200px;
}

.filebtn {
    position: relative;
    top: -10px;
    left: 500px;
}

.selectsolt {
    display: flex;
}

.online {
    margin: 10px 60px;
}
</style>
