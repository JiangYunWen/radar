<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 系统日志
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <warn />
        </div>
    </div>
</template>

<script>
import warn from '@/components/utils/warn';
export default {
    components:{
        warn
    },
    data() {
        return {  
        };
    },
    methods: {
        }
};
</script>

<style scoped>

</style>
