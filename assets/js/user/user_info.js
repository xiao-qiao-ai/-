$(function(){
    var form=layui.form
    form.verity({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1-6个字符'
            }
        }
    })
    initUserInfo()
       function initUserInfo(){
       $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
                return layer.msg('获取信息失败')
            }
            console.log(res);form.val("formUserInfo",res.data)
           }
        })
    }

   $('#btnReset').on('click',function(e){
    e.preventDefault()
    initUserInfo()
    })



    $('.layui-form').on('submit',function(){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败')
                }
                layui.msg('更新信息成功')
                window.parent.getUserInfo()
            }
        })
    })
})
