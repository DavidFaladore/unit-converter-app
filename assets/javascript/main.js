var $ = require('jQuery')

feather.replace()

$('.tabbar ul li a').on('click', function (e) {
    e.preventDefault();
    $('.tabbar ul li a').removeClass("active pressed");
    $(this).addClass('active pressed');
});