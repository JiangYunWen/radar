<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> DSP升级
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="div">
                <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="命令类型" prop="command">
                        <el-select v-model="form.command" placeholder="请选择命令类型" @change="commandChange()">
                            <el-option label="更新指令" value="1"></el-option>
                            <el-option label="获取内核文件名称及版本号" value="2"></el-option>
                            <el-option label="软件复位" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="IP地址" prop="ip">
                        <el-input v-model="form.ip" style="width: 210px;"></el-input>
                    </el-form-item>
                    <el-form-item label="超时时间" prop="timeout">
                        <el-input v-model="form.timeout" style="width: 210px;"></el-input>
                    </el-form-item>

                    <el-form-item label="文件名称" prop="fileName" class="commandChange">
                        <el-input type="file" v-model="form.fileName" style="width: 210px;"></el-input>
                    </el-form-item>
                    <el-form-item label="烧录地址" prop="burnedIn" class="commandChange">
                        <el-input v-model="form.burnedIn" style="width: 210px;"></el-input>
                    </el-form-item>
                    <el-form-item label="版本信息" prop="version" class="commandChange">
                        <el-input v-model="form.version" style="width: 210px;"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">开始升级</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            /*ip正则验证*/
            var validcodeip = (rule, value, callback) => {
                const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('IP地址格式为xxx.xxx.xxx.xxx！'));
                }
            };
            return {
                form: {
                    command: '',
                    ip: '',
                    timeout: '2000',
                    fileName: '',
                    burnedIn: '',
                    version: ''
                },
                rules: {
                    command: [
                        { required: true, message: '请选择命令类型', trigger: 'change' }
                    ],
                    ip: [
                        { required: true, message: 'ip地址不能为空', trigger: 'blur' },
                        { validator: validcodeip, trigger: 'blur' }
                    ],
                    timeout: [
                        { required: true, message: '超时时间不建议为空', trigger: 'blur' },
                    ],
                    fileName:[
                        { min: 1, max: 20, message: '文件名称在 1 到 20 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        mounted() {
            $(".commandChange").hide();
        },
        methods: {

            onSubmit() {
                let formData = new FormData();
                formData.append('cmd', parseInt(this.form.command));
                formData.append('dspip', this.form.ip);
                formData.append('timeout', parseInt(timeout));
                if(this.form.command==="1"){
                    formData.append('address', burnedIn);
                    formData.append('version', version);
                    formData.append('file', document.querySelector('input[type=file]').files[0]);
                }

                this.$axios({
                    method: "post",
                    url: "/sys/device/dspcmd",
                    data: formData,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
                    .then((res) => {
                        if (res.data.code == 0) {
                            this.$message.success("升级完成！");
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                    .catch((error) => {
                        this.$message.error("获取数据失败！");
                    });
            },

            commandChange() {
                if (this.form.command === "1") {
                    $(".commandChange").show();
                } else {
                    $(".commandChange").hide();
                }
            }

        }
    };
</script>

<style scoped>
    .div {
        margin-left: 40%;
        margin-right: 40%;
    }
</style>