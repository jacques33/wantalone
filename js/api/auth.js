/**
 * Created by jacques on 16/9/5.
 */


// 用户注册
function authSignUp(email, psd, cb) {
    wilddog.auth().createUserWithEmailAndPassword(email, psd)
        .then(function (user) {
            //成功
            cb.succ && cb.succ(user);

        }, function (error) {
            //失败
            cb.fail && cb.fail(error);
            console.log(error)
        }   );
}

//发送注册邮件验证
function confirmEmail(cb) {
    wilddog.auth().currentUser.sendEmailVerification()
        .then(function (res) {
            cb.succ && cb.succ();
            console.log(res);
        }, function (error) {
            cb.fail && cb.fail(error);
        });
}
//用户登陆
function authSignIn(email, psd, cb) {
    wilddog.auth().signInWithEmailAndPassword(email, psd).then(function (res) {

        cb.succ && cb.succ(res);
    }).catch(function (error) {

        cb.fail && cb.fail(error);
    });
}
//是否登录
function isSignIn() {
    var flag;
    wilddog.auth().onAuthStateChanged(function (user) {
        if (user) {
            flag = true;
        } else {
            flag = false;
            console.log("no user");
        }
        return flag;
    });
}
//是否登录，上一个方法总是先返回false，因此不用做页面刷新时的判断
function getSignStatus() {
    var isSign = localStorage.getItem('wilddog:session::editor:DEFAULT') || false;
    if (isSign) {
        isSign = JSON.parse(isSign).signIn
    }
    return isSign
}

//返回当前用户资料
function currentUser() {
    wilddog.auth().onAuthStateChanged(function (user) {
        if (user) {
            var name = user.displayName;
            user.name = name;
            console.log(user);
            return user;
        } else {
            console.log("no user");
            return false;
        }
    });
}
function isEmailVerified() {
    var user = wilddog.auth().currentUser;
    if (user != null) {
        return user.emailVerified;
    }
    return false;
}
//更新用户资料
function updateUserInfo(name, photoUrl, cb) {
    wilddog.auth().currentUser.updateProfile({
        displayName: name,
        photoURL: photoUrl
    }).then(function (json) {

        cb.succ && cb.succ(json);
    }, function (error) {

        cb.fail && cb.fail(error);
    });

}
//退出登录
function signOut(cb) {
    wilddog.auth().signOut().then(function () {

        cb.succ && cb.succ();
        console.log("退出登录")
    }, function (error) {

        cb.fail && cb.fail(error);
        console.log("退出登录失败")

    });
}
//重设密码邮件发送
function resetPsdMail(email, cb) {
    wilddog.auth().sendPasswordResetEmail(email).then(function () {
        cb.succ && cb.succ();
    }, function (error) {

        cb.fail && cb.fail(error);
        console.log(error)
    });
}