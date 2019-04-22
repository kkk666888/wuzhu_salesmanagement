<template>
  <div class="OrderDetailBoard">
    <div class="search-wrap">

      <div class="box-province">
        <el-input class="province" v-model="provinceValue" placeholder="省份" clearable></el-input>
      </div>

      <div class="box-city">
        <el-input class="city" v-model="cityValue" placeholder="城市" clearable>
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

      <div class="box-send"> 是否已发货：
        <el-select class="send" v-model="sendValue" placeholder="请选择">
          <el-option v-for="(item, index) in sendData" :key="index" :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="box-orderStatus"> 订单状态：
        <el-select class="orderStatus" v-model="orderStatusValue" multiple placeholder="请选择">
          <el-option v-for="(item, index) in orderStatusData" :key="index" :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="box-applyTimeStart">
        <el-date-picker class="applyTimeStart" v-model="applyTimeStartValue" value-format="yyyy-MM-dd" type="date" placeholder="订单日期开始时间">
        </el-date-picker>
      </div>

      <div class="box-applyTimeEnd">
        <el-date-picker class="applyTimeEnd" v-model="applyTimeEndValue" value-format="yyyy-MM-dd" type="date" placeholder="订单日期结束时间">
        </el-date-picker>
      </div>

      <div class="box-orderNo">
        <el-input class="orderNo" placeholder="订单号" v-model="orderNoValue" clearable>
        </el-input>
      </div>

      <div class="area">
        <el-input class="area-input" placeholder="学校" v-model="areaData" clearable>
        </el-input>
      </div>

      <div class="box-channel">
        <el-input class="channlname" placeholder="进单渠道" v-model="channlnameValue" clearable>
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
  name: 'OrderDetailBoard',
  data() {
    return {
      pageSize: '10', // 每页显示数量
      pageNum: '1', // 默认第一页
      yearValue: '',
      yearData: ['2018', '2017', '2016', '2015', '2014', '2013', '2012'],
      monthValue: '',
      monthData: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      sendData: ['是', '否'],
      orderStatusValue: null,
      orderStatusData: [],
      provinceValue: '',
      provinceData: '', // 后台获取
      cityValue: '',
      sendValue: null,
      applyTimeStartValue: null,
      applyTimeEndValue: null,
      orderNoValue: null,
      areaManagerValue: null,
      cnNameValue: null,
      bdmNameValue: null,
      partnerNameValue: null,
      cityData: '', // 后台获取
      areaData: '', // 用户自己输入
      channlnameValue: '',
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
    this.getOrderStatusData()
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
          { prop: 'orderNo', label: '订单号', width: 120 },
          { prop: 'orderProvince', label: '下单省份' },
          { prop: 'orderCity', label: '下单城市' },
          { prop: 'orderChannel', label: '进单渠道' },
          { prop: 'orderSetDate', label: '订单日期', width: 100 },
          { prop: 'orderActiveDate', label: '订单激活日期', width: 100 },
          { prop: 'rentTerm', label: '租期' },
          { prop: 'goodsCategory', label: '商品品类' },
          { prop: 'goodsDetail', label: '订单产品', width: 220 },
          { prop: 'rentAmount', label: '全部租金金额', width: 100 },
          { prop: 'serviceAmount', label: '意外保障服务费', width: 120 },
          { prop: 'orderCreditAmt', label: '订单授信金额', width: 100 },          
          { prop: 'customerId', label: '客户编码', width: 120},
          { prop: 'customerName', label: '客户姓名' },
          { prop: 'customerPhone', label: '客户电话号码', width: 100 },
          { prop: 'customerSchool', label: '用户学校', width: 120 },
          { prop: 'orderStatus', label: '订单状态' },
          { prop: 'registerChannel', label: '注册渠道' },
          { prop: 'registerDate', label: '用户注册日期', width: 100 },
          { prop: 'verifiedDate', label: '用户实名认证日期', width: 130 },
          { prop: 'recommendName', label: '推荐人姓名', width: 90 },
          { prop: 'recommendPhone', label: '推荐人电话号码', width: 120 },
          { prop: 'recommendSchool', label: '推荐人学校', width: 120 },
          { prop: 'firstPayTime', label: '首期支付时间', width: 100 },
          { prop: 'sendTime', label: '发货时间' },
          { prop: 'receiveTime', label: '收货时间' },
          { prop: 'partnerName', label: '校园合伙人姓名', width: 120 },
          { prop: 'BDMName', label: 'BDM姓名' },
          { prop: 'cityManagerName', label: '城市经理姓名', width: 100 },
          { prop: 'areaChief', label: '区域总监' },
          { prop: 'marketChief', label: '市场总监' }
        ]
      };
      return option;
    },
    getOrderStatusData() {
      let that = this
       this.$api.orderDetail.queryOrderStatus.send({ showLoading: true }).then(res => {
        this.orderStatusData = []
        console.log('getOrderStatusData >>> ' + JSON.stringify(res))
        if (res.code === '00' && res.data) {
          res.data.forEach(function(item){
            that.orderStatusData.push(item.name)
          })
        }
       })
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
      this.sendValue = '';
      this.applyTimeStartValue = '';
      this.applyTimeEndValue = '';
      this.orderNoValue = '';
      this.areaData = '';
      this.channlnameValue = '';
      this.orderStatusValue = ''
    },
    onExport() {
      console.log('onExport')
      let params = {
        year: this.yearValue,
        month: this.monthValue,
        province: this.provinceValue,
        city: this.cityValue,
        school: this.areaData,
        applyTimeStart: this.applyTimeStartValue,
        applyTimeEnd: this.applyTimeEndValue,
        orderNo: this.orderNoValue,
        deliverFlag: this.sendValue === '是' ? '1' : ((this.sendValue) ? '0' : ''),
        orderDescription: (this.orderStatusValue && this.orderStatusValue.length !== 0) ? this.orderStatusValue.join(',') : '',
        areaManager: this.areaManagerValue,
        cnName: this.cnNameValue,
        bdmName: this.bdmNameValue,
        partnerName: this.partnerNameValue,
        channlName: this.channlnameValue
      };
      this.$api.orderDetail.exportData.send(params, { showLoading: true }).then(res => {
        console.log('res ===> ' + JSON.stringify(res))
        exportFile(res.data, '下单详情')
      })
    },
    //加载表格数据
    getList(pageInfo, callback) {
      console.log('getList');
      let that = this;
      let params = {
        year: this.yearValue,
        month: this.monthValue,
        province: this.provinceValue,
        city: this.cityValue,
        school: this.areaData,
        pageSize: pageInfo.pageSize,
        pageNum: pageInfo.pageIndex,
        applyTimeStart: this.applyTimeStartValue,
        applyTimeEnd: this.applyTimeEndValue,
        orderNo: this.orderNoValue,
        deliverFlag: this.sendValue === '是' ? '1' : ((this.sendValue) ? '0' : ''),
        orderDescription: (this.orderStatusValue && this.orderStatusValue.length !== 0) ? this.orderStatusValue.join(',') : '',
        areaManager: this.areaManagerValue,
        cnName: this.cnNameValue,
        bdmName: this.bdmNameValue,
        partnerName: this.partnerNameValue,
        channlName: this.channlnameValue
      };
      this.$api.orderDetail.queryData.send(params, { showLoading: true }).then(res => {
        console.log('getList >>> ' + JSON.stringify(res));
        if (res.code === '00' && res.data) {
          this.pageInfo = res.data.pageInfo;
          that.boardData = [];
          if (res.data.list) {
            res.data.list.forEach(function(item) {
              that.boardData.push({
                province: item.province,
                city: item.city,
                orderNo: item.orderNo,
                orderProvince: item.gpsProvince,
                orderCity: item.gpsCity,
                orderChannel: item.channlName,
                orderSetDate: item.applyTime,
                orderActiveDate: item.activateTime,
                rentTerm: item.totalDays,
                goodsCategory: item.typeName,
                goodsDetail: item.pruduct,
                rentAmount: item.orderRentAmt,
                serviceAmount: item.orderFeeAmt,
                orderCreditAmt: item.orderCreditAmt,
                customerName: item.customerName,
                customerPhone: item.phoneNumber,
                customerSchool: item.school,
                orderStatus: item.orderDescription,
                registerChannel: item.registChiName,
                registerDate: item.registeDate,
                verifiedDate: item.realRegisDate,
                recommendName: item.recommendName,
                recommendPhone: item.recommendMobile,
                recommendSchool: item.recommendSchool,
                firstPayTime: item.firstActualPayTime,
                sendTime: item.deliverTime,
                receiveTime: item.signTime,
                partnerName: item.partnerName,
                BDMName: item.bdmName,
                cityManagerName: item.cnName,
                areaChief: item.areaManager,
                marketChief: item.marketManager,
                customerId: item.customerId
              });
            });
          }
          callback(res.data.pageInfo.total);
        }
      });

      // this.$api.role.query.send(param, { showLoading: true }).then(res => {
      //   // console.log(res);
      //   if (res.errCode === 0) {
      //     this.tableData = res.data.rows || []
      //     callback(res.data.total)
      //   }
      // });
    }
  }
};
</script>

<style lang="scss">
.OrderDetailBoard {
  .search-wrap {
    display: inline-block;
    div {
      margin-left: 10px;
    }
    .box-year {
      margin-bottom: 10px;
      display: inline-block;
      width: 15%;
      .year {
        width: 60%;
      }
    }
    .box-month {
      margin-bottom: 10px;
      display: inline-block;
      width: 15%;
      .month {
        width: 60%;
      }
    }
    .box-province {
      margin-bottom: 10px;
      display: inline-block;
      width: 12%;
      margin-left: 0;
    }
    .box-city {
      margin-bottom: 10px;
      display: inline-block;
      width: 12%;
    }

    .box-send {
      margin-bottom: 10px;
      display: inline-block;
      width: 20%;
      .send {
        width: 50%;
      }
    }

    .box-orderStatus {
      margin-bottom: 10px;
      display: inline-block;
      width: 30%;
      .orderStatus {
        width: 70%;
      }
    }

    .box-applyTimeStart {
      margin-bottom: 10px;
      display: inline-block;
      margin-left: 0;
    }

    .box-applyTimeEnd {
      margin-bottom: 10px;
      display: inline-block;
    }

    .box-orderNo {
      margin-bottom: 10px;
      display: inline-block;
    }

    .box-school {
      margin-bottom: 10px;
      display: inline-block;
      width: 20%;
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

    .area {
      margin-bottom: 10px;
      display: inline-block;
    }
    .box-channel {
      margin-bottom: 10px;
      display: inline-block;
    }
    .table {
      margin-bottom: 10px;
    }
    .box-confirm {
      margin-bottom: 10px;
      display: inline-block;
      margin-left: 30px;
      .span-confirm {
        height: 25px;
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
