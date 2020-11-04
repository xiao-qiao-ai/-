$(function () {
  getUserInfo()
  var layer = layui.layer

  // 点击按钮，实现退出功能
  $('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index)
    })
  })
})

//获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取信息失败')
      }
      renderAvatar(res.data)
    },
    complete: function (res) {
      if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败') {
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
    }

  })
}

// 用户昵称
function renderAvatar(user) {
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()   //获取第一个字符  
    $('.text-avatar').html(first).show()
  }
}