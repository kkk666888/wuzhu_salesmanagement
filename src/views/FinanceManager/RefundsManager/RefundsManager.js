import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
  name: 'RefundsManager',
  data() {
    return {
      tableData: [], // table数据
      tableOption: this.getTableOption(), // table配置
      searchRules: {}, // 搜索校验
      searchModel: {
        orderNo: '',
        customerName: '',
        thirdTransactionNo: '', //  第三放交易流水号
        transactionNo: '' // 物主交易流水号
      },
      searchFields: this.getSearchFields(), // 搜索配置
      searchOptions: this.getSearchOptions() // 搜索列表
    };
  },
  component: {},
  computed: {},
  methods: {
    // 搜索选择框列表
    getSearchOptions() {
      let option = {};
      return option;
    },
    // 搜索配置
    getSearchFields() {
      let option = [
        {
          type: 'input',
          label: '订单号',
          name: 'orderNo'
        },
        {
          type: 'input',
          label: '物主交易流水号',
          name: 'transactionNo'
        },
        {
          type: 'input',
          label: '第三方交易流水号',
          name: 'thirdTransactionNo'
        },
        {
          type: 'input',
          label: '客户姓名',
          name: 'customerName'
        }
      ];
      return option;
    },
    //表格配置
    getTableOption() {
      const _this = this;
      let option = {
        idField: 'refundNo',
        showPage: true,
        autoHeight: true,
        // showSerial: true,
        showRadio: true,
        columns: [
          { prop: 'orderNo', label: '订单编号', width: '200' },
          { prop: 'transactionNo', label: '物主交易流水号', width: '160' },
          { prop: 'thirdTransactionNo', label: '第三方交易流水号', width: '160' },
          {
            prop: 'payTime',
            label: '交易时间',
            render(h, param) {
              let date = _this.$common.formatDate(param.row.payTime);
              return <span>{date}</span>;
            }
          },
          {
            prop: 'payAmount',
            label: '交易金额'
          },
          { prop: 'refundAmt', label: '退款金额' },
          { prop: 'customerId', label: '客户编号', width: '150' },
          { prop: 'customerName', label: '客户姓名' },
          { prop: 'certId', label: '身份证号' },
          { prop: 'intoChannel', label: '进件渠道' },
          {
            prop: 'orderStatus',
            label: '订单状态'
          }
        ]
      };
      return option;
    },
    // 搜索
    search() {
      this.$refs.refundsTable.refreshPaging(1);
    },
    // 重置
    reset() {
      this.$refs.searchForm.resetFields();
    },
    //加载表格数据
    getList(pageInfo, callback) {
      let param = {
        pageNum: pageInfo.pageIndex,
        pageSize: pageInfo.pageSize,
        ...this.searchModel
      };

      this.$api.refunds.query.send(param, { showLoading: true }).then(res => {
        if (res.code === '00') {
          this.tableData = res.data.list || [];
          callback(res.data.total);
        }
      });
    },
    // 确认退款
    confirmRefund() {
      let row = this.$refs.refundsTable.getSelectedRow();
      if (row) {
        this.applyRefund(row);
      } else {
        this.$alert.info('请选择订单');
      }
    },
    async applyRefund(row) {
      let param = {
        orderNo: row.orderNo,
        refundAmt: row.refundAmt,
        refundNo: row.refundNo,
        refundResult: 'SUCCESS'
      };

      // param['refundResult'] = 'SUCCESS';
      try {
        let res = await this.$api.refunds.confirm.send(param, { showLoading: true });
        if (res.code === '00') {
          this.$alert.toast('退款成功');
          this.$refs.refundsTable.refreshPaging(1);
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 导出表格为Excel
    exportData() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#refunds'));
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        let date = this.$common.formatDate(new Date()).split(' ')[0];
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `退款${date}.xlsx`);
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout);
      }
      return wbout;
    }
  },
  mounted() {}
};
