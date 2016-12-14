/**
 * Created by jacques on 16/9/6.
 */

//弹出提示框
function alert(text, type, time) {
    //拼接dom
    var html = '<div class="alert alert-dismissable alert-' + type + '" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" onclick="removeAlert(this)">×</button>' +
        '' + text + '</div>';

    if ($('.alert-panel').length <= 0) {
        $('body').append('<div class="alert-panel"></div>');
    }
    $('.alert-panel').append(html);
    
    if(time){
        setTimeout(function () {
            $('.alert').eq(0).remove();
        },time);
        
    }
}
//关闭提示框
function removeAlert(obj) {
    $(obj).parents('.alert').remove();
}

var alertDoms = $('.alert');
if (alertDoms.length > 0) {
    setInterval(function () {
        alertDoms.eq(0).remove();
    }, 6000);
}


