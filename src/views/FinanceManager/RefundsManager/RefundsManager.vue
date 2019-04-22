<template>
  <div class="RefundsManager">
    <div class="common-search">
      <el-form
        :model="searchModel"
        :rules="searchRules"
        ref="searchForm"
        label-width="140px"
        class="search-Form"
      >
        <el-form-item
          v-for="(item,index) in searchFields"
          :key="index"
          :prop="item.name"
          :label="item.label + ' :'"
        >
          <el-input
            v-if="item.type === 'input'"
            placeholder="请输入"
            type="text"
            v-model="searchModel[item.name]"
          ></el-input>
          <el-select
            v-if="item.type === 'select'"
            placeholder="请选择"
            v-model="searchModel[item.name]"
          >
            <el-option
              v-for="(opItem,opIndex) in searchOptions[item.list]"
              :key="opIndex"
              :label="opItem.text"
              :value="opItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search('searchRules')">查询</el-button>
          <el-button @click="reset('searchRules')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-item">
      <el-button type="primary" @click="confirmRefund()">确认退款</el-button>
      <el-button type="primary" @click="exportData()">导出数据</el-button>
    </div>
    <my-table
      id="refunds"
      ref="refundsTable"
      :data="tableData"
      :option="tableOption"
      :onPaging="getList"
    ></my-table>
  </div>
</template>
<script>
import RefundsManager from "./RefundsManager.js";
export default RefundsManager;
</script>
<style lang="scss" scoped>
@import "./RefundsManager.scss";
</style>



