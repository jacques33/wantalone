/**
 * Created by jacques on 16/9/9.
 */
// 判断用户是否登录
if(getSignStatus()){
    wilddog.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("has login in");
            jacques.data.user = user;

            $(document).ready(function () {
                var main = $('#main-panel>.row');

                //填充用户信息
                fillAuthInfo();

                //获取文章列表模块
                jacques.getPage('ArticleList',main,{
                    fail:function () {
                        main.html('<a onclick="addArticleList()">加载文章列表失败,请检查网络,并点击这里重试……</a>');
                    }
                });
                var ch = $(window).height();
                $('#main-panel').css('height',ch+'px');

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

                        //更新用户数据
                        var update = {
                            "name": ename.val(),
                            "intro": eintro.val()
                        };
                        updateUserData(update,{
                            succ: function () {
                                $('.edit-info').addClass('hide');
                                $('.auth-name-intro').removeClass('hide');
                            },
                            fail:function () {
                                alert('更改失败,请检查网络后重试','warning')
                            }
                        });
                    }
                })
            });
        }
    });
}else{
    window.location.href = 'login.html';
}

//填充用户信息
function fillAuthInfo() {
    var id = jacques.data.user.uid;
    var name = $('.auth-name');
    var intro = $('.auth-intro');
    var ename = $('.js-edit-name');
    var eintro = $('.js-edit-intro');
    var artNum = $('.article-num');
    var fontNum = $('.font-num');

    var userinfo = wilddog.sync().ref('user');

    userinfo.on("child_added", function(snapshot) {
        if(snapshot.val().id == id){
            var key = snapshot.key();
            var data = snapshot.val();
            jacques.data.userData = data;
            var n = data.name || jacques.data.user.displayName;
            var i = data.intro;
            var an = data.artnum;
            var fn = data.fontnum;
            name.html(n);
            intro.html(i);
            ename.val(n);
            eintro.val(i);
            artNum.html(an);
            fontNum.html(fn);

            author.data = data;
            author.key = key;
        }
    })
}
//更新用户资料
function updateUserData(data,cb) {
    var currUserRef = wilddog.sync().ref('user').child(author.key);
    currUserRef.update(data,function(error) {
        if (error == null){
            cb.succ && cb.succ();
            console.log('更新用户资料成功');

        }else{
            cb.fail && cb.fail();
        }
    })
}

