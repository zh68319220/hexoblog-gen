$(function(){
    // base
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
                    $("input").on("click", function (e) {
                        $( "#" + $(this).attr("name") + "-span" ).hide();
                    });
                    $("input").on("blur", function (e) {
                        $( "#" + $(this).attr("name") + "-span" ).show();
                    });
                    $(".placeholder").on("click", function (e) {
                        $( "#" + $(this).attr("id").split('-span')[0] ).focus();
                        $(this).hide();
                    });
                    $("#login").on("submit", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                    });
                }
            });
        }
    });

    // current operations

    // placeholder
    $("input").on("click", function (e) {
        $( "#" + $(this).attr("name") + "-span" ).hide();
    });
    $("input").on("blur", function (e) {
        $( "#" + $(this).attr("name") + "-span" ).show();
    });
    $(".placeholder").on("click", function (e) {
        $( "#" + $(this).attr("id").split('-span')[0] ).focus();
        $(this).hide();
    });

    // show login modal
    $("#login-btn").on("click", function (e) {
        e.preventDefault();
        $("#login-page").showLoginModal();
    });

});