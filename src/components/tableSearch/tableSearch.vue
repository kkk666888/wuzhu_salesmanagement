<template>
  <div class="common-search">
    <el-form :model="searchModel" :rules="searchRules" ref="searchForm" label-width="100px" class="search-Form">
      <el-form-item v-for="(item,index) in searchFields" :key="index" :prop="searchModel[item.name]" :label="item.label + ' :'">
        <el-input v-if="item.type === 'input'" placeholder="请输入" type="text" v-model="searchModel[item.name]"></el-input>
        <el-select v-if="item.type === 'select'" placeholder="请选择" v-model="searchModel[item.name]">
          <el-option v-for="(opItem,opIndex) in searchOptions[item.list]" :key="opIndex" :label="opItem.text" value="opItem.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import vueJs from './tableSearch.js';
export default vueJs;
</script>
