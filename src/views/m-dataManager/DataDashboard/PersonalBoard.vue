<template>
  <div class="PersonalBoard">
    <div class="box-export">
      <el-button @click="onExport">导出</el-button>
    </div>
    <my-table id="out-table" :data="boardData" :option="boardOption" :onPaging="getList"></my-table>
  </div>
</template>

<script>
  import exportFile from './export.js'
  export default {
    name: 'PersonalBoard',
    data() {
      return {
        boardOption: this.getTableOption(),
        boardData: [],
        pageInfo: {
          pageSize: '',    // 每页显示条数
          pageNum: '',    // 当前页
          pageIndex: '',    // 忽略
          total: ''    // 总条数
        }
      }
    },
    mounted() {
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
            {prop: 'name', label: '姓名'},
            {prop: 'employeeNo', label: '工号'},
            {prop: 'chiefPositionName', label: '职位'},
            {prop: 'workPlace', label: '工作地'},
            {prop: 'leader', label: '上级姓名'},
            {prop: 'subordinateNum', label: '下级人数'},
            {prop: 'city', label: '负责城市'}
          ]
        };
        return option;
      },
      onExport() {
        console.log('onExport')
        this.$api.personal.exportData.send({ showLoading: true }).then(res => {
          console.log('res ===> ' + JSON.stringify(res))
          exportFile(res.data, '个人基本情况')
        })
      },
      exportExcel () {
        console.log('exportExcelw')
        /* generate workbook object from table */
        // var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        // console.log('xlsx ===> ' + wbout)
        // FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetss22.xlsx')
        // axios.post('https://wuzhutes.woozhu.cn/market/data/export-persion-info', {
        //     withCredentials: true,
        //     responseType: 'arraybuffer',
        //     timeout: 120000,
        //     onDownloadProgress: function(progressEvent) {
        //         console.log(progressEvent)
        //     }
        // }, header: {
        //     'content-type': 'application/octet-stream'
        // }).then(res => {
        //   console.log('ok')
            // let _data = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        //     let _name = obj.title || _getName()
            // fileSaver.saveAs(_data, _name + '.xls')
        //     //myMsg.close()
        // })

        // let params = {
          // responseType: 'arraybuffer',
        // }

       //  console.log('exportExcel')
       //  this.$http.post('data/export-persion-info', params, headers).then(res => {
       //    console.log('response OK')
       //   try {
       //   FileSaver.saveAs(new Blob([res.data], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
       // } catch (e) { if (typeof console !== 'undefined') console.log(e, res.data) }
       // return res.data
       //  })
       // this.$api.data.export.send(params,{showLoading:true}).then(res=>{

       // })
       this.$http.post('data/export-persion-info').then(res => {
        console.log('res ===> ' + JSON.stringify(res))
        let bytes = window.atob(res.data)
        let length = bytes.length
        let u8arr = new Uint8Array(length)
        while(length--) {
          u8arr[length] = bytes.charCodeAt(length)
        }
        try {
         FileSaver.saveAs(new Blob([u8arr], { type: 'application/octet-stream' }), 'sheetssm.xls')
       } catch (e) { if (typeof console !== 'undefined') console.log(e, res) }
        })
      },
      getList(pageInfo, callback) {
        let that = this
        let params = {
          'pageSize': pageInfo.pageSize,
          'pageNum': pageInfo.pageIndex
        }
        this.$api.personal.queryData.send(params, { showLoading: true }).then(res => {
          console.log('getPersonalData >>> ' + JSON.stringify(res))
          if (res.code === '00' && res.data) {
            this.pageInfo = res.data.pageInfo
            that.boardData = []
            if (res.data.list) {
              res.data.list.forEach(function (item) {
                that.boardData.push({
                  'name': item.name,
                  'employeeNo': item.employeeNumber,
                  'chiefPositionName': item.positionName,
                  'workPlace': item.workplace,
                  'leader': item.chiefName,
                  'subordinateNum': item.lowerPersonCount,
                  'city': item.responsibleCity
                })
              })
            }
            callback(res.data.pageInfo.total)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .PersonalBoard {
    .box-export {
      margin-left: 40%;
      margin-bottom: 10px;
    }
  }
</style>

