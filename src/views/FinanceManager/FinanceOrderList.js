export default {
    name: 'financeOrderList',
    data() {
        let baseUrl = process.env.NODE_URL;
        let uploadPath = baseUrl + '/' + this.api.financeManager.importJinzuFinanceInfo.url;
        let downloadJinzuImportTemplate = baseUrl + '/' + this.api.financeManager.downloadJinzuImportTemplate.url;
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
                },
                {
                    channelCode: "002",
                    channelName: "金租"
                }
            ],
            searchCondition:{
                intoChannel: "",
                financeChannel: "",
                category: "",
                orderStatus: "",
                orderRentTotalDays: ""
            },
            fileList: [],
            importUrl: uploadPath,
            templateUrl: downloadJinzuImportTemplate
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
            this.$api.financeManager.queryFinanceList.send(param, { showLoading: true }).then(res => {
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
        // 下载模板
        downloadTemp(){
            let baseUrl = process.env.NODE_URL;
            let url = baseUrl + '/finance/download-jinzu-import-template';
            window.open(url);
        },
        // 导入
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        handelSuccess(response, file, fileList){
            if(response.code === '00'){
                this.$message({
                    message: '数据导入成功',
                    type: 'success'
                });
            }else{
                this.$alert(response.msg, '导入失败', {
                    confirmButtonText: '确定',
                    callback: action => {}
                  });
                this.fileList=[]
            }
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
                    { prop:'city',label:'城市',width:80 },
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
                    { prop:'activateTimeStr',label:'激活时间',width:150 },
                    { prop:'expireDateStr',label:'租赁到期时间',width:120 },
                    { prop:'orderStatusName',label:'订单状态',width:150 },
                    { prop:'buyoutAmt',label:'买断价',width:80 },
                    { prop:'rentSolution',label:'租赁方案',width:100 },
                    { prop:'depreciationRatio',label:'折旧系数',width:80 },
                    { prop:'scrapValueAmt',label:'残值',width:80 },
                    { prop:'customerName',label:'客户姓名',width:80 },
                    { prop:'certId',label:'身份证号',width:150 },
                    { prop:'receiverTel',label:'收货人电话',width:100 },
                    { prop:'receiverAddr',label:'收货地址',width:200 },
                    { prop:'allRentAmt',label:'全部租金',width:80 },
                    // { prop:'financeTimeStr',label:'融资时间',width:150 },
                    // { prop:'financeAmt',label:'融资金额',width:80 },
                    { prop:'financeCount',label:'融资次数',width:80 },
                    { prop:'financeName',label:'资金方',width:100 }
                ]
            }
            return option;
        }
    }
}