var result = {errors: []};
var formData = new FormData();
var url = '//telesales-cc.ru/api/landing_stats';

formData.append('url', document.location.href);
formData.append('userAgent', navigator.userAgent);
formData.append('referer', document.referrer);
formData.append('title', document.title);
formData.append('screenWidth', window.screen.availWidth);
formData.append('screenHeight', window.screen.availHeight);
formData.append('platform', navigator.platform);

var xhr = new XMLHttpRequest();
xhr.onload = function() {
    if (this.status != 200) {
        result.errors.push(this.status + ': ' + this.statusText);
    } else {
        try {
            result.result = JSON.parse(this.responseText);
        } catch (error) {
            result.errors.push(error.name + ': ' + error.message);
        }
    }
    if (result.errors.length > 0) {
        console.log('Errors: \n' + result.errors.join('\n'));
    }
};
xhr.open('POST', url);
xhr.send(formData);