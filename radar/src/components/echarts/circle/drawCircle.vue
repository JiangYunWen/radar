<template>
<el-row :gutter="24" class="mgb20">
    <el-col :span="12">
        <el-card shadow="hover" :body-style="{padding: '0px'}" >
            <div slot="header" class="clearfix">
                <h3>内存占用率</h3>
        </div>    
        <div id="container" :style="{width: '100%', height: '500px'}"></div>
        </el-card>
    </el-col>
    <el-col :span="12">
        <el-card shadow="hover" :body-style="{padding: '0px'}" >
        <div slot="header" class="clearfix">
            <h3>磁盘占用率</h3>
        </div>    
        <div id="container2" :style="{width: '100%', height: '500px'}"></div>
        </el-card>
    </el-col>
</el-row>
   
</template>
<script>
export default {   
    // props: ['id'],
    data(){
        return{
        }
    },
    methods:{
        drawC(){          
            let myChart = this.$echarts.init(document.getElementById('container'));
            myChart.setOption({
              title: {
                // text: '某站点用户访问来源',
                // subtext: '纯属虚构',
                // left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['已占用内存', '未占用内存']
                },
                series: [
                    {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
            });
        },
         drawC2(){
            let myChart = this.$echarts.init(document.getElementById('container2'));
            myChart.setOption({
                    title: {
                // text: '某站点用户访问来源',
                // subtext: '纯属虚构',
                // left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['已占用磁盘', '未占用磁盘']
                },
                series: [
                    {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [
                        // {value: 310, name: '未占用磁盘'},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
            });
        }
        },
        mounted:function(){
            this.drawC();
            this.drawC2();
        }
}
</script>