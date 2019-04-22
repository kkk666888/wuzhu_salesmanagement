<template>
  <div class="OrderDetailMoreBoard">
    <div class="search-wrap">
      
      <!-- 进单渠道 -->
      <div class="box-input-div-sty">
        <el-input class="text-input-sty" placeholder="进单渠道" v-model="channlnameValue" clearable>
        </el-input>
      </div>

      <!-- 订单号 -->
      <div class="box-input-div-sty">
        <el-input class="text-input-sty" placeholder="订单号" v-model="orderNoValue" clearable>
        </el-input>
      </div>

      <!-- 客户信息 -->
      <div class="box-input-div-sty">
        <el-input class="text-input-sty" placeholder="客户姓名" v-model="customerNameValue" clearable>
        </el-input>
      </div>

      <!-- 客户信息 -->
      <div class="box-input-div-sty">
        <el-input class="text-input-sty" placeholder="客户电话" v-model="customerPhoneValue" clearable>
        </el-input>
      </div>

      <!-- 订单产品 -->
      <div class="box-input-div-sty">
        <el-input class="text-input-sty" placeholder="订单产品" v-model="goodsDetailValue" clearable>
        </el-input>
      </div>
      
      <!-- 订单状态 -->
      <div class="box-input-div-sty">
        <el-select class="text-input-sty" v-model="orderStatusValue" multiple placeholder="订单状态">
          <el-option v-for="(item, index) in orderStatusData" :key="index" :value="item">
          </el-option>
        </el-select>
      </div>
      
      <!-- 订单开始时间 -->
      <div class="box-input-div-sty">
        <el-date-picker class="text-input-sty" v-model="applyTimeStartValue" value-format="yyyy-MM-dd" type="date" placeholder="订单日期开始时间">
        </el-date-picker>
      </div>

      <!-- 订单结束时间 -->
      <div class="box-input-div-sty">
        <el-date-picker class="text-input-sty" v-model="applyTimeEndValue" value-format="yyyy-MM-dd" type="date" placeholder="订单日期结束时间">
        </el-date-picker>
      </div>

      <!-- 是否已发货 -->
      <div class="box-input-div-sty">
        <el-select class="text-input-sty" v-model="sendValue" placeholder="是否已发货">
          <el-option v-for="(item, index) in sendData" :key="index" :value="item">
          </el-option>
        </el-select>
      </div>

      <!-- 租期 -->
      <div class="box-input-div-sty">
        <el-input class="text-input-sty" placeholder="租期" v-model="rentTermValue" clearable>
        </el-input>
      </div>
      
      <!-- 订单类型 -->
      <div class="box-input-div-sty">
        <el-select class="text-input-sty" v-model="orderType" placeholder="订单类型">
          <el-option v-for="(item, index) in orderTypeData" :key="index" :value="item.value" :label="item.label">
          </el-option>
        </el-select>
      </div>

      <!-- 下单省份 -->
      <div class="box-input-div-sty">
        <el-input class="text-input-sty" v-model="provinceValue" placeholder="下单省份" clearable></el-input>
      </div>

      <!-- 下单城市 -->
      <div class="box-input-div-sty">
        <el-input class="text-input-sty" v-model="cityValue" placeholder="下单城市" clearable>
        </el-input>
      </div>

      <!-- 商品编号 -->
      <div class="box-input-div-sty">
        <el-input class="text-input-sty" v-model="commodityNo" placeholder="商品编号" clearable>
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
  name: 'OrderDetailMoreBoard',
  data() {
    return {
      pageSize: '10', // 每页显示数量
      pageNum: '1', // 默认第一页
      yearValue: '',
      yearData: ['2018', '2017', '2016', '2015', '2014', '2013', '2012'],
      monthValue: '',
      monthData: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      sendData: ['是', '否'],
      orderType:'',
      orderTypeData: [{label:'正常订单',value:'0'},{label:'续租订单',value:'1'}],
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
      commodityNo: null,
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
      },
      customerNameValue: '',
      customerPhoneValue: '',
      goodsDetailValue: '',
      rentTermValue: ''
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
          { prop: 'outerFlag', label: '是否外部用户', width: 100 },
          { prop: 'province', label: '省份' },
          { prop: 'city', label: '城市' },
          { prop: 'orderNo', label: '订单号', width: 120 },
          { prop: 'orderProvince', label: '下单省份' },
          { prop: 'orderCity', label: '下单城市' },
          { prop: 'consigneeAddr', label: '收货地址', width: 220 },
          { prop: 'orderChannel', label: '进单渠道' },
          { prop: 'orderSetDate', label: '订单日期', width: 100 },
          { prop: 'orderActiveDate', label: '订单激活日期', width: 100 },
          { prop: 'rentTerm', label: '租期' },
          { prop: 'commodityNo', label: '商品编号' },
          { prop: 'goodsCategory', label: '商品品类' },
          { prop: 'goodsDetail', label: '订单产品', width: 220 },
          { prop: 'rentAmount', label: '全部租金金额', width: 100 },
          { prop: 'serviceAmount', label: '意外保障服务费', width: 120 },
          { prop: 'firstRentAmt', label: '首次租金' },
          { prop: 'orderDepositAmt', label: '订单押金金额', width: 100 },
          { prop: 'orderCreditAmt', label: '订单授信金额', width: 100 },
          { prop: 'accountAmt', label: '客户授信金额', width: 100 },
          { prop: 'payDepositAmt', label: '需支付押金额', width: 100 },
          { prop: 'termFirstPayAmt', label: '订单首次支付金额', width: 130 },
          { prop: 'firstActualPay', label: '首次实际支付金额', width: 130 },
          { prop: 'paidRentAmt', label: '订单已支付金额', width: 120 },
          { prop: 'unpaidRentAmt', label: '订单未支付金额', width: 120 },
          { prop: 'customerId', label: '客户编码', width: 120},
          { prop: 'customerName', label: '客户姓名' },
          { prop: 'customerPhone', label: '客户电话号码', width: 100 },
          { prop: 'idCard', label: '客户身份证号', width: 120 },
          { prop: 'customerSchool', label: '用户学校', width: 120 },
          { prop: 'orderStatus', label: '订单状态' },
          { prop: 'orderType', label: '订单类型' },
          { prop: 'overDealType', label: '到期处理方式', width: 100 },
          { prop: 'flagRiscManagement', label: '风控审核结果', width: 100 },
          { prop: 'statusRiscManagement', label: '风控记录状态', width: 100 },
          { prop: 'registerChannel', label: '注册渠道' },
          { prop: 'registerDate', label: '用户注册日期', width: 100 },
          { prop: 'verifiedDate', label: '用户实名认证日期', width: 130 },
          { prop: 'recommendName', label: '推荐人姓名', width: 90 },
          { prop: 'recommendPhone', label: '推荐人电话号码', width: 120 },
          { prop: 'recommendId', label: '推荐人身份证号', width: 130 },
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
        //console.log('getOrderStatusData >>> ' + JSON.stringify(res))
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
      this.channlnameValue = '',
      this.orderNoValue = '',
      this.customerNameValue = '',
      this.customerPhoneValue = '',
      this.goodsDetailValue = '',
      this.orderStatusValue = '',
      this.applyTimeStartValue = '',
      this.applyTimeEndValue = '',
      this.sendValue = '',
      this.rentTermValue = '',
      this.orderType = '',
      this.provinceValue = '',
      this.cityValue = ''
    },
    onExport() {
      //console.log('onExport')
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
        channlName: this.channlnameValue,
        customerName: this.customerNameValue,
        pruduct: this.goodsDetailValue,
        totalDays: this.rentTermValue,
        orderType: this.orderType,
        commodityNo: this.commodityNo
      };
      this.$api.orderDetailMore.exportData.send(params, { showLoading: true }).then(res => {
        console.log('res ===> ' + JSON.stringify(res))
        exportFile(res.data, '订单详情')
      })
    },
    //加载表格数据
    getList(pageInfo, callback) {
      //console.log('getList');
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
        channlName: this.channlnameValue,
        customerName: this.customerNameValue,
        phoneNumber: this.customerPhoneValue,
        pruduct: this.goodsDetailValue,
        totalDays: this.rentTermValue,
        orderType: this.orderType,
        commodityNo: this.commodityNo
      };
      this.$api.orderDetailMore.queryData.send(params, { showLoading: true }).then(res => {
        //console.log('getList >>> ' + JSON.stringify(res));
        if (res.code === '00' && res.data) {
          this.pageInfo = res.data.pageInfo;
          that.boardData = [];
          if (res.data.list) {
            res.data.list.forEach(function(item) {
              that.boardData.push({
                outerFlag: item.outerFlag,
                province: item.province,
                city: item.city,
                orderNo: item.orderNo,
                orderProvince: item.gpsProvince,
                orderCity: item.gpsCity,
                consigneeAddr: item.consigneeAddr,
                orderChannel: item.channlName,
                orderSetDate: item.applyTime,
                orderActiveDate: item.activateTime,
                rentTerm: item.totalDays,
                goodsCategory: item.typeName,
                goodsDetail: item.pruduct,
                rentAmount: item.orderRentAmt,
                serviceAmount: item.orderFeeAmt,
                firstRentAmt: item.firstRentAmt,
                orderDepositAmt: item.orderDepositAmt,
                orderCreditAmt: item.orderCreditAmt,
                accountAmt: item.accountAmt,
                payDepositAmt: item.payDepositAmt,
                termFirstPayAmt: item.termFirstPayAmt,
                firstActualPay: item.firstActualPay,
                paidRentAmt: item.paidRentAmt,
                unpaidRentAmt: item.unpaidRentAmt,
                customerId: item.customerId,
                commodityNo: item.commodityNo,
                customerName: item.customerName,
                customerPhone: item.phoneNumber,
                idCard: item.idCard,
                customerSchool: item.school,
                orderStatus: item.orderDescription,
                orderType: item.orderType,
                overDealType: item.overDealType,
                flagRiscManagement: item.flagRiscManagement,
                statusRiscManagement: item.statusRiscManagement,
                registerChannel: item.registChiName,
                registerDate: item.registeDate,
                verifiedDate: item.realRegisDate,
                recommendName: item.recommendName,
                recommendPhone: item.recommendMobile,
                recommendId: item.recommendId,
                recommendSchool: item.recommendSchool,
                firstPayTime: item.firstActualPayTime,
                sendTime: item.deliverTime,
                receiveTime: item.signTime,
                partnerName: item.partnerName,
                BDMName: item.bdmName,
                cityManagerName: item.cnName,
                areaChief: item.areaManager,
                marketChief: item.marketManager
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

<style lang="scss" scoped>
  .box-input-div-sty {
    width: 220px;
    padding-right: 20px;
    margin-bottom: 10px;
    display: inline-block;
  }
  .box-time-div-sty {
    width: 220px;
    padding-right: 20px;
    margin-bottom: 10px;
    display: inline-block;
  }
  
  
  .text-input-sty{
    width: 220px;
  }
  .text-time-sty{
    width: 220px;
  }
</style>
