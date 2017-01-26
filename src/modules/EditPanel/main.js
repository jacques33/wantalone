//@ sourceURL=modules/EditPanel.js
/**
 * Created by jacques on 2016/9/14.
 */
$(document).ready(function () {

    $('.breadcrumb').html('<li><a mid="ArticleList">主页</a></li><li><span mid="EditPanel">编辑文章</span></li>').show();
    changeLinkStatus();
    
    var ch = $(window).height();
    $('.article-content').css('height', (ch - 81 - 51) + 'px');

    //编辑器
    $('.article-content .font-tool').click(function () {
        // $('.article-content').focus();

        switch ($(this).data('role')) {
            case 'bold':
                document.execCommand('bold', false, '<b>');
                break;
            case 'italic':
                document.execCommand('italic', false, '<i>');
                break;
            case 'p':
                document.execCommand('formatBlock', false, '<' + $(this).data('role') + '>');
                break;
            case 'blockquote':
                $('.article-content').append('<blockquote><span></span></blockquote><p><br/></p>');
                break;
            default:
                document.execCommand($(this).data('role'), false, null);
                break;
        }
    });

    //保存文章
    $('.js-save-article').click(function () {
        var title = $('#title');
        var t = title.val();

        var content = $('#editContent').html();
        console.log(t);
        if (t == '') {
            alert('标题不能为空', 'warning');
            title.focus();
        } else {
            //文章长度
            var fontLen = $("#editContent").text().replace(/\s+/g,"").length;
            //获取当前提交时间
            var current = jacques.getCurrentTime();

            //查询之前的文章数据
            var currUser = ref.child('user').child(author.key);
            var artnum,updateData1,updateData2;
            currUser.child('article').on('value', function(snapshot, error) {
                if (!error) {
                    var article = snapshot.val();
                    artnum = jacques.data.userData.article.length;

                    updateData1 = {
                        "id": artnum+1,
                        "title" : t,
                        "content": content,
                        "fontnum": fontLen,
                        "date": current.date,
                        "time": current.time
                    };
                    updateData2 = {
                        'artnum': artnum+1,
                        'fontnum': author.data.fontnum +fontLen
                    };

                } else {
                    console.log(error);
                }
            });
            //上传文章
            currUser.child('article').push(updateData1,function (error) {
                if(error == null){
                    alert('保存成功!','success',1500);
                    setTimeout(function () {
                        $('#main-panel>.row').html('');
                        fillAuthInfo();
                        addArticleList();
                    },1500);

                }else{
                    alert('上传文章失败,请检查网络后重新保存','warning')
                }
            });
            //更新文章信息
            updateUserInfo(updateData2,{
                succ: function () {
                    // alert('保存成功!','success');
                },
                fail:function () {
                    alert('更新文章信息失败,请检查网络后重新保存','warning')
                }
            })

        }

    })
    
});
function editCurrentArt() {
    $('.breadcrumb').html('<li><a mid="ArticleList">主页</a></li><li><a mid="ArticleContent">文章详细</a></li><li><span mid="EditPanel">编辑文章</span></li>').show();

    $('#title').val(jacques.data.currentArt.title);
    $('.editContent').html(jacques.data.currentArt.content).focus();
}
