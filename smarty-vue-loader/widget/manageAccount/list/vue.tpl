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