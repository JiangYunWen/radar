<template>
    <div class="pagination">
            <el-pagination 
            @size-change="changeSizeHandle" 
            @current-change="currentChangeHandle"
            :current-page="query.pageIndex"  
            layout="total, sizes, prev, pager, next, jumper" 
            :total="query.pageTotal" background>
        </el-pagination>
    </div>
</template>
<script>
export default {
    props:['query1'],
    data() {
        return {
            query: this.query1,
        };
    },
    methods: {
        // 分页导航
        // 每页显示的条数改变
        changeSizeHandle(val) {
            this.query.pageSize = val         // 改变每页显示的条数 
            this.query.pageIndex = 1          // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.$parent.getData();          // 点击每页显示的条数时，显示第一页
            console.log(`每页 ${val} 条`)
        },
        // current-change用于监听页数改变，而内容也发生改变
        currentChangeHandle(val) {
            this.query.pageIndex = val            // 改变默认的页数
            this.$parent.getData();                        // 切换页码时，要获取每页显示的条数
            console.log(`当前页: ${val}`)
        }
    },
}
</script>
