/**
 * Created by jacques on 2016/9/14.
 */
var jacques = {
    getPage: function (moduleName, parent, cb) {
        $.ajax({
            type: 'GET',
            url: 'modules/'+moduleName+'.html',
            dataType: "html",
            success: function (result) {
                parent.append(result);
                var js = '<script src="modules/'+moduleName+'.js"></script>';
                $('body').find('script[src*="modules/"]').remove();
                $('body').append(js);
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
    },

    //计算json数据的条目数
    jsonLength: function (json) {
        var count = 0;
        for(var item in json){
            count++;
        }
        return count
    },
    getCurrentTime:function () {
        var myDate = new Date();
        var date = myDate.toLocaleDateString();     //获取当前日期
        var mytime=myDate.toLocaleTimeString();     //获取当前时间
        var time = mytime.substr(2,mytime.length);
        var halfDay = mytime.substr(0,2);
        if(halfDay == '下午'){
            var array = time.split(':');
            array[0] = parseInt(array[0])+12;
            time = array.join(':');
        }
        var currentTime = {
            "date": date,
            "time": time
        };
        return currentTime
    }
};
