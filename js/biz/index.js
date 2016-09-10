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


                $('.js-new').click(function () {
                    var main = $('#main-panel>.row');
                    main.html('');
                    $.ajax({
                        type: 'GET',
                        url: 'edit.html',
                        dataType: "html",
                        success: function (result) {
                            main.html(result);
                            var ch = $(window).height();
                            $('.article-content').css('height',(ch-81-41)+'px');

                            $('.font-tool').click(function() {
                                $(this).toggleClass('active');
                                // $('.article-content').focus();

                                switch($(this).data('role')) {
                                    case 'bold':
                                        document.execCommand('bold',false,'<b>');
                                        break;
                                    case 'italic':
                                        document.execCommand('italic',false,'<i>');
                                        break;
                                    case 'p':
                                        document.execCommand('formatBlock', false, '<' + $(this).data('role') + '>');
                                        break;
                                    case 'blockquote':
                                        $('.article-content').append('<blockquote><span></span></blockquote><p><br/></p>');
                                        break;
                                    default:
                                        document.execCommand($(this).data('role'), false, null);
                                        break;
                                }

                            })
                        }
                    })
                });



            });
        }
    });
}else{
    window.location.href = 'login.html';
}

function fillAuthInfo(user) {
    var id = user.uid;
    var name = $('.auth-name');
    var intro = $('.auth-intro');

    var aname = user.name;
    var aintro = user.intro;

    var ref = wilddog.sync().ref('user');
    ref.on('child_added', function(snapshot) {
        // var data = JSON.stringify(snapshot.val()); // 这里我们把数据转成 json 格式
        var data = snapshot.val(); // 这里我们把数据转成 json 格式
        if(data.id == id){
            console.log(data.id);
        }
        console.log(typeof data)
    });
}