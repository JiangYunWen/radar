<template>
<div class="container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="配置" name="first">
            <el-container>
                <div>
                    <el-row :gutter="24">
                        <template v-if="items.length==1">
                            <el-col :span="24" v-for="device in items" :key="device.id">
                                <el-card shadow="hover" class="mgb20">
                                    <div slot="header" class="clearfix">
                                        <h2>{{device.name}}</h2>
                                    </div>
                                    <CrateSolt :msg="device.list" />
                                </el-card>
                            </el-col>
                        </template>
                        <template v-else>
                            <el-col :span="12" v-for="device in items" :key="device.id">
                                <el-card shadow="hover" class="mgb20">
                                    <div slot="header" class="clearfix">
                                        <h2>{{device.name}}</h2>
                                    </div>
                                    <CrateSolt :msg="device.list" />
                                </el-card>
                            </el-col>
                        </template>
                    </el-row>
                </div>
            </el-container>
        </el-tab-pane>
        <el-tab-pane label="报警" name="second">
            <warn />
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import warn from '@/components/utils/warn';
import CrateSolt from '@/components/CrateSolt';

const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
    components: {
        CrateSolt,
        warn
    },
    data() {
        return {
            query: {
                grade: '',
                limit: 10,
                pageIndex: 1,
                pageSize: 10
            },
            activeName: 'first',
            checkAll: false,
            checkedCities: ['上海', '北京'],
            cities: cityOptions,
            isIndeterminate: true,
            items: [],
            pageTotal: 0,
            tableData1: [],
        };
    },
    methods: {
        handleClick(e) {
            if (e.name === 'second') {
                this.getData();
            }
        },
        // 获取报警的模拟数据
        getData(str) {
            this.$axios({
                method: "post",
                url: '/sys/warn/listData',
                data: JSON.stringify({
                    page: this.query.pageIndex,
                    limit: this.query.pageSize,
                    grade: this.query.grade
                }),
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true,
            }).then(res => {
                if (res.data.code == 0) {
                    this.tableData1 = res.data.page.list;
                    this.pageTotal = res.data.page.total || 10; //数据总数
                    this.query.pageIndex = res.data.page.page; //当前页
                    this.query.pageSize = res.data.page.limit; //1页数据
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(error => {
                this.$message.error('获取数据失败！');
            });
        },
        //机箱数据获取
        getDevice() {
            this.$axios({
                method: "post",
                url: '/sys/device/status',
                data: JSON.stringify({
                    isSub: true,
                    keys: ['brt_bmc_sys']
                }),
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true,
            }).then(res => {
                if (res.data.code === 0) {
                    this.items = res.data.data.list;
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(error => {
                this.$message.error('获取数据失败！');
            });
        },
    },
    mounted: function () {
        this.getDevice();

    }

};
</script>
