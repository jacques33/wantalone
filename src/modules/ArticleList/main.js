/**
 * Created by jacques on 16/9/18.
 */
$(document).ready(function () {
    var userinfo = wilddog.sync().ref('user');

    function listArticle() {
        //获取用户数据
        userinfo.on("child_added", function(snapshot) {
            if(snapshot.val().id == jacques.user.uid){
                jacques.userData = snapshot.val();
                //处理数据
                var data = jacques.userData.article;
                var articles=[];
                for(var key in data){
                    articles.unshift(data[key]);
                }
                //渲染模版
                var tpl = $('.art-tpl').html();
                var html = Mustache.render(tpl,{article:articles});
                $('#ArticleList').append(html);
                jacques.userData.article = articles;
            }
        });
    }
    
    //新增文章
    $('.js-new').click(function () {
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
    });

});