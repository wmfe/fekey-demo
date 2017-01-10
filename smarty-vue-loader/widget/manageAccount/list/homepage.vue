<template>
  <el-col class="content">
    <el-form :inline="true" :model="filter">
        <el-form-item label-width="90px" label="企业名称：">
            <el-input v-model="filter.biz_name"></el-input>
        </el-form-item>
        <el-form-item label-width="130px" label="管理员账号名称：">
            <el-input v-model="filter.login_name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="renderData">搜索</el-button>
            <el-button @click="newAccount" type="primary">新增账号</el-button>
        </el-form-item>
    </el-form>
    <el-tabs type="border-card">
        <el-tab-pane label="企业账号列表"></el-tab-pane>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
                    prop="id"
                    label="账号ID">
                </el-table-column>
                <el-table-column
                    prop="biz_name"
                    label="企业名称">
                </el-table-column>
                <el-table-column
                    prop="login_name"
                    label="管理员账号">
                </el-table-column>
                <el-table-column
                    inline-template
                    :context="_self"
                    label="操作"
                    width="190">
                        <span>
                            <el-button @click="sureChange(row.login_uid)" type="button" size="small">修改密码</el-button>
                            <el-button @click="sureDelete(row.id, row.biz_name, row.login_uid)" type="button" size="small">删除账号</el-button>
                        </span>
                </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                @current-change="changePage"
                @size-change="changeSize"
                :current-page="pageData.page"
                :page-size="pageData.count"
                :page-sizes="[5, 10, 20, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageData.total">
            </el-pagination>
        </div>
    </el-tabs>
    <el-dialog title="提示" v-model="dltDialog" size="tiny">
        <span>确定删除企业“{{deleteListName}}”的管理员账号吗?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dltDialog = false">取 消</el-button>
            <el-button type="primary" @click="deleteAccount(deleteListId, deleteListuids)">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="修改密码" v-model="changeDialog" size="tiny">
        <el-form :model="ruleForm" label-width="140px" :rules="rules" ref="ruleForm">
            <el-form-item label="新密码：" required prop="passwd">
                <el-input v-model="ruleForm.passwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="重新输入新密码：" required prop="passwdcheck">
                <el-input v-model="ruleForm.passwdcheck" type="password"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeDialog = false">取 消</el-button>
            <el-button type="primary" @click="changePwd(deleteListuids)">确 定</el-button>
        </span>
    </el-dialog>
  </el-col>
</template>

<script>
  module.exports = {
    props: ['wdata'],
    data: function() {
        /**
         * @description 校验密码输入是否非空
         * @function
         */
        let checkPassempty = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.passwdcheck !== '') {
                    this.$refs.ruleForm.validateField('passwdcheck');
                }
                callback();
            }
        };
        /**
         * @description 校验两次密码输入是否相同
         * @function
         */
        let checkPassSame = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.passwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            /**
             * @description filter渲染数据
             * @type {object}
             */
            filter: {
                biz_name: '',
                login_name: ''
            },
            /**
             * @description table渲染数据
             * @type {array}
             */
            tableData: this.wdata.content,
            /**
             * @description pagination渲染数据
             * @type {object}
             */
            pageData: {
                page: this.wdata.page,
                total: this.wdata.total,
                count: this.wdata.count
            },
            /**
             * @description 删除账户信息id列表
             * @type {string}
             */
            deleteListId: '',
            /**
             * @description 删除账户信息name列表
             * @type {string}
             */
            deleteListName: '',
            /**
             * @description 删除账户信息uid列表
             * @type {string}
             */
            deleteListuids: '',
            /**
             * @description 确认弹窗隐藏
             * @type {boolean}
             */
            dltDialog: false,
            /**
             * @description 修改密码弹窗隐藏
             * @type {boolean}
             */
            changeDialog: false,
            /**
             * @description 修改密码form数据
             * @type {object}
             */
            ruleForm: {
                passwd: '',
                passwdcheck: ''
            },
            /**
             * @description element-form校验方式
             * @type {object}
             */
            rules: {
                passwd: [{
                    validator: checkPassempty,
                    trigger: 'blur'
                }],
                passwdcheck: [{
                    validator: checkPassSame,
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        /**
         * @function 
         * @description 提交数据渲染table
         */
        renderData() {
            /**
             * @description 请求url
             * @type {string}
             */
            const requestUrl = '/waimaies/mis/getaccountlist';
            /**
             * @description post请求数据
             * @type {object}
             */
            const sendData = {
                page: this.pageData.page,
                count: this.pageData.count,
                biz_name: this.filter.biz_name,
                login_name: this.filter.login_name,
                display: 'json'
            };
            /**
             * @description 发送修改请求
             * @function 
             */
            this.$ajax({
                url: requestUrl,
                type: 'post',
                data: sendData,
                success: res => {
                    /**
                     * @description 判断是否成功，成功则渲染table，失败则返回错误文案
                     * @function 
                     */
                    if (res.errno === 0) {
                        /**
                         * @description 渲染table数据
                         */
                        this.tableData = res.data.content;
                        this.pageData.page = res.data.page;
                        this.pageData.total = res.data.total;
                        this.pageData.count = res.data.count;
                    } else {
                        this.$message.error(res.errmsg);
                    }
                },
                error: error => {
                    this.$message.error('服务器不稳定，请重试');
                }
            });
        },
        /**
         * @function 
         * @description 翻页触发事件
         */
        changePage(val) {
            this.pageData.page = val;
            this.renderData();
        },
        /**
         * @function 
         * @description 改变翻页size触发事件
         */
        changeSize(val) {
            this.pageData.count = val;
            this.renderData();
        },
        /**
         * @function 
         * @description 新增账户
         */
        newAccount() {
            window.location.href = '/waimaies/mis/allocaccount?type=info';
        },
        /**
         * @function 
         * @description 打开确认修改账户密码弹窗
         */
        sureChange(uid) {
            this.changeDialog = true;
            this.deleteListuids = uid;
        },
        /**
         * @function 
         * @description 打开确认删除账户弹窗
         */
        sureDelete(ids, names, uids) {
            /**
             * @description 显示弹窗
             */
            if (ids) {
                this.dltDialog = true;
                this.deleteListId = ids;
                this.deleteListName = names;
                this.deleteListuids = uids;
            }
        },
        /**
         * @function 
         * @description 删除一行信息
         */
        deleteAccount(id, uid) {
            /**
             * @description 隐藏弹窗
             */
            this.dltDialog = false;
            /**
             * @description 请求url
             * @type {string}
             */
            const requestUrl = '/waimaies/mis/deleteaccount';
            /**
             * @description post请求数据
             * @type {object}
             */
            const sendData = {
                id: id,
                login_uid: uid,
                display: 'json'
            };
            /**
             * @description 发送修改请求
             * @function 
             */
            this.$ajax({
                url: requestUrl,
                type: 'post',
                data: sendData,
                success: res => {
                    /**
                     * @description 判断是否成功，成功则跳到列表页，失败则返回错误文案
                     * @function 
                     */
                    if (res.errno === 0) {
                        this.$message.success('删除成功');
                        setTimeout(function() {
                            window.location.href = '/waimaies/mis/getaccountlist?page=1&count=20';
                        }, 1000)
                    } else {
                        this.$message.error(res.errmsg);
                    }
                },
                error: error => {
                    this.$message.error('服务器不稳定，请重试');
                }
            });
        },
        /**
         * @function 
         * @description 修改账户密码
         */
        changePwd(uid) {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    /**
                     * @description 隐藏弹窗
                     */
                    this.changeDialog = false;
                    /**
                     * @description 请求url
                     * @type {string}
                     */
                    const requestUrl = '/waimaies/mis/modifypasswd';
                    /**
                     * @description post请求数据
                     * @type {object}
                     */
                    const sendData = {
                        passwd: hex_md5(this.ruleForm.passwd),
                        login_uid: uid,
                        display: 'json'
                    };
                    /**
                     * @description 发送修改请求
                     * @function 
                     */
                    this.$ajax({
                        url: requestUrl,
                        type: 'post',
                        data: sendData,
                        success: res => {
                            /**
                             * @description 判断是否成功，成功则跳到列表页，失败则返回错误文案
                             * @function 
                             */
                            if (res.errno === 0) {
                                this.$message.success('修改成功');
                                setTimeout(function() {
                                    window.location.href = '/waimaies/mis/getaccountlist?page=1&count=20';
                                }, 1000)
                            } else {
                                this.$message.error(res.errmsg);
                            }
                        },
                        error: error => {
                            this.$message.error('服务器不稳定，请重试');
                        }
                    });
                }
            })
        }
    }
  }
</script>

<style lang="less">
body {
  a {
    color: inherit;
  }
}
.component-a[__vuec__] {
  line-height: 50px;
  text-align: center;
  color: #fff;
  background: rgb(227, 99, 61);
}
</style>
