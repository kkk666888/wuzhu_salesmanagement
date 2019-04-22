export default {
    name: 'jinzuFinanceManager',
    data() {
        return {
            tableData: [],
            tableOption: this.getTableOption(), // table配置
            intoChannels:[
                {
                    channelCode: "001",
                    channelName: "物主微信公众号"
                },
                {
                    channelCode: "002",
                    channelName: "支付宝小程序"
                },
                {
                    channelCode: "003",
                    channelName: "物主京东合作渠道"
                },
                {
                    channelCode: "004",
                    channelName: "支付宝生活号"
                },
                {
                    channelCode: "005",
                    channelName: "IOS APP"
                }
            ],
            financeChannels: [
                {
                    channelCode: "001",
                    channelName: "来组"
                }
            ],
            searchCondition:{
                intoChannel: "",
                financeChannel: "",
                category: "",
                orderStatus: "",
                orderRentTotalDays: ""
            }
        }
    },
    component: {},
    computed: {},
    methods: {
        getList(pageInfo, callback){
            let param = {
              pageNum: pageInfo.pageIndex,
              pageSize: pageInfo.pageSize,
              intoChannel: this.searchCondition.intoChannel,
              financeChannel: this.searchCondition.financeChannel,
              category: this.searchCondition.category,
              orderStatus: this.searchCondition.orderStatus,
              orderRentTotalDays: this.searchCondition.orderRentTotalDays
            }
            this.$api.financeManager.queryJinzuFinanceList.send(param, { showLoading: true }).then(res => {
              if (res.code === '00') {
                this.tableData = res.data.list || [];
                callback(res.data.total);
              }
            })
        },
        // 查询数据
        queryFinanceOrderList(){
            this.$refs.table.refreshPaging(1);
        },
        // 重置查询条件
        resetConditions(){
            this.searchCondition = {};
            this.$refs.table.refreshPaging(1);
        },
        // 导出
        exportFinanceOrderList(){
            let baseUrl = process.env.NODE_URL;
            let param = 'intoChannel=' + this.searchCondition.intoChannel + '&financeChannel='+this.searchCondition.financeChannel + '&category='+this.searchCondition.category + '&orderStatus='+this.searchCondition.orderStatus + '&orderRentTotalDays='+this.searchCondition.orderRentTotalDays;
            let url = baseUrl + '/finance/export-finance-list?' + param;
            window.open(url);
        },
        // 初始化表格列
        getTableOption(){
            let thisObj = this;
            let option = {
                showPage:true,
                autoHeight:true,
                showSerial:true,
                columns:[
                    { prop:'orderNo',label:'订单号',width:150 },
                    { prop:'intoChannelName',label:'渠道',width:120 },
                    { prop:'gpsCity',label:'城市',width:80 },
                    { prop:'commodityBand',label:'商品品牌',width:100 },
                    { prop:'shortName',label:'商品品类',width:120 },
                    { prop:'fullName',label:'商品描述',width:200 },
                    // { prop:'specContentList',label:'商品属性',width:100 },
                    { prop:'model',label:'型号',width:60 },
                    { prop:'memory',label:'内存',width:60 },
                    { prop:'color',label:'颜色',width:60 },
                    { prop:'commodityNo',label:'商品编号',width:100 },
                    { prop:'iemi',label:'商品IEMI码',width:150 },
                    { prop:'invoiceAmt',label:'发票金额',width:80 },
                    { prop:'depositAmt',label:'已冻结/支付押金',width:80 },
                    { prop:'repaymentPeriodAmt',label:'每期还款金额',width:80 },
                    { prop:'activateTime',label:'激活时间',width:150 },
                    { prop:'expireDate',label:'租赁到期时间',width:150 },
                    { prop:'orderStatusName',label:'订单状态',width:150 },
                    { prop:'buyoutAmt',label:'买断价',width:80 },
                    { prop:'rentSolution',label:'租赁方案',width:100 },
                    { prop:'depreciationRatio',label:'折旧系数',width:80 },
                    { prop:'scrapValueAmt',label:'残值',width:80 },
                    { prop:'customerName',label:'客户姓名',width:80 },
                    { prop:'certId',label:'身份证号',width:150 },
                    { prop:'receiverTel',label:'收货人电话',width:100 },
                    { prop:'receiverAddr',label:'收货地址',width:200 },
                    { prop:'payedPeriod',label:'已付期数',width:80 },
                    { prop:'allRentAmt',label:'全部租金',width:80 },
                    { prop:'allPayedRentAmt',label:'已付租金(不含服务费)',width:100 },
                    { prop:'allWaitPayRentAmt',label:'待付租金(不含服务费)',width:100 },
                    { prop:'financeName',label:'资金方',width:100 },
                    { prop:'financePushTime',label:'资金推送日期',width:100 }
                ]
            }
            return option;
        }
    }
}