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

                }
            });
        }
    });

    // current operations
    $("#login-btn").on("click", function (e) {
        e.preventDefault();
        $("#login-page").showModal();
    });

});