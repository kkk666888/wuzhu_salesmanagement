#### table 搜索区域

目前只支持 input 和 select

配置项：searchModel(表单 model), searchFields(搜索项配置), searchRules(搜索校验)

searchFields: {
type: '', // input、select
label: '', // 搜索项名称
name: '', // 关联表单字段
list: '' // select 对应 option 配置
}

事件： onSubmit、onReset 需配合 table 刷新
