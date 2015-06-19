//Ultima HTML5 Landing Page v2.1
//Copyright 2014 8Guild.com
//All scripts for Ultima Landing Page version #2

/*Page Preloading*/
$(window).load(function() {
	$('#spinner').fadeOut();
	$('#preloader').delay(300).fadeOut('slow');
//	setTimeout(function(){$('.first-slide div:first-child').addClass('fadeInDown');},100);
//	setTimeout(function(){$('.first-slide div:last-child').addClass('fadeInRight');},100);
	setTimeout(function(){$('.color-switcher').addClass('slideInLeft');},100);
});

/*Document Ready*/
$(document).ready(function(e) {
	
	$('.navi-toggle').click(function() {
		$(this).parent().find('.dropdown').removeClass('expanded');
	})
	$('.main-navi .has-dropdown a').click(function(){
		$(this).parent().find('.dropdown').toggleClass('expanded');
	});

});/*/Document ready*/


