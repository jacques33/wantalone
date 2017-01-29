//@ sourceURL=modules/ArticleContent.js
/**
 * Created by jacques on 17/1/26.
 */
$(document).ready(function () {

    $('.breadcrumb').html('<li><a mid="ArticleList">主页</a></li><li><span mid="ArticleContent">文章详细</span></li>').show();
    // changeLinkStatus();
    //渲染模版
    var tpl = $('.atc-tpl').html();
    var art = jacques.data.currentArt;
    var html = Mustache.render(tpl,{article:art});
    $('.atc-tpl').html(html);
    $('.atc-content').html(art.content).css(art.contentStyle);

});
function editCurrentArt() {
    var main = $('#main-panel>.row');
    var fronthtml = main.html();
    main.html('');
    //获取编辑模块
    jacques.getPage('EditPanel',main,{
        succ:function(){
            editCurrentArt();
        },
        fail:function () {
            //还原到之前的状态
            main.html(fronthtml);
        }
    });
}
