<template>
<div class="sidebar">
    <el-menu class="sidebar-el-menu" :collapse="collapse" @close="handleClose" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
        <template v-for="item in items.menuList">
            <template v-if="item.sublist">
                <el-submenu :index="item.url" :key="item.url">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </template>
                    <template v-for="(subItem,j) in item.sublist">
                        <el-submenu v-if="subItem.sublist" :title="subItem.name" :id="subItem.menuId" :index="subItem.url" :key="j">
                            <template slot="title" v-if="subItem.type===4">
                                <div class="submenu_block">
                                    <div class="submenu_title" @click="onTitleClick"><i class="el-icon-film"></i>{{ subItem.name}}</div>
                                    <div class="submenu_ico_block"><i class="el-submenu__icon-arrow el-icon-arrow-down"></i></div>
                                </div>
                            </template>
                            <template slot="title" v-else>
                                <i :class="subItem.icon"></i>&nbsp;&nbsp;
                                <template slot="title">{{ subItem.name }} </template>
                            </template>

                            <el-menu-item v-for="(threeItem,i) in subItem.sublist" :key="i" @click="menunItem(threeItem)"> <i :class="threeItem.icon"></i>{{ threeItem.name }}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="subItem.url" :key="j" @click="menunItem(subItem)"> <i :class="subItem.icon"></i>{{ subItem.name }}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.url" :key="item.url">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: []
        };
    },
    mounted: function () {
        this.menu();
    },
    methods: {
        menu() {
            this.$axios({
                method: 'get',
                url: '/sys/menu/user',
                withCredentials: true,
            }).then(res => {
                if (res.data.code == 0) {
                    this.items = res.data;
                    console.log(' this.items ', this.items);
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(error => {
                this.$message.error('账号或密码错误');
            });
        },
        menunItem(threeItem) {

            // var sd=threeItem.url.substring

            // if (threeItem.url === '/sys/menu/deviceStatus' || threeItem.url === '/sys/menu/solt' || threeItem.url === '/sys/menu/exchangeSolt') {
            this.$router.push({
                path: threeItem.url,
                query: {
                    title: threeItem.name,
                    subtype: threeItem.subtype,
                    item: threeItem
                }
            });
            // localStorage.setItem('menuId', threeItem.deviceId);
            // console.log(localStorage.getItem('menuId'));
            // localStorage.setItem('subtype', threeItem.subtype);
            // console.log(localStorage.getItem('subtype'));
            // } else {
            //     this.$router.push({
            //         path: threeItem.url,
            //         query: {
            //             title: threeItem.name,
            //             item: threeItem
            //         }
            //     });
            // }

        },
        handeSelect(index, indexPath) {
            console.log("Select", index, indexPath);
        },
        handleClose(key, keyPath) {
            console.log("Close", key, keyPath);
        },
        onTitleClick(e) {
            e.stopPropagation();
            var obj = e.target.parentNode.parentNode.parentNode.__vue__;
            this.$router.push({
                path: obj.index,
                query: {
                    title: obj.referenceElm.title
                }
            });
        }
    },

    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    updated() {
        this.handleClose('sys/aa', ['sys/aa']);
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar>ul {
    height: 100%;
}

.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
    -webkit-transform: rotateZ(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotateZ(-90deg);
}

.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
    -webkit-transform: rotateZ(0deg);
    -ms-transform: rotate(0deg);
    transform: rotateZ(0deg);
}

.el-submenu>.el-menu>.el-submenu>.el-submenu__title {
    padding-left: 40px !important;
    width: 100%;
    padding-right: 0px;
}

.el-submenu__icon-arrow {
    display: none;
}

.el-menu>.el-submenu__title>.submenu_block>.el-submenu__icon-arrow {
    display: none;
}

.el-submenu>.el-menu>.el-submenu>:hover {
    background-color: rgb(50, 65, 87) !important;
}

.submenu_block {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
}

.fa {
    width: 25px;
}

.submenu_title {
    display: block;
    width: 250px;
    padding-left: -40px;
}

.submenu_title:hover {
    background-color: rgb(15, 43, 85);
}

.submenu_ico_block {
    position: relative;
    display: block;
    float: right;
    width: 60px;
    height: 100%;
    right: -50px;
}

.submenu_ico_block:hover {
    background-color: rgb(67, 74, 80);
}
</style>
