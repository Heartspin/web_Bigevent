// 入口函数
$(function () {
    // 点击去注册
    $('#link-reg').on('click', function () {
        $('.log-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录
    $('#link-log').on('click', function () {
        $('.log-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    form.verify({
        // 密码校验
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repass: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 调用接口，实现注册
    $('#form-reg').on('submit', e => {
        // 阻止默认提交
        e.preventDefault()
        // 发起Ajax的post请求
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.post(
            '/api/register',
            data,
            res => {
                if (res.status !== 0) {
                    layer.msg(res.message);
                } else {
                    layer.msg('注册成功')
                    // 模拟点击行为
                    $('#link-log').click()
                }
            }
        )
    })
})

// 调用接口，实现登录
$('#form-log').submit(e => {
    // 阻止默认提交
    e.preventDefault()
    // 发起Ajax请求
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: {
            username: $('#form-log [name=username]').val(),
            password: $('#form-log [name=password]').val()
        },
        success: res => {
            if (res.status !== 0) {
                return layer.msg(res.message)
            } else {
                layer.msg('登录成功')
                // 将登录成功得到的token字符串，保存到localStorage
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = 'index.html'
            }
        }
    })
})