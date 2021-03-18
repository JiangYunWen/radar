<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-lx-cascades"></i> API接口文档
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <div>
        <iframe v-bind:src="url" class="iframe"></iframe>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            url:"/apidoc"
        };

    },
    methods: {
        //设置cookie   name为cookie的名字，value是值，expiredays为过期时间（天数）
        setCookie (name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
        },
    },
    created:function(){
        // this.setCookie('JSESSIONID','44E539651257CBB9B2CE337AC48605D7',7);
    }
};
</script>

<style scoped>
.iframe{
    width: 100%;
    height: 800px;
}


</style>
