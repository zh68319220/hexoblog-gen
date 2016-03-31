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
                height: 500,
                autoSize: false,
                showCloseButton: true,
                afterShow: function () {
                    QC.Login({
                       btnId:"qqLoginBtn" //插入按钮的节点id
                    });
                    $.activePlaceHolder();
                    $("#login-from").on('submit', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var pass = true;
                        if(!$("#password").validatePsw("error-psw", "密码格式不正确")) pass = false;
                        if(!$("#username").validateUsername("error-username", "用户名格式不正确")) pass = false;
                        if(pass){
                            $.ajax({
                                url: '/loginAJ',
                                type: 'POST',
                                data: {'username': $("#username").val(), 'password': $("#password").val()},
                                success: function(data){
                                    if(data.status){
                                        location.reload();
                                    }
                                    else{
                                        $("#error-username").text("用户名或密码不正确!");
                                        $("#error-username").show();
                                    }
                                }
                            });
                        }
                        return false;
                    });
                }
            });
        },
        setHighlight: function (className) {
            $("#"+this.attr("id")+" li [name="+this.attr('data-hl')+"]").addClass(className);
        },
        validatePsw: function (selector, info){
            $("#" + selector).hide();
            if( $(this).val().length >= 8 && /^[a-z0-9]*$/g.test($(this).val()) )
                return true;
            else {
                $("#" + selector).text(info);
                $("#" + selector).show();
                return false;
            }
        },
        validateUsername: function (selector, info){
            $("#" + selector).hide();
            if( $(this).val().length >= 6 && /^[a-z0-9]*$/g.test($(this).val()) )
                return true;
            else {
                $("#" + selector).text(info);
                $("#" + selector).show();
                return false;
            }
        }
    });
    // class extend func
    $.extend({
        activePlaceHolder: function () {
            // placeholder
            $("input").on("click", function (e) {
                $( "#" + $(this).attr("name") + "-span" ).hide();
            });
            $("input").on("blur", function (e) {
                if( $(this).val() == ""){$( "#" + $(this).attr("name") + "-span" ).show();}
            });
            $("input").on("focus", function (e) {
                $( "#" + $(this).attr("name") + "-span" ).hide();
            });
            $(".placeholder").on("click", function (e) {
                $( "#" + $(this).attr("id").split('-span')[0] ).focus();
                $(this).hide();
            });
        }
    });

    // base actions
    $("#login-btn").on("click", function (e) {
        e.preventDefault();
        $("#login-page").showLoginModal();
    });
    $("#login-btn2").on("click", function (e) {
        e.preventDefault();
        $("#login-page").showLoginModal();
    });
    $("#menu-btn").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#menu-mob").show();
    });
    $("body").on("touchstart", function (e) {
        $("#menu-mob").hide();
    });
    $("#menu").setHighlight("menu-highlight");
});