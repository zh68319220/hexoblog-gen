$(function(){
    // prop extend func
    $.fn.extend({
        showLoginModal: function() {
            $.fancybox(this.html(), {
                padding: 5,
                scrolling: 'visible',
                modal: false,
                fitToView: true,
                width: 450,
                height: 300,
                autoSize: false,
                showCloseButton: true,
                afterShow: function () {
                    QC.Login({
                       btnId:"qqLoginBtn"    //插入按钮的节点id
                    });
                    $("#login").on("click", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    });
                }
            });
        }
    });
    // class extend func
    $.extend({
        activePlaceHolder: function () {
            // placeholder
            $("input").live("click", function (e) {
                $( "#" + $(this).attr("name") + "-span" ).hide();
            });
            $("input").live("blur", function (e) {
                $( "#" + $(this).attr("name") + "-span" ).show();
            });
            $(".placeholder").live("click", function (e) {
                $( "#" + $(this).attr("id").split('-span')[0] ).focus();
                $(this).hide();
            });
        }
    });

    // base actions
    $.activePlaceHolder();
    $("#login-btn").bind("click", function (e) {
        e.preventDefault();
        $("#login-page").showLoginModal();
    });
    $("#login-btn2").bind("click", function (e) {
        e.preventDefault();
        $("#login-page").showLoginModal();
    });
    $("#menu-btn").bind("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#menu-mob").show();
    });
    $("body").bind("touchstart", function (e) {
        $("#menu-mob").hide();
    });
});