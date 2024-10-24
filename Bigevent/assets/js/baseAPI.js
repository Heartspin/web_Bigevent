/* 
每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，会先调用 ajaxPrefilter 这个函数
在这个函数中，可以拿到我们给Ajax提供的配置对象
*/
$.ajaxPrefilter(function (options) {
    // 发起请求前，拼接请求的根路径
    options.url = 'http://127.0.0.1:9000' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        // 统一为有权限的接口设置headers请求头
        options.headers = {
            authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局挂载 complete 回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
            // 强制清空token
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = 'login.html'
        }
    }
})