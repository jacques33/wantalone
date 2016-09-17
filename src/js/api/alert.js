/**
 * Created by jacques on 16/9/6.
 */

//弹出提示框
function alert(text, type) {
    //拼接dom
    var html = '<div class="alert alert-dismissable alert-' + type + '" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" onclick="removeAlert(this)">×</button>' +
        '' + text + '</div>';

    if ($('.alert-panel').length <= 0) {
        $('body').append('<div class="alert-panel"></div>');
    }
    $('.alert-panel').append(html);
}
//关闭提示框
function removeAlert(obj) {
    $(obj).parents('.alert').remove();
}


setInterval(function () {
    var alert = $('.alert');
    if (alert.length > 0) {
        alert.eq(0).remove();
    }

}, 10000);

