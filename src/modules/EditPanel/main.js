//@ sourceURL=modules/EditPanel.js
/**
 * Created by jacques on 2016/9/14.
 */
//文本格式初始化
var contentStyle = {
    'line-height':'22px',
    'text-align': 'left'
};
$(document).ready(function () {

    $('.breadcrumb').html('<li><a mid="ArticleList">主页</a></li><li><span mid="EditPanel">编辑文章</span></li>').show();

    var ch = $(window).height();
    $('.article-content').css('height', (ch - 81 - 51-56) + 'px');

    //编辑器
    // $('.article-content .font-tool').click(function () {
    //     // $('.article-content').focus();
    //
    //     switch ($(this).data('role')) {
    //         case 'bold':
    //             document.execCommand('bold', false, '<b>');
    //             break;
    //         case 'italic':
    //             document.execCommand('italic', false, '<i>');
    //             break;
    //         case 'p':
    //             document.execCommand('formatBlock', false, '<' + $(this).data('role') + '>');
    //             break;
    //         case 'blockquote':
    //             $('.article-content').append('<blockquote><span></span></blockquote><p><br/></p>');
    //             break;
    //         default:
    //             document.execCommand($(this).data('role'), false, null);
    //             break;
    //     }
    // });


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
            var fontLen = $("#editContent").text().replace(/\s+/g, "").length;
            //获取当前提交时间
            var current = jacques.getCurrentTime();

            //查询之前的文章数据
            var currUser = ref.child('user').child(author.key);
            var artnum, updateData1, updateData2;
            //如果是新文章
            if (jacques.data.currentArt == '') {
                currUser.child('article').on('value', function (snapshot, error) {
                    if (!error) {
                        var article = snapshot.val();
                        artnum = jacques.data.userData.article.length;

                        updateData1 = {
                            "id": artnum + 1,
                            "title": t,
                            "content": content,
                            "fontnum": fontLen,
                            "date": current.date,
                            "time": current.time,
                            "contentStyle":contentStyle
                        };
                        updateData2 = {
                            'artnum': artnum + 1,
                            'fontnum': author.data.fontnum + fontLen
                        };

                    } else {
                        console.log(error);
                    }
                });
                //上传文章
                currUser.child('article').push(updateData1, function (error) {
                    if (error == null) {
                        alert('保存成功!', 'success', 1500);
                        setTimeout(function () {
                            $('#main-panel>.row').html('');
                            fillAuthInfo();
                            addArticleList();
                        }, 1500);

                    } else {
                        alert('上传文章失败,请检查网络后重新保存', 'warning')
                    }
                });
                //更新文章信息
                updateUserData(updateData2, {
                    succ: function () {
                        // alert('保存成功!','success');
                    },
                    fail: function () {
                        alert('更新文章信息失败,请检查网络后重新保存', 'warning')
                    }
                });

            } else {
                //如果是编辑原有的文章
                var aid = jacques.data.currentArt.id;
                var currArt;
                var articles = currUser.child('article').on("child_added", function (snapshot) {
                    //找到id对应的文章
                    if (snapshot.val().id == aid) {
                        currArt = snapshot.key();
                    }
                });
                //更新文章内容
                var updateData3 = {
                    "id": aid,
                    "title": t,
                    "content": content,
                    "fontnum": fontLen,
                    "contentStyle":contentStyle,
                    "updateDate": current.date,
                    "updateTime": current.time,
                };
                currUser.child('article').child(currArt).update(updateData3).then(function () {
                    var updateData4;
                    //更新本地数据
                    jacques.data.currentArt = $.extend(jacques.data.currentArt,updateData3);
                    //获取所有文章信息
                    currUser.on("value", function (snapshot) {
                        jacques.data.userData = snapshot.val();
                        //处理数据
                        var data = jacques.data.userData.article;
                        jacques.data.artList = data;
                        //循环获取所有文章数和字数
                        var cnum = 0,artnum = 0;
                        for (var key in data) {
                            cnum += data[key].fontnum;
                            artnum++
                        }
                        updateData4 = {
                            'artnum': artnum,
                            'fontnum': cnum
                        };
                    });
                    //更新用户信息信息
                    updateUserData(updateData4, {
                        succ: function (json) {
                            jacques.data.userData = json;
                            alert('更新文章成功!', 'success',3000);
                        },
                        fail: function () {
                            alert('更新文章信息失败,请检查网络后重新保存', 'warning',3000)
                        }
                    });
                    //返回文章展示页面
                    $('a[mid="ArticleContent"]').trigger('click');
                });
            }


        }

    })

});
function editCurrentArt() {
    $('.breadcrumb').html('<li><a mid="ArticleList">主页</a></li><li><a mid="ArticleContent">文章详细</a></li><li><span mid="EditPanel">编辑文章</span></li>').show();

    $('#title').val(jacques.data.currentArt.title);
    $('#editContent').html(jacques.data.currentArt.content).focus();
}


//文字格式选择
function toolBar(obj) {
    var alignChoosed = $(obj).data('role');
    if(alignChoosed == 'line-height'){
        var lh = $('#editContent').css('line-height');
        if(lh != '30px'){
            lh = '30px';
        }else{
            lh = '22px';
        }
        $('#editContent').css('line-height',lh);
        contentStyle['line-height'] = lh;
    }else{
        $('#editContent').css('text-align',alignChoosed);
        contentStyle['text-align'] = alignChoosed;
    }
};