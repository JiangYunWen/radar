<template>
<div class="drawer-container">
    <div>
        <h2 class="drawer-title">配置信息</h2>

        <div class="drawer-item">
            <!--span>Theme Color</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" /-->
            <div>
                <span>当前槽位</span>
            </div>
            <div class="box">
                <el-input v-model="solt" style="width:50px;float: right;"></el-input>
            </div>
        </div>

        <div class="drawer-item">
            <!--span>Open Tags-View</span>
        <el-switch v-model="tagsView" class="drawer-switch" /-->
            <span>电源控制</span>
            <div class="box">
                <el-button type="primary" @click="Action(1)">开机</el-button>
                <el-button type="primary" @click="Action(2)">关机</el-button>
                <el-button type="primary" @click="Action(3)">重启</el-button>
            </div>
        </div>

        <!--div class="drawer-item">
            <span>系统优化</span>
            <div class="box">
                <el-button type="primary">系统优化</el-button>
                <el-button type="primary">取消优化</el-button>
            </div>
        </div>

        <div class="drawer-item">
            <div>
                <span>WebShell</span>
            </div>
            <div class="box">
                <el-button type="primary" @click="term">启动WebShell</el-button>

            </div>
        </div>

        <div class="drawer-item">
            <span>系统备份</span>
            <div class="box">
                <el-button type="primary">备份</el-button>
                <el-button type="primary">还原</el-button>
            </div>
        </div-->

    </div>

    <!--el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <div id="terminal"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog-->
    <div id="terminal"></div>
</div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import {
    Terminal
} from 'xterm'
import layer from "layui-layer";

export default {
    props: ['soltab'],
    components: {
        ThemePicker
    },
    data() {
        return {
            solt: this.soltab.position,
            dialogVisible: false
        }
    },
    computed: {
        fixedHeader: {
            get() {
                return true
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'fixedHeader',
                    value: val
                })
            }
        },
        tagsView: {
            get() {
                return true
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'tagsView',
                    value: val
                })
            }
        },
        sidebarLogo: {
            get() {
                return true
            },
            set(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'sidebarLogo',
                    value: val
                })
            }
        }
    },
    methods: {
        IpmiCmd(cmd) {
            this.$axios({
                method: "POST",
                url: '/sys/device/cmd/ipmi',
                data: JSON.stringify(this.form),
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true,
            }).then((res) => {
                let data = res.data
                if (data.code == 0) {
                    this.$message.success('操作完成');
                } else {
                    this.$message.error(data.msg || '操作失败')
                }
                this.uploadLoading = false
            }).catch((e) => {
                this.uploadLoading = false
                this.$message.error(e)
            });
        },
        //命令
        Action(cmd) {
            this.$axios({
                method: "get",
                url: '/getData/getEnum?enumName=IpmiCmdEnum',
                withCredentials: true,
            }).then(res => {
                if (res.data.code == 0) {
                    this.IpmiCmdEnum = res.data.data;
                    for (var i = 0; i < this.IpmiCmdEnum.length; i++) {
                        if (this.IpmiCmdEnum[i].code === cmd) {
                            this.form.cmdid = this.IpmiCmdEnum[i].code;
                            this.IpmiCmd();
                        }
                    }

                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(error => {
                this.$message.error('获取数据失败！');
            });
        },
        themeChange(val) {
            this.$store.dispatch('settings/changeSetting', {
                key: 'theme',
                value: val
            })
        },

        //webshell
        term() {
            layer.open({
                title: "设置阀值",
                type: 1,
                area: ['300px'],
                content: $("#terminal"),
                btn: ['确认'],
                yes: function (index, layero) {

                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                }
            });
            // var term = new Terminal();
            // term.open(document.getElementById('terminal'));
            // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
        }
    },
    //监听数据变化
    watch: {
        soltab: {
            handler(newVal) {
                console.log('soltab', newVal);
                this.soltab = newVal;
                this.solt = this.soltab.position;
            },
            deep: true
        },
    },

}
</script>

<style lang="scss" scoped>
.drawer-container {
    width: 100%;
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, .85);
        font-size: 18px;
        line-height: 22px;
    }

    .drawer-item {
        color: rgba(0, 0, 0, .65);
        font-size: 16px;
        font-weight: bold;
        padding: 12px 0;
        display: flex;
    }

    .box {
        margin-left: 20px;
    }

    .drawer-switch {
        float: right
    }
}
</style>
