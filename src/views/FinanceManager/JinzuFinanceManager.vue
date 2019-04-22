<template>
  <div>
    <div class="common-search">
      <el-form :model="searchCondition" ref="searchForm" class="search-Form">
        <div class="item">
          <label>渠道：</label>
          <el-select clearable v-model="searchCondition.intoChannel" placeholder="请选择渠道">
            <el-option v-for="item in intoChannels" :key="item.channelCode" :label="item.channelName" :value="item.channelCode">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label>资金方：</label>
          <el-select clearable v-model="searchCondition.financeChannel" placeholder="请选择资金方">
            <el-option v-for="item in financeChannels" :key="item.channelCode" :label="item.channelName" :value="item.channelCode">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label>商品品类:</label>
          <el-input v-model="searchCondition.category"></el-input>
        </div>
        <!-- <div class="item">
          <label>订单状态:</label>
          <el-input v-model="searchCondition.orderStatus"></el-input>
        </div>
        <div class="item">
          <label>订期天数:</label>
          <el-input v-model="searchCondition.orderRentTotalDays"></el-input>
        </div> -->
      </el-form>
    </div>
    <div class="btn-item">
      <el-button type="primary" @click="queryFinanceOrderList"><i class="el-icon-search el-icon--left"></i>获取待融资订单</el-button>
      <el-button type="primary" @click="resetConditions"><i class="el-icon-refresh el-icon--left"></i>重置查询条件</el-button>
    </div>
    <el-button style="margin-bottom:5px" type="primary" @click="exportFinanceOrderList"><i class="el-icon-download el-icon--left"></i>导出数据</el-button>
    <my-table ref="table" :data="tableData" :option="tableOption" :onPaging="getList"></my-table>
  </div>
</template>
<script>
import jinzuFinanceManager from './JinzuFinanceManager.js';
export default jinzuFinanceManager;
</script>
<style lang="scss" scoped>
@import './JinzuFinanceManager.scss';
</style>

