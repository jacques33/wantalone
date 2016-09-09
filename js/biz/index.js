/**
 * Created by jacques on 16/9/9.
 */

$(document).ready(function () {
    var ch = $(window).height();
    $('#main-panel').css('height',ch+'px');


    $('.js-new').click(function () {
        var main = $('#main-panel>.row');
        main.html('');
        $.ajax({
            type: 'GET',
            url: 'edit.html',
            dataType: "html",
            success: function (result) {
                main.html(result);
                var ch = $(window).height();
                $('.article-content').css('height',(ch-81-41)+'px');

                $('.font-tool').click(function() {
                    $(this).toggleClass('active');
                    // $('.article-content').focus();

                    switch($(this).data('role')) {
                        case 'bold':
                            document.execCommand('bold',false,'<b>');
                            break;
                        case 'italic':
                            document.execCommand('italic',false,'<i>');
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

                })
            }
        })
    });



});