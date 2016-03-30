/**
 * Created by yufengzhang210851 on 2016/3/30.
 * js for main.html
 */
$(function () {
    var unslider = $(".slide").unslider({dots: true, infinite: true, delay: 6666,height: 300});
    $('.unslider-arrow').click(function() {
        var fn = this.className.split(' ')[1];
        unslider.data('unslider')[fn]();
    });
    $("#cates").setHighlight("cate-highlight");
});