export default {
  name: 'AddresslistManager',
  data() {
    return {
      tableData: [], // table数据
      tableOption: this.getTableOption(), // table配置
      searchRules: {}, // 搜索校验
      searchModel: {
        province: '',
        city: '',
        name: '',
        positionName: '',
        departmentId: ''
      },
      searchFields: this.getSearchFields(), // 搜索配置
      searchOptions: this.getSearchOptions(), // 搜索列表
      selectedRole: null,
      treeData: null,
      treeOption: {
        idField: 'id',
        displayField: 'name',
        childField: 'childList',
        leafField: 'parentId',
        showAllChild: true
      },
      defaultProps: {
        label: 'name',
        children: 'childList'
      },
      data2: []
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
          label: '省份',
          name: 'province'
        },
        {
          type: 'input',
          label: '城市',
          name: 'city'
        },
        {
          type: 'input',
          label: '姓名',
          name: 'name'
        },
        {
          type: 'input',
          label: '职位',
          name: 'positionName'
        }
      ];
      return option;
    },
    //表格配置
    getTableOption() {
      let option = {
        idField: '',
        showPage: true,
        autoHeight: true,
        showSerial: true,
        columns: [
          { prop: 'companyName', label: '公司' },
          { prop: 'departmentName', label: '部门' },
          { prop: 'province', label: '省份' },
          { prop: 'city', label: '城市' },
          { prop: 'name', label: '姓名' },
          { prop: 'positionName', label: '职位' },
          { prop: 'mobiletelephone', label: '手机号码' },
          { prop: 'email', label: '邮箱' }
        ]
      };

      return option;
    },
    // 搜索
    search() {
      this.$refs.addressTable.refreshPaging(1);
    },
    // 重置
    reset() {
      this.$refs.searchForm.resetFields();
    },
    //加载表格数据
    getList(pageInfo, callback) {
      let param = {
        pageNum: pageInfo.pageIndex,
        pageSize: pageInfo.pageSize
        // departName: this.searchModel.departName,
        // departCode: this.searchModel.departCode
      };
      param = { ...param, ...this.searchModel };

      this.$api.address.query.send(param, { showLoading: true }).then(res => {
        if (res.errCode === 0 || res.code === '00') {
          this.tableData = res.data.list || res.data.rows || [];
          callback(res.data.total || res.data.pageInfo.total);
        }
      });
    },
    // 获取部门数据
    async getDepartmentTreeData() {
      let param = {};
      try {
        let res = await this.$api.department.tree.send(param, { showLoading: true });
        if (res.code === '00') {
          this.data2 = res.list || res.data;
        }
      } catch (error) {
        this.$alert.error(error.message);
      }
    },
    handleTreeData(data) {
      if (!data.length) {
        return;
      }
      let ret = [];
      data.forEach(element => {
        let op = {
          idField: element.id,
          displayField: element.name,
          showAllChild: true,
          childField: this.handleTreeData(element.childList) || []
        };
        ret.push(op);
      });
      return ret;
    },
    treeClickSearch(item, node, component) {
      // console.log(item);
      this.$set(this.searchModel, 'departmentId', item.id);
      this.$refs.addressTable.refreshPaging(1);
    }
  },
  mounted() {
    this.getDepartmentTreeData();
  }
};
