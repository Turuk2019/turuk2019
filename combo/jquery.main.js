/* script by ProVerstka */
$(document).ready(function(){
	/* инициализация функций */
	initFlexImageCarousel();
	initPopups();
	/* описание функций */
	$('.main_carousel_holder').slick({
		fade: true,
		dots: true,
	});
	$('.gallery_carousel').slick({
		slidesToShow: 5,
		rows: 2,
		arrows: false,
		responsive: [{
			breakpoint: 1000,
				settings: {
					slidesToShow: 3
				}
			},{
			breakpoint: 700,
				settings: {
					slidesToShow: 2
				}
			},{
			breakpoint: 500,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	$('.gallery_carousel a, .video_popup').fancybox({
		padding : '0',
	});
	$('.video_popup, .mini_fixed_pop a.visual').fancybox({
		padding : '0',
		'type' : 'iframe',
	});
	$('.reviews_carousel').slick({
		slidesToShow: 1,
	});
	$('.mini_fixed_pop .mini_close').click(function(){
		$('.mini_fixed_pop').addClass('close');
	});
	$('.burger_menu').on('click', function(e) {
        e.preventDefault();
        $('.burger_menu').toggleClass('open');
        $('nav').toggleClass('active');
        if (!$('nav').hasClass('active')) {
            $('nav>ul').slideUp(300);
        } else {
            $('nav>ul').slideDown(300);
        }
    });
    $(window).resize(function() {
        $('nav>ul>li').removeClass('active');
        $('.burger_menu').removeClass('open');
        $('nav').removeClass('active');
        $('nav ul').removeAttr('style');
    });
    $('a.anchor').click(function() {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top - $('.gen_nav_holder').outerHeight();
		$('html,body').animate({
			scrollTop: destination
		}, 800);
		return false;
	});
	$(window).scroll(function(){
		if($(window).scrollTop() > $('.master_section').offset().top){
			var height_nav = $('.gen_nav_holder').outerHeight();
			$('.gen_nav_wrapper').css({'height' : height_nav});
			$('.gen_nav_holder').addClass('active');
		}else{
			$('.gen_nav_wrapper').removeAttr('style');
			$('.gen_nav_holder').removeClass('active');
		}

		if($(window).scrollTop() > $('.characteristics_section').offset().top){
			$('.mini_fixed_pop').addClass('open');
		}	
	});
});

/* подключение плагинов */
function initFlexImageCarousel() {
	$('.gallery_carousel_visual img').each(function() {
		$(this).closest('.gallery_carousel_visual').css({
			'background': 'url(' + $(this).attr('src') + ') no-repeat 50% 50%',
			'background-size': 'cover',
			'background-position': 'top'
		})
	});
};
function initPopups() {
	$('body')
		.popup({
			"opener": ".top_order, .order_btn",
			"popup_holder": "#popup1",
			"popup": ".popup",
			"close_btn": ".close_popup"
		})
		.popup({
			"opener": ".call_back_btn",
			"popup_holder": "#popup2",
			"popup": ".popup",
			"close_btn": ".close_popup"
		})
		.popup({
			"opener": ".info_btn_1",
			"popup_holder": "#popup3",
			"popup": ".popup",
			"close_btn": ".close_popup"
		})
		.popup({
			"opener": ".info_btn_2",
			"popup_holder": "#popup4",
			"popup": ".popup",
			"close_btn": ".close_popup"
		})
		.popup({
			"opener": ".guarantee",
			"popup_holder": "#popup5",
			"popup": ".popup",
			"close_btn": ".close_popup"
		})

};

$.fn.popup = function(o) {
	var o = $.extend({
		"opener": ".call-back a",
		"popup_holder": "#call-popup",
		"popup": ".popup",
		"close_btn": ".btn-close",
		"close": function() {},
		"beforeOpen": function(popup) {
			$(popup).css({
				'left': 0,
				'top': 0
			}).hide();
		}
	}, o);
	return this.each(function() {
		var container = $(this),
			opener = $(o.opener, container),
			popup_holder = $(o.popup_holder, container),
			popup = $(o.popup, popup_holder),
			close = $(o.close_btn, popup),
			bg = $('.bg', popup_holder);
		popup.css('margin', 0);
		opener.click(function(e) {
			o.beforeOpen.apply(this, [popup_holder]);
			popup_holder.css('left', 0);
			popup_holder.fadeIn(400);
			alignPopup();
			bgResize();
			e.preventDefault();
		});

		function alignPopup() {
			var deviceAgent = navigator.userAgent.toLowerCase();
			var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/i);
			if (agentID) {
				if (popup.outerHeight() > window.innerHeight) {
					popup.css({
						'top': $(window).scrollTop(),
						'left': ((window.innerWidth - popup.outerWidth()) / 2) + $(window).scrollLeft()
					});
					return false;
				}
				popup.css({
					'top': ((window.innerHeight - popup.outerHeight()) / 2) + $(window).scrollTop(),
					'left': ((window.innerWidth - popup.outerWidth()) / 2) + $(window).scrollLeft()
				});
			} else {
				if (popup.outerHeight() > $(window).outerHeight()) {
					popup.css({
						'top': $(window).scrollTop(),
						'left': (($(window).width() - popup.outerWidth()) / 2) + $(window).scrollLeft()
					});
					return false;
				}
				popup.css({
					'top': (($(window).height() - popup.outerHeight()) / 2) + $(window).scrollTop(),
					'left': (($(window).width() - popup.outerWidth()) / 2) + $(window).scrollLeft()
				});
			}
		}

		function bgResize() {
			var _w = $(window).width(),
				_h = $(document).height();
			bg.css({
				"height": _h,
				"width": _w + $(window).scrollLeft()
			});
		}
		$(window).resize(function() {
			if (popup_holder.is(":visible")) {
				bgResize();
				alignPopup();
			}
		});
		if (popup_holder.is(":visible")) {
			bgResize();
			alignPopup();
		}
		close.add(bg).click(function(e) {
			var closeEl = this;
			popup_holder.fadeOut(400, function() {
				o.close.apply(closeEl, [popup_holder]);
			});
			e.preventDefault();
		});
		$('body').keydown(function(e) {
			if (e.keyCode == '27') {
				popup_holder.fadeOut(400);
			}
		})
	});
};