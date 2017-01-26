//@ sourceURL=modules/ArticleLists.js
/**
 * Created by jacques on 16/9/18.
 */
$(document).ready(function () {

    $('.breadcrumb').hide().html('<li><a mid="ArticleList">主页</a></li>');

    var userinfo = wilddog.sync().ref('user');

    function listArticle() {
        //获取用户数据
        userinfo.on("child_added", function(snapshot) {
            if(snapshot.val().id == jacques.data.user.uid){
                jacques.data.userData = snapshot.val();
                //处理数据
                var data = jacques.data.userData.article;
                jacques.data.artList = data;
                var articles=[];
                for(var key in data){
                    articles.unshift(data[key]);
                }
                //渲染模版
                var tpl = $('.art-tpl').html();
                var html = Mustache.render(tpl,{article:articles});
                $('#ArticleList').append(html);
                jacques.data.userData.article = articles;
            }
        });
    }
    listArticle();
});

//获取单个文章详情
function getOneArticle(aid) {
    var data = jacques.data.artList;
    $.each(data,function (key, value) {
        if(value.id == aid){
            jacques.data.currentArt = value
        }
    });
}

//文章标题点击，打开文章详情
function openArt(obj) {
    var aid = $(obj).attr('aid');
    getOneArticle(aid);
    var main = $('#main-panel>.row');
    var old_html = main.html();
    main.html('');
    //获取文章列表模块
    jacques.getPage('ArticleContent',main,{
        fail:function () {
            alert('获取文章详情失败，请重试','warning',5000);
            main.html(old_html);
        }
    });
};
//新增文章
function addNew() {
    var main = $('#main-panel>.row');
    var fronthtml = main.html();
    main.html('');
    //获取编辑模块
    jacques.getPage('EditPanel',main,{
        fail:function () {
            //还原到之前的状态
            main.html(fronthtml);
        }
    });
};