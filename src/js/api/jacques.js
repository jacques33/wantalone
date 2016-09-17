/**
 * Created by jacques on 2016/9/14.
 */
var jacques = {
    getPage: function (url, parent, cb) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: "html",
            success: function (result) {
                parent.append(result);
                cb.succ && cb.succ(result);
            },
            error: function () {
                alert('加载失败，请检查网络后重试', 'warning');
                cb.fail() && cb.fail();
            }

        })
    },
    //验证邮箱
    checkEmail: function (mail) {
        var msg = '';
        var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (!pattern.test(mail)) {
            msg = "请输入正确的邮箱地址";
            return msg;
        }
        return true;
    },
    //验证密码
    checkPsd: function (psd) {
        var msg = '';
        if (psd == '') {
            msg = '密码不能为空';
            return msg;
        }
        if (psd.length < 6 || psd.length > 32) {
            msg = '密码不能小于6位,且不能大于32位';
            return msg;
        }
        return true;
    }
};
