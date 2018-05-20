


    
	


function addDeliveryPopup() {
	var mainNow = 0;
	var geolocation = ymaps.geolocation,
    cityName = geolocation.city;
    this.generateHTML = function (city) {
		$('.city_this').text(city);
        return (
        '<div class="delivery-notify" style="font-family: Arial; z-index: 991000;background: #363636;padding:20px;padding-top: 17px;width:270px;height:80px;position:fixed;bottom:10px;left:0px;box-sizing: border-box;color: white;  font-size: 14px;line-height: 1.4;border-top-right-radius: 3px;border-bottom-right-radius: 3px;width: 270px;">' +
        '<div class="close-delivery-notify" style="width:24px;height:1em;cursor: pointer;position:absolute;right:0;top:0;font-size: 24px;line-height: 1;text-align: center;">&times;</div>' +
        '<div class="notify-text" style="color: white !important;">Действует быстрая доставка в г.' + city + '</div>' +
        '</div>'
        );
    };
    this.bindEvents = function () {
        $('.close-delivery-notify').on('click', function () {
            $('.delivery-notify').remove();
        });
        $(document).on('wheel', function () {
            if ($(document).scrollTop() + $(window).height() == $(document).height()) {
                if ($('.delivery-notify').length) {
                    $('.delivery-notify').remove();
                }
            }
        });
    };
    this.getShowAction = function () {
        var self = this;
        return function () {
            var html = self.generateHTML(cityName);
            /*$(html).appendTo($(document.body));*/
            self.bindEvents();
        };
    };

    setTimeout(this.getShowAction(), 1000);
}
function addCityToComment() {
    var names = $('.vk-comment-name');
    for (var i = 0; i < names.length; i++) {
        var item = $(names[i]);
        if (getRandomInt(0, 1)) {
            var newText = item.text() + ' г.' + cityName;
            item.text(newText);
        } else {
            var newText = item.text() + ' г.' + cityList[getRandomInt(0, 1306)];
            item.text(newText);
        }
    }
}
