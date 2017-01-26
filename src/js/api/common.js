/**
 * Created by jacques on 16/9/8.
 */
//野狗api初始化
var config = {
    authDomain: "editor.wilddog.com",
    syncURL: "https://editor.wilddogio.com"
};
wilddog.initializeApp(config, "DEFAULT");

var ref = wilddog.sync().ref();


$(document).ready(function () {
    var dh = $('body').height();
    var ch = $(window).height();
    // if(dh <= ch){
    //     $("#footer").css({
    //         "position":"fixed",
    //         "bottom":'0'
    //     })
    // }
    //读取用户缓存；
    var href = window.location.href;
    if(href.indexOf('login') > 0){
        var user = localStorage.getItem('jacques_user');
        user = JSON.parse(user);
        if(user){
            $('.js-email').val(user.email);
            $('.js-psd').val(user.pwd);
        }
    }

});

//打开文章详情页
function addArticleList(){
    var main = $('#main-panel>.row');
    var old_html = main.html();
    main.html('');
    //获取文章列表模块
    jacques.getPage('ArticleList',main,{
        fail:function () {
            alert('加载失败，请重试','warning',5000);
            main.html(old_html);
        }
    });
}
//路径导航点击事件
function toModule(event) {
    var mid = $(event.target).attr('mid');
    if(event.target.tagName == 'span'){
        return
    }
    var main = $('#main-panel>.row');
    var old_html = main.html();
    main.html('');
    //获取模块
    jacques.getPage(mid,main,{
        fail:function () {
            alert('加载失败，请重试','warning',5000);
            main.html(old_html);
        }
    });
}
// //路径增加，将当前路径的前面所有路径变成可点击状态
// function changeLinkStatus() {
//     var num = $('.breadcrumb').find('span').length;
//     if(num >= 2){
//         var length = $('.breadcrumb').find('li').length;
//         for(var i=0;i<length-1;i++){
//             var html = $('.breadcrumb>li').eq(i).html();
//             html = html.replace('span','a');
//             $('.breadcrumb>li').eq(i).html(html);
//         }
//     }
// }

