/**
 * Created by yufengzhang210851 on 2016/3/30.
 * js for login/sys.html
 */
$(function () {
    $.activePlaceHolder();
    $("body").on("click","#btn-blog", function (e) {
        $.ajax({
            url: '/sys/addblog',
            type: 'POST',
            data: { html: $("#editor").html() },
            beforeSend: function(xhr){

            },
            success: function (data) {

            }
        });
    });
});