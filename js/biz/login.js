/**
 * Created by jacques on 16/9/5.
 */

$(document).ready(function () {
    var href = window.location.href;
    //
    if (href.indexOf('confirm') > 0) {
        $('#confirmModal').modal('show');
    }

    $('.js-sign').click(function () {
        if (!$(this).hasClass('active')) {
            var n = $(this).index('.js-sign');
            //清空表单
            clearForm();
            if (n == 1) {
                $('.js-name,.js-psd1').removeClass('hide');
            } else {
                $('.js-name,.js-psd1').addClass('hide');
            }
            $(this).addClass('active').siblings().removeClass('active')
        }
    });

    $('.js-login').click(function (e) {
        //阻止form表单的默认提交操作
        e.preventDefault();
        var email = $('.js-email').val();
        var name = $('.js-name').val();
        var psd = $('.js-psd').val();
        var psd1 = $('.js-psd1').val();

        var n = $('.form-signin').find('.active').index('.js-sign');
        if (n == 0) {
            //登录验证
            if (checkEmail(email) == true) {
                if (checkPsd(psd) == true) {
                    //发送请求
                    authSignIn(email, psd, {
                        succ: function (res) {
                            console.log(res);
                            window.location.href = 'index.html';
                        },
                        fail: function (msg) {
                            console.log(msg);
                            alert("邮箱或密码不正确,请重新输入", "warning")
                        }
                    });
                } else {
                    //密码格式不正确
                    var msg = checkPsd(psd);
                    alert(msg, "warning");
                }
            } else {
                //邮箱地址不正确
                var msg = checkEmail(email);
                alert(msg, "warning");
            }

        } else if (n == 1) {
            //注册
            if (checkEmail(email) == true) {
                if (checkPsd(psd) == true) {
                    if (psd == psd1) {
                        authSignUp(email, psd, {
                            succ: function (res) {
                                console.log(res);
                                //用户名上传
                                updateUserInfo(name, '', {
                                    succ: function (json) {
                                        console.log(json)
                                    }
                                });
                                createUserData(res);
                                //发送验证邮件
                                confirmEmail({
                                    succ: function () {
                                        alert("验证邮件已发送,请到邮箱查收", "success");
                                        setTimeout(function () {
                                            var href = window.location.href;
                                            location.href = href + '?confirm=true'
                                        }, 3000);
                                    },
                                    fail: function () {
                                        alert("邮件发送不成功,请重试", "warning")
                                    }
                                })
                            },
                            fail: function () {
                                alert("邮箱已注册,请直接登录", "warning");
                            }
                        });
                    } else {
                        alert("两次输入的密码不一致,请重新输入","warning")
                    }
                } else {
                    //密码格式不正确
                    var msg = checkPsd(psd);
                    alert(msg, "warning");
                }
            } else {
                //邮箱地址不正确
                var msg = checkEmail(email);
                alert(msg, "warning");
            }

        } else {
            return false
        }

    });
    //验证邮箱
    $('.js-confirm-mail').click(function () {
        if (isEmailVerified()) {
            $(this).text('恭喜,验证成功');
            setTimeout(function () {
                $('#confirmModal').modal('hide');
                location.href = 'index.html'
            },2000);
        } else {

        }
    });
    
});
//清空表单
function clearForm() {
    $('.js-email').val('');
    $('.js-name').val('');
    $('.js-psd').val('');
    $('.js-psd1').val('');
}

//创建一条用户数据
function createUserData(user) {
    var id = user.uid;
    ref.child("user").push({
        id:id,
        name: user.displayName,
        email:user.email

    }, function(error) {
        if (error == null){
            // 数据同步到野狗云端成功完成
            console.log('创建用户数据成功')
        }
    });
}