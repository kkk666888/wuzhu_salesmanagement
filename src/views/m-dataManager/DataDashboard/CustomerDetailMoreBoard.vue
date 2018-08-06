<template>
  <div class="CustomerDetailMoreBoard">
    <div class="search-wrap">

      <div class="province">
        <el-input class="province-inner" v-model="provinceValue" placeholder="省份" clearable>
        </el-input>
      </div>
      <div class="city">
        <el-input class="city-inner" v-model="cityValue" placeholder="城市" clearable>
        </el-input>
      </div>

      <div class="box-areaManager">
        <el-input class="areaManager" placeholder="区域总监" v-model="areaManagerValue" clearable>
        </el-input>
      </div>
      <div class="box-cnName">
        <el-input class="cnName" placeholder="城市经理" v-model="cnNameValue" clearable>
        </el-input>
      </div>
      <div class="box-bdmName">
        <el-input class="bdmName" placeholder="BDM姓名" v-model="bdmNameValue" clearable>
        </el-input>
      </div>
      <div class="box-partnerName">
        <el-input class="partnerName" placeholder="校园合伙人" v-model="partnerNameValue" clearable>
        </el-input>
      </div>

      <div class="box-registerChannel">
        <el-input class="registerChannel" placeholder="注册渠道" v-model="registerChannelValue" clearable>
        </el-input>
      </div>
      <div class="box-registerDateStart">
        <el-date-picker class="registerDateStart" v-model="registerDateStartValue" value-format="yyyy-MM-dd" type="date" placeholder="注册时间-开始" size="small">
        </el-date-picker>
      </div>
      <div class="box-registerDateEnd">
        <el-date-picker class="registerDateEnd" v-model="registerDateEndValue" value-format="yyyy-MM-dd" type="date" placeholder="注册时间-结束">
        </el-date-picker>
      </div>
      <div class="box-verityThroughDateStart">
        <el-date-picker class="verityThroughDateStart" v-model="verityThroughDateStartValue" value-format="yyyy-MM-dd" type="date" placeholder="身份认证时间-开始">
        </el-date-picker>
      </div>
      <div class="box-verityThroughDateEnd">
        <el-date-picker class="verityThroughDateEnd" v-model="verityThroughDateEndValue" value-format="yyyy-MM-dd" type="date" placeholder="身份认证时间-结束">
        </el-date-picker>
      </div>

      <div class="area">
        <el-input class="area-input" placeholder="学校" v-model="schoolValue" clearable>
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
  name: 'CustomerDetailMoreBoard',
  data() {
    return {
      pageSize: '10', // 每页显示数量
      pageNum: '1', // 默认第一页
      yearValue: '',
      yearData: ['2018', '2019', '2020'],
      monthValue: '',
      monthData: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      verifyValue: null,
      verified: ['Y', 'N'],
      orderSetValue: null,
      orderSet: ['Y', 'N'],
      provinceValue: '',
      provinceData: '', // 后台获取
      cityValue: '',
      cityData: '', // 后台获取
      areaData: '', // 用户自己输入
      newComerData: null, // 用户自己输入
      newComerValue: null,
      areaManagerValue: null,
      cnNameValue: null,
      bdmNameValue: null,
      partnerNameValue: null,
      registerChannelValue: null,
      schoolValue: null,
      registerDateStartValue: null,
      registerDateEndValue: null,
      verityThroughDateStartValue: null,
      verityThroughDateEndValue: null,
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
  mounted() {},
  methods: {
    //表格配置
    getTableOption() {
      let option = {
        idField: '',
        showPage: true,
        autoHeight: true,
        showSerial: true,
        columns: [
          { prop: 'outerFlag', label: '是否外部用户', width: 100 },
          { prop: 'province', label: '省份' },
          { prop: 'city', label: '城市' },
          { prop: 'userName', label: '用户姓名' },
          { prop: 'userPhone', label: '用户电话号码', width: 100 },
          { prop: 'idCard', label: '用户身份证号', width: 120 },
          { prop: 'verifyTime', label: '身份认证时间', width: 100 },
          { prop: 'userSchool', label: '用户学校', width: 100 },
          { prop: 'userSchoolTime', label: '用户入学时间', width: 100 },
          { prop: 'registerChannel', label: '注册渠道' },
          { prop: 'registerDate', label: '注册日期', width: 100 },
          { prop: 'recommendName', label: '推荐人姓名', width: 90 },
          { prop: 'recommendPhone', label: '推荐人电话号码', width: 120 },
          { prop: 'recommendId', label: '推荐人身份证号', width: 120 },
          { prop: 'recommendSchool', label: '推荐人学校', width: 100 },
          { prop: 'partnerName', label: '校园合伙人姓名', width: 120 },
          { prop: 'BDMName', label: 'BDM姓名' },
          { prop: 'CMName', label: 'CM姓名' },
          { prop: 'areaChief', label: '区域总监' },
          { prop: 'marketChief', label: '市场总监' }
        ]
      };
      return option;
    },
    // getProvinceData() {
    //   this.$http.post('data_base/queryProvinceList').then(res => {
    //     console.log('getProvinceData >>> ' + JSON.stringify(res))
    //     if (res.code === '00' && res.data) {
    //       this.provinceData = res.data
    //     }
    //   })
    // },
    // getCityData(event) {
    //   console.log('getCityData')
    //   let params = {
    //     'province': this.provinceValue
    //   }
    //   this.$http.post('data_base/queryCityList', params).then(res => {
    //     console.log('getCityData >>> ' + JSON.stringify(res))
    //     if (res.code === '00' && res.data) {
    //       this.cityData = res.data
    //     }
    //   })
    // },
    onSearch() {
      this.$refs.boardTable.refreshPaging(1);
    },
    onReset() {
      this.provinceValue = '';
      this.cityValue = '';
      this.areaManagerValue = '';
      this.cnNameValue = '';
      this.bdmNameValue = '';
      this.partnerNameValue = '';
      this.registerChannelValue = '';
      this.registerDateStartValue = '';
      this.registerDateEndValue = '';
      this.verityThroughDateStartValue = '';
      this.verityThroughDateEndValue = '';
      this.schoolValue = '';
    },
    onExport() {
      console.log('onExport')
      let params = {
        year: this.yearValue,
        month: this.monthValue,
        province: this.provinceValue,
        city: this.cityValue,
        realRegisFlag: this.verifyValue,
        recommendName: this.newComerValue,
        orderFlag: this.orderSetValue,
        registeChannel: this.registerChannelValue,
        school: this.schoolValue,
        registeDateStart: this.registerDateStartValue,
        registeDateEnd: this.registerDateEndValue,
        verifyThroughDateStart: this.verityThroughDateStartValue,
        verifyThroughDateEnd: this.verityThroughDateEndValue,
        areaManager: this.areaManagerValue,
        cmName: this.cnNameValue,
        bdmName: this.bdmNameValue,
        partnerName: this.partnerNameValue
      };
      this.$api.customerDetailMore.exportData.send(params, { showLoading: true }).then(res => {
        console.log('res ===> ' + JSON.stringify(res))
        exportFile(res.data, '客户详情')
      })
    },
    getList(pageInfo, callback) {
      let that = this;
      let params = {
        year: this.yearValue,
        month: this.monthValue,
        province: this.provinceValue,
        city: this.cityValue,
        realRegisFlag: this.verifyValue,
        recommendName: this.newComerValue,
        orderFlag: this.orderSetValue,
        pageSize: pageInfo.pageSize,
        pageNum: pageInfo.pageIndex,
        registeChannel: this.registerChannelValue,
        school: this.schoolValue,
        registeDateStart: this.registerDateStartValue,
        registeDateEnd: this.registerDateEndValue,
        verifyThroughDateStart: this.verityThroughDateStartValue,
        verifyThroughDateEnd: this.verityThroughDateEndValue,
        areaManager: this.areaManagerValue,
        cmName: this.cnNameValue,
        bdmName: this.bdmNameValue,
        partnerName: this.partnerNameValue
      };
      this.$api.customerDetailMore.queryData.send(params, { showLoading: true }).then(res => {
        console.log('getCustomData >>> ' + JSON.stringify(res));
        if (res.code === '00' && res.data) {
          this.pageInfo = res.data.pageInfo;
          that.boardData = [];
          if (res.data.list) {
            res.data.list.forEach(function(item) {
              that.boardData.push({
                outerFlag: item.outerFlag,
                province: item.province,
                city: item.city,
                userName: item.customerName,
                userPhone: item.phoneNumber,
                idCard: item.idCard,
                verifyTime: item.verifyThroughDate,
                userSchool: item.school,
                userSchoolTime: item.entranceDate,
                // '': item.profess,
                // '': item.xueli,
                registerChannel: item.registeChannel,
                registerDate: item.registeDate,
                recommendName: item.recommendName,
                recommendPhone: item.recommendMobile,
                recommendId: item.recommendId,
                recommendSchool: item.recommendSchool,
                // '': item.partnerSchool,
                // '': item.partnerEntranceDate,
                // '': item.partnerProfess,
                // '': item.partnerXueli,
                partnerName: item.partnerName,
                // '': item.bdmNo,
                BDMName: item.bdmName,
                CMName: item.cmName,
                areaChief: item.areaManager,
                marketChief: item.marketManager
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
.CustomerDetailMoreBoard {
  .search-wrap {
    // margin-bottom: 10px;
    div {
      margin-left: 10px;
    }
    .year {
      margin-bottom: 10px;
      display: inline-block;
      width: 15%;
    }
    .month {
      margin-bottom: 10px;
      display: inline-block;
      width: 15%;
    }
    .province {
      margin-bottom: 10px;
      display: inline-block;
      width: 12%;
      margin-left: 0;
    }
    .city {
      margin-bottom: 10px;
      display: inline-block;
      width: 12%;
    }

    .isOrderSet {
       margin-bottom: 10px;
      display: inline-block;
    }

    .isVerified {
      margin-bottom: 10px;
      display: inline-block;
    }

    .newComerName {
      margin-bottom: 10px;
      display: inline-block;
      width: 12%;
    }

    .box-areaManager {
      margin-bottom: 10px;
      display: inline-block;
      width: 12%;
    }

    .box-cnName {
      margin-bottom: 10px;
      display: inline-block;
      width: 12%;
    }

    .box-bdmName {
      margin-bottom: 10px;
      display: inline-block;
      width: 12%;
    }

    .box-partnerName {
      margin-bottom: 10px;
      display: inline-block;
      width: 12%;
    }

    .box-registerChannel {
      margin-bottom: 10px;
      display: inline-block;
      width: 12%;
    }

    .box-registerDateStart {
      margin-bottom: 10px;
      width: 12%;
      margin-left: 0;
      display: inline-block;
      .registerDateStart {
        width: 110%;
      }
    }

    .box-verityThroughDateEnd {
      margin-bottom: 10px;
      width: 12%;
      margin-left: 20px;
      display: inline-block;
      .verityThroughDateEnd {
        width: 110%;
      }
    }

    .area {
      margin-bottom: 10px;
      margin-left: 20px;
      display: inline-block;
    }
    .table {
    }
    .box-confirm {
      margin-bottom: 10px;
      display: inline-block;
      margin-left: 30px;
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

    .box-school {
      margin-bottom: 10px;
      display: inline-block;
      width: 10%;
    }

    .box-registerDateEnd {
      margin-bottom: 10px;
      width: 12%;
      margin-left: 20px;
      display: inline-block;
      .registerDateEnd {
        width: 110%;
      }
    }

    .box-verityThroughDateStart {
      margin-bottom: 10px;
      width: 12%;
      margin-left: 20px;
      display: inline-block;
      .verityThroughDateStart {
        width: 110%;
      }
    }
  }
}
</style>
