//注意：每次调用$.get()或者$.post()或者$.ajax()的时候，会先调用这个函数。
$.ajaxPrefilter(function(options){
    
    //再发起真正的ajax之前，同意拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net'+options.url
    // 统一为有权限的接口设置header请求头
    if (options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token')||""
        }
    }
   //全局统一挂载complete回调函数
   options.complete = function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //1、强制清空token
        localStorage.removeItem('token')
        //2、强制跳转到登录页
        location.href = 'login.html'
        }
   }
})