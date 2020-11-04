$(function(){
  FormData.verify({
    pwd:[/^[\S]{6,12}$/,'密码必须6-12且不能有空格'],
    samePwd:function(value){
      if(value===$('[name=oldPwd]').val()){
        return '新旧密码不能一样'
      }
    },
    rePwd:function(value){
     if(value!==$$('[name=oldPwd]').val()){
     return '两次密码不一致'
     }``
    }
  })
  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layui.layer.msg('更新密码失败')
        }
        layui.layer.msg('更新成功')
        $('.layui-form')[0].reseet()
      }
    })
  })
})