//注意：每次调用$.get()或者$.post()或者$.ajax()的时候，会先调用这个函数。
$.ajaxPrefilter(function(options){
    //再发起真正的ajax之前，同意拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net'+options.url
})