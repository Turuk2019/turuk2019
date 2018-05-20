var block = document.getElementById('offer-block');
if (!block) {
    block = document.createElement('div');
    block.className = 'offer-block-wrap';
    document.getElementsByTagName('body')[0].append(block);
}

block.innerHTML = '<a id="offer-block-link" href="http://cctls.ru/" target="_blank">Публичная оферта</a>';

var styles = document.createElement('link');
styles.rel = 'stylesheet';
styles.href = 'http://cctls.ru/offer.css';
styles.type = 'text/css';
document.getElementsByTagName('head')[0].append(styles);

document.getElementById('offer-block-link').onclick = function() {
    var offerPopup = document.getElementById('offer-popup');
    if (!offerPopup) {
        offerPopup = document.createElement('div');
        offerPopup.id = 'offer-popup';
        offerPopup.innerHTML = '<iframe src="http://cctls.ru/"></iframe>' +
            '<div class="buttons-panel"><button id="offer-popup-close">Закрыть</button></div>';
        document.getElementsByTagName('body')[0].append(offerPopup);
        document.getElementById('offer-popup-close').addEventListener('click', function() {
            offerPopup.style.display = 'none';
        });
    }
    offerPopup.style.display = 'block';
    return false;
};