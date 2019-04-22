<template>
  <div>
    <div class="common-search">
      <el-form :model="searchCondition" ref="searchForm" class="search-Form">
        <div class="item">
          <label>渠道：</label>
          <el-select clearable v-model="searchCondition.intoChannel" placeholder="请选择渠道">
            <el-option
              v-for="item in intoChannels"
              :key="item.channelCode"
              :label="item.channelName"
              :value="item.channelCode"
            ></el-option>
          </el-select>
        </div>
        <div class="item">
          <label>资金方：</label>
          <el-select clearable v-model="searchCondition.financeChannel" placeholder="请选择资金方">
            <el-option
              v-for="item in financeChannels"
              :key="item.channelCode"
              :label="item.channelName"
              :value="item.channelCode"
            ></el-option>
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
        </div>-->
      </el-form>
    </div>
    <div class="btn-item">
      <el-button type="primary" @click="queryFinanceOrderList">
        <i class="el-icon-search el-icon--left"></i>查询
      </el-button>
      <el-button type="primary" @click="resetConditions">
        <i class="el-icon-refresh el-icon--left"></i>重置
      </el-button>
    </div>
    <div>
      <el-button
        size="small"
        type="primary"
        @click="downloadTemp"
        style="margin-right:5px;float:left"
      >
        <i class="el-icon-download el-icon--left"></i>下载模板
      </el-button>
      <!--上传控件-->
      <el-upload
        :action="importUrl"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :on-success="handelSuccess"
        multiple
        :limit="1"
        style="width:320px;background: #e4e4e4; margin-bottom:5px;float:left"
      >
        <el-button size="small" type="primary">
          <i class="el-icon-upload2 el-icon--left"></i>上传已融资订单『金租』
        </el-button>
        <div slot="tip" class="el-upload__tip" style="float:right;padding-right:20px">只能上传xlsx文件</div>
      </el-upload>
    </div>
    <my-table ref="table" :data="tableData" :option="tableOption" :onPaging="getList"></my-table>
  </div>
</template>
<script>
import financeOrderList from "./FinanceOrderList.js";
export default financeOrderList;
</script>
<style lang="scss" scoped>
@import "./FinanceOrderList.scss";
</style>


