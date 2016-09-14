/**
 * Created by jacques on 2016/9/14.
 */
var jacques = {
    getPage:function (url,parent, cb) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: "html",
            success: function (result) {
                parent.append(result);
                cb.succ && cb.succ(result);
            },
            error: function () {
                alert('加载失败，请检查网络后重试','warning');
                cb.fail() && cb.fail();
            }

        })
    }  
};
