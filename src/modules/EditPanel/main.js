/**
 * Created by jacques on 2016/9/14.
 */
$(document).ready(function () {
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
        var content = $('#content').html();

        console.log(t);
        if (t == '') {
            alert('标题不能为空', 'warning');
            title.focus();
        } else {
            var articleList = ref.child('user').child(author.key).child('article');
            articleList.push({
                "title" : t,
                "content": content
            })
        }


    })

});
