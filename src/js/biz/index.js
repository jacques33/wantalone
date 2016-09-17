/**
 * Created by jacques on 16/9/9.
 */
// 判断用户是否登录
if(getSignStatus()){
    wilddog.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("has login in");

            $(document).ready(function () {
                fillAuthInfo(user);

                var ch = $(window).height();
                $('#main-panel').css('height',ch+'px');

                //新增文章
                $('.js-new').click(function () {
                    var main = $('#main-panel>.row');
                    var fronthtml = main.html();
                    main.html('');
                    //获取编辑模块
                    jacques.getPage('modules/EditPanel/main.html',main,{
                        fail:function () {
                            //还原到之前的状态
                            main.html(fronthtml);
                        }
                    });
                });

                //编辑个人信息
                $('.js-edit-info').click(function () {
                    $('.auth-name-intro').addClass('hide');
                    $('.edit-info').removeClass('hide');
                    $('.js-edit-name').focus();
                });
                //保存个人信息编辑
                $('.js-submit-edit').click(function () {
                    var name = $('.auth-name');
                    var intro = $('.auth-intro');
                    var ename = $('.js-edit-name');
                    var eintro = $('.js-edit-intro');
                    var nameLen = ename.val().length;
                    var introLen = eintro.val().length;
                    if( nameLen > 0 && nameLen < 20 && introLen > 0){
                        name.html(ename.val());
                        intro.html(eintro.val());
                        $('.edit-info').addClass('hide');
                        $('.auth-name-intro').removeClass('hide');
                    }
                    updateUserNameIntro(ename.val(),eintro.val());
                })
            });
        }
    });
}else{
    window.location.href = 'login.html';
}

var key = '';
//填充用户信息
function fillAuthInfo(user) {
    var id = user.uid;
    var name = $('.auth-name');
    var intro = $('.auth-intro');
    var ename = $('.js-edit-name');
    var eintro = $('.js-edit-intro');

    var userinfo = wilddog.sync().ref('user');

    userinfo.on("child_added", function(snapshot) {
        if(snapshot.val().id == id){
            key = snapshot.key();
            var n = snapshot.val().name || user.displayName;
            var i = snapshot.val().intro;
            name.html(n);
            intro.html(i);
            ename.val(n);
            eintro.val(i);
            
            author.data = snapshot.val();
            author.key = key;
        }
    })
}
//更新用户资料
function updateUserNameIntro(name, intro) {
    var currUserRef = wilddog.sync().ref('user').child(key);
    currUserRef.update({
        "name": name,
        "intro": intro
    }).then(function () {
        console.log('更新用户资料成功');
    })
}

