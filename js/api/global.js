/**
 * Created by jacques on 16/9/5.
 */
var config = {
    authDomain: "editor.wilddog.com",
    syncURL: "https://editor.wilddogio.com"
};
wilddog.initializeApp(config, "DEFAULT");

//验证邮箱
function checkEmail(mail) {
    var msg = '';
    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!pattern.test(mail)) {
        msg = "请输入正确的邮箱地址";
        return msg;
    }
    return true;
}
//验证密码
function checkPsd(psd) {
    var msg = '';
    if(psd == ''){
        msg = '密码不能为空';
        return msg;
    }
    if(psd.length < 6 || psd.length >32){
        msg = '密码不能小于6位,且不能大于32位';
        return msg;
    }
    return true;
}