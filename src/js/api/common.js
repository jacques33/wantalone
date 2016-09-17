/**
 * Created by jacques on 16/9/8.
 */
//野狗api初始化
var config = {
    authDomain: "editor.wilddog.com",
    syncURL: "https://editor.wilddogio.com"
};
wilddog.initializeApp(config, "DEFAULT");

var ref = wilddog.sync().ref();


$(document).ready(function () {
    var dh = $('body').height();
    var ch = $(window).height();
    // if(dh <= ch){
    //     $("#footer").css({
    //         "position":"fixed",
    //         "bottom":'0'
    //     })
    // }

});

