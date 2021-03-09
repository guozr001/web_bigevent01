$(function() {
    // 调用getUserInfo获取用户信息
    getUserInfo();
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 清空本地存储中的token
            // 重新跳转到登录页
            localStorage.removeItem('token')
            location.href = 'login.html'

            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')||""

        // },
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data);
        }

        //不论成功还是失败都会调用complete回调函数


    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
        // 设置欢迎的文本
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)
        // 按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}