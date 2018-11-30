<template>
  <div class="WindBoard">
    <div>
      <div class="box-planPayAmt">
        当月应收租金：
        <el-input class="planPayAmt" v-model="statisticsData.planPayAmt" :disabled="true">
        </el-input>
      </div>
      <div class="box-actualPayAmt">
        当月实收租金：
        <el-input class="actualPayAmt" v-model="statisticsData.actualPayAmt" :disabled="true">
        </el-input>
      </div>
      <div class="box-losePercent">
        损失率：
        <el-input class="losePercent" v-model="statisticsData.losePercent" :disabled="true">
        </el-input>
      </div>
      <div class="box-passPercent">
        通过率：
        <el-input class="passPercent" v-model="statisticsData.passPercent" :disabled="true">
        </el-input>
      </div>
    </div>
    
    <div class="box-export">
    <el-button @click="onExport">导出</el-button>
    </div>
    <my-table class="table" ref="boardTable" :data="boardData" :option="boardOption" :onPaging="getList"></my-table>
  </div>
</template>

<script>
import exportFile from './export.js'
export default {
  name: 'WindBoard',
  data() {
    return {
      pageSize: '10', // 每页显示数量
      pageNum: '1', // 默认第一页
      boardData: [],
      boardOption: this.getTableOption(),
      statisticsData: {
        planPayAmt: null,
        actualPayAmt: null,
        losePercent: null,
        passPercent: null
      },
      pageInfo: {
        pageSize: '', // 每页显示条数
        pageNum: '', // 当前页
        pageIndex: '', // 忽略
        total: '' // 总条数
      }
    };
  },
  mounted() {
    this.getStatisticsData();
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
          { prop: 'name', label: '还款人姓名', width: 90 },
          { prop: 'contact', label: '联系方式' },
          { prop: 'school', label: '学校', width: 100 },
          { prop: 'goods', label: '商品', width: 200 },
          { prop: 'amount', label: '总租金' },
          { prop: 'unCreditAmount', label: '未履约金额', width: 90 },
          { prop: 'orderStatus', label: '订单状态' },
          { prop: 'rentTerm', label: '租赁周期' },
          { prop: 'repaymentTerm', label: '已还期数' },
          { prop: 'unPaymentTerm', label: '未还期数' }
        ]
      };
      return option;
    },
    getStatisticsData() {
      this.$api.wind.queryStatisticsData.send({ showLoading: true }).then(res => {
        console.log('getStatisticsData >>> ' + JSON.stringify(res));
        if (res.code === '00' && res.data) {
          this.statisticsData = res.data;
        }
      });
    },
    onExport() {
      console.log('onExport')
      this.$api.wind.exportData.send({ showLoading: true }).then(res => {
        console.log('res ===> ' + JSON.stringify(res))
        exportFile(res.data, '风控详情')
      })
    },
    getList(pageInfo, callback) {
      let that = this;
      let params = {
        pageSize: pageInfo.pageSize,
        pageNum: pageInfo.pageIndex
      };
      this.$api.wind.queryData.send(params, { showLoading: true }).then(res => {
        console.log('getWindDetailData >>> ' + JSON.stringify(res));
        if (res.code === '00' && res.data) {
          this.pageInfo = res.data.pageInfo;
          that.boardData = [];
          if (res.data.list) {
            res.data.list.forEach(function(item) {
              that.boardData.push({
                province: item.province,
                city: item.city,
                name: item.customerName,
                contact: item.phoneNumber,
                school: item.school,
                goods: item.pruduct,
                amount: item.orderRentAmt,
                unCreditAmount: item.overdueAmt,
                orderStatus: item.orderDescription,
                rentTerm: item.totalTerm,
                repaymentTerm: item.hadPayCnt,
                unPaymentTerm: item.notPayCnt
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

<style lang="scss">
.WindBoard {
  .box-planPayAmt {
    width: 22%;
    margin-left: 2%;
    margin-bottom: 10px;
    display: inline-block;
    .planPayAmt {
      width: 50%;
    }
  }
  .box-actualPayAmt {
    width: 22%;
    margin-left: 2%;
    margin-bottom: 10px;
    display: inline-block;
    .actualPayAmt {
      width: 50%;
    }
  }
  .box-losePercent {
    width: 22%;
    margin-left: 2%;
    margin-bottom: 10px;
    display: inline-block;
    .losePercent {
      width: 50%;
    }
  }
  .box-passPercent {
    width: 22%;
    margin-left: 2%;
    margin-bottom: 10px;
    display: inline-block;
    .passPercent {
      width: 50%;
    }
  }

  .box-confirm {
    margin-left: 40%;
    margin-top: 10px;
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

  .table {
   // margin-top: 20px;
  }
  .box-export {
    margin-left: 40%;
    margin-bottom: 10px;
  }
}
</style>
