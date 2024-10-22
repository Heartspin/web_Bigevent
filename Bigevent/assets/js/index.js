$(function () {
    // 禁止选中文字
    $('body').on('selectstart', function (e) {
        e.preventDefault()
    })
    // 获取用户信息
    getUserInfo()
    // 退出功能
    var layer = layui.layer
    $('#login-out').on('click', function () {
        // 通过layui提供的layer弹出确认框
        layer.confirm('确定退出吗?', {
            btn: ['确定', '取消'],
        },
            function () {
                // 清空token
                localStorage.removeItem('token')
                // 跳转到登录页面
                location.href = 'login.html'
                // 关闭确认框
                layer.close()
            })
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userInfo',
        mtthod: 'GET',
        // 请求头配置
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: res => {
            // 响应失败
            if (res.status !== 0) {
                return layer.msg(res.message)
            } else {
                // 渲染头像
                renderAvatar(res.data)
            }
        }
    })
}

function renderAvatar(user) {
    // 获取用户名
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}