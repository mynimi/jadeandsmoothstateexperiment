/* global $:false, document:false, window:false */

(function ($) {
    $.fn.myfunction = function () {
        var offCanvasToggle = 'toggle-link-off-canvas',
            mainToggle = 'toggle-link',
            close = 'toggle-link-close';

        $('.video .content, .content_wrap').each(function () {
            var src = $(this).children('img').attr('src');
            $(this).css('background-image', 'url(' + src + ')')
        });
        
        $('body').css('margin-top', $('.main-menu').outerHeight() + 'px');

        // add toggle links 
        $('header').prepend('<span class="toggle ' + mainToggle + '">Menu</span>');
        $('.menu-container').prepend('<span class="toggle ' + mainToggle + ' ' + close + '">close</span>');
        $('.off-canvas-menu').prepend('<span class="toggle ' + offCanvasToggle + ' ' + close + '">close</span>');
        $('.main-menu ul.first').prepend('<li><span class="toggle ' + offCanvasToggle + '">Menu Off-Canvas</span></li>');

        // click functions for toggle links to toggle active classes on off-canvas
        $('header .toggle-link').click(function () {
            $('.menu-container').toggleClass('active');
        });

        $('header .toggle-link-off-canvas').click(function () {
            $('.off-canvas-menu').toggleClass('active');
        });

        // add Element for caret to toggle sub-menus
        $('.menu-item-has-children > a').wrap('<span class="parent"></span>');
        $('.menu-container .parent').append('<span class="submenu-opener">open submenu</span>');

        // toggling submenus
        $('.menu-container .submenu-opener').click(function () {
            $(this).toggleClass('sub-menu-is-open');
            $(this).parent().next('.sub-menu').slideToggle();
        });
        
        $(window).resize(function () {
            var vidWidth = $('.video .content').width(),
                size = vidWidth * 2 + 20 + 'px',
                w = $('.vids').outerWidth();
            
            $('.content_wrap').css({
                'width': size,
                'height': size
            });
            
            $('.vids').css('height', w);
            
        }).resize();
        

        var toggle = $('a[data-toggle-overlay=' + $('.overlay').attr('id') + ']');
        toggle.css('color', 'green');
        
        toggle.replaceWith(function () {
            return $("<span class='toggle' data-toggle-overlay=" + $('.overlay').attr('id') + ">" + $(this).html() + "</span>");
        });

        $('.toggle').click(function () {
            $('.overlay').toggleClass('open');
            if ($('.overlay').hasClass('open') == true) {
                $('.vids').css('filter', 'blur(20px)');
            } else {
                $('.vids').css('filter', 'blur(0px)');
            }
        });

        if ($('.overlay').hasClass('open') == true) {
            $('.vids').css('filter', 'blur(20px)');
        } else {
            $('.vids').css('filter', 'blur(0px)');
        }
    };
})(jQuery);


$(document).ready(function () {
    $('header').myfunction();
});