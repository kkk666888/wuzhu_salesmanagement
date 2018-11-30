<template>
  <div class="CustomBoard">
    <div class="search-wrap">
      <div class="year"> 年：
        <el-select v-model="yearValue" placeholder="请选择">
          <el-option v-for="(item, index) in yearData" :key="index" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="month"> 月：
        <el-select v-model="monthValue" placeholder="请选择">
          <el-option v-for="(item, index) in monthData" :key="index" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="province"> 省份：
        <el-select v-model="provinceValue" placeholder="请选择" @change="getCityData($event)" size="mini">
          <el-option v-for="(item, index) in provinceData" :key="index" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="city"> 城市：
        <el-select v-model="cityValue" placeholder="请选择">
          <el-option v-for="(item, index) in cityData" :key="index" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="area"> 区域：
        <el-input class="area-input" placeholder="请输入" v-model="areaData" clearable size="small">
        </el-input>
      </div>
      <div class="box-confirm">
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button @click="onExport">导出</el-button>
      </div>
    </div>
    <my-table class="table" ref="boardTable" :data="boardData" :option="boardOption" :onPaging="getList"></my-table>
  </div>
</template>

<script>
import exportFile from './export.js'
export default {
  name: 'CustomBoard',
  data() {
    return {
      pageSize: '10', // 每页显示数量
      pageNum: '1', // 默认第一页
      yearValue: '',
      yearData: ['2018', '2019', '2020'],
      monthValue: '',
      monthData: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      provinceValue: '',
      provinceData: '', // 后台获取
      cityValue: '',
      cityData: '', // 后台获取
      areaData: '', // 用户自己输入
      boardData: [],
      boardOption: this.getTableOption(),
      pageInfo: {
        pageSize: '', // 每页显示条数
        pageNum: '', // 当前页
        pageIndex: '', // 忽略
        total: '' // 总条数
      }
    };
  },
  mounted() {
    this.getProvinceData();
  },
  methods: {
    //表格配置
    getTableOption() {
      let option = {
        idField: '',
        showPage: true,
        autoHeight: true,
        showSerial: true,
        columns: [
          { prop: 'province', label: '省份' },
          { prop: 'city', label: '城市' },
          { prop: 'part', label: '区域(学校)' },
          { prop: 'registAmount', label: '公众号/app注册量' },
          { prop: 'verifyAmount', label: '实名认证量' },
          { prop: 'windCreditLine', label: '风控授信额度' },
          { prop: 'orderNum', label: '进单量' }
        ]
      };
      return option;
    },
    getProvinceData() {
      this.$api.custom.queryProvince.send({ showLoading: true }).then (res => {
        console.log('getProvinceData >>> ' + JSON.stringify(res));
        if (res.code === '00' && res.data) {
          this.provinceData = res.data;
        }
      });
    },
    getCityData(event) {
      console.log('getCityData');
      let params = {
        province: this.provinceValue
      };
      this.$api.custom.queryCity.send(params, { showLoading: true }).then (res => {
        console.log('getCityData >>> ' + JSON.stringify(res));
        if (res.code === '00' && res.data) {
          this.cityData = res.data;
        }
      });
    },
    onSearch() {
      this.$refs.boardTable.refreshPaging(1);
    },
    onReset() {
      this.yearValue = '';
      this.monthValue = '';
      this.provinceValue = '';
      this.cityValue = '';
      this.areaData = '';
    },
    onExport() {
      console.log('onExport')
      let params = {
        year: this.yearValue,
        month: this.monthValue,
        province: this.provinceValue,
        city: this.cityValue,
        school: this.areaData
      };
      this.$api.custom.exportData.send(params, { showLoading: true }).then(res => {
        console.log('res ===> ' + JSON.stringify(res))
        exportFile(res.data, '销售基本详情')
      })
    },
    getList(pageInfo, callback) {
      let that = this;
      let params = {
        year: this.yearValue,
        month: this.monthValue,
        province: this.provinceValue,
        city: this.cityValue,
        school: this.areaData,
        pageSize: pageInfo.pageSize,
        pageNum: pageInfo.pageIndex
      };
      this.$api.custom.queryData.send(params, { showLoading: true }).then(res => {
        console.log('getCustomData >>> ' + JSON.stringify(res));
        if (res.code === '00' && res.data) {
          this.pageInfo = res.data.pageInfo;
          that.boardData = [];
          if (res.data.list) {
            res.data.list.forEach(function(item) {
              that.boardData.push({
                province: item.province,
                city: item.city,
                part: item.school,
                registAmount: item.appRegistCount,
                verifyAmount: item.realnameCount,
                windCreditLine: item.sumAccountAmt,
                orderNum: item.orderCount
              });
            });
          }
          callback(res.data.pageInfo.total);
        }
      });
    }
  }
};
</script>

<style lang="less">
.CustomBoard {
  .search-wrap {
    margin-bottom: 10px;
    .el-select {
      width: 78%;
    }
    .year {
      display: inline-block;
      width: 15%;
    }
    .month {
      width: 15%;
      margin-left: 10px;
      display: inline-block;
    }
    .province {
      width: 18%;
      margin-left: 10px;
      display: inline-block;
      vertical-align: 1px;
      .el-select {
        width: 72%;
      }
      input {
        height: 32px;
      }
    }
    .city {
      width: 18%;
      margin-left: 10px;
      display: inline-block;
      .el-select {
        width: 70%;
      }
    }
    .area {
      width: 18%;
      margin-left: 10px;
      display: inline-block;
      .area-input {
        width: 70%;
      }
    }
    .table {
      margin-top: 10px;
    }
    .box-confirm {
      display: inline-block;
      margin-left: 10px;
      margin-top: 10px;
      .span-confirm {
        height: 30px;
        width: 90px;
        color: white;
        padding: 10px 20px;
        font-size: 14px;
        line-height: 30px;
        background: #20a0ff;
        text-align: center;
        border-radius: 6px;
      }
    }
  }
}
</style>
