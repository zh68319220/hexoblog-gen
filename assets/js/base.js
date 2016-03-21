$(function(){
    // base
    $.fn.extend({
        showModal: function() {
            $.fancybox(this.html(), {
                padding: 5,
                scrolling: 'visible',
                modal: true,
                fitToView: true,
                width: 610,
                height: 300,
                autoSize: false,
                afterShow: function () {
                    QC.Login({
                       btnId:"qqLoginBtn"    //插入按钮的节点id
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
        $("#login-page").showModal();
    });

});