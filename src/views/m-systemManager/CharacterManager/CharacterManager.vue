<template>
  <div class="CharacterManager">
    <div class="common-search">
      <el-form :model="searchModel" :rules="searchRules" ref="searchForm" label-width="100px" class="search-Form">
        <el-form-item v-for="(item,index) in searchFields" :key="index" :prop="item.name" :label="item.label + ' :'">
          <el-input v-if="item.type === 'input'" placeholder="请输入" type="text" v-model="searchModel[item.name]"></el-input>
          <el-select v-if="item.type === 'select'" placeholder="请选择" v-model="searchModel[item.name]">
            <el-option v-for="(opItem,opIndex) in searchOptions[item.list]" :key="opIndex" :label="opItem.text" :value="opItem.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search('searchRules')">查询</el-button>
          <el-button @click="reset('searchRules')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-item">
      <el-button type="primary" @click="addRole()">添加角色</el-button>
      <el-button type="primary" @click="editRole()">编辑角色</el-button>
      <el-button type="primary" @click="deleteRole()">删除角色</el-button>
    </div>
    <my-table ref="userTable" :data="tableData" :option="tableOption" :onPaging="getList"></my-table>

    <!--添加编辑角色弹窗-->
    <my-dialog :title='roleDialog.title' :visible.sync='roleDialog.visible' @onConfirm="confirmReceiptSave()">
      <div class="confirm-receipt-dialog">
        <el-form :model="dialogForm" :rules="dialogRules" ref="dialogForm" label-width="100px" class="dialog-form">
          <el-form-item label="角色名称" prop="role">
            <el-input v-model="dialogForm.role"></el-input>
          </el-form-item>
          <el-form-item label="角色状态" prop="available">
            <el-select placeholder="请选择" v-model="dialogForm.available">
              <el-option :value="1" label="启用"></el-option>
              <el-option :value="0" label="禁用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色权限" v-if="roleDialog.title === '编辑角色'" prop="addIds">
            <el-input @click.native="showResourceTree" v-model="dialogForm.showTreeName" class="show-treename" readonly placeholder="请选择角色权限" :suffix-icon="inputIcon"></el-input>
            <el-tree ref="tree" class="dialogTree" :default-checked-keys="treeCheckedKeys" :data="treeData2" @check="getTreeChecked" v-if="treeVisible" show-checkbox node-key="id" highlight-current :props="treeOption">
            </el-tree>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" v-model="dialogForm.description"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </my-dialog>
  </div>
</template>
<script>
import CharacterManager from './CharacterManager.js';
export default CharacterManager;
</script>
<style lang="scss" scoped>
.CharacterManager {
  .confirm-receipt-dialog {
    padding: 30px 100px;
  }
  .dialogTree {
    border: 1px solid #ccc;
    // border-radius: 3px;
    margin-top: -1px;
  }
  .show-treename {
    input:hover {
      cursor: pointer;
    }
  }
}
</style>



