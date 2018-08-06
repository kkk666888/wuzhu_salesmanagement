##图片上传 目前支持单个上传
<my-upload v-model="value"></my-upload>

##属性

@uploadBefore="" 参数 file
@uploadSuccess="" 参数 data,file
@uploadError="" 参数 err,file

visible="true"
limit="1" 最大允许上传图片数量
acceptType="1" 上传类型 1-图片 2-电子表格 其他值则取accept值
accept="" 自定义上传类型
option = {
    tips:'',
    width:100,
    height:100
}

##事件
open() 打开选择窗口
removeFile(uid) 移除文件




text/picture/picture-card