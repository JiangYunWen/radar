<template>
<el-row :gutter="24" class="mgb20">
    <el-col :span="24">
        <el-card shadow="hover" :body-style="{padding: '0px'}" style="height:450px;">
            <div slot="header" class="clearfix">
                <h2>CPU使用情况</h2>
            </div>
            <!--div id="myChart" :style="{width: '1550px', height: '350px'}"></div-->
            <div id="myChart" :style="{width: '100%', height: '350px'}"></div>
        </el-card>
    </el-col>
</el-row>
</template>

<script>
export default {
    // props: ['id'],
    data() {
        return {}
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            myChart.setOption({
                title: {
                    text: 'CPU',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: [],
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar', 'stack', 'tiled']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                    type: 'value',
                    boundaryGap: false,
                    // max:100,
                    min: 0
                }],
                series: [{
                    type: "line"
                }]
            });
        },
    },
    mounted: function () {
        this.drawLine();
    }
}
</script>
