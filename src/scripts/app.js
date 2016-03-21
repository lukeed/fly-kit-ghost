import {isOk, onSuccess, onError} from './sw';

// Run the service worker if we determine it's safe to
// Note: this will Error during development because
// 'service-worker.js' only exists after production builds.
if (isOk) {
	navigator.serviceWorker.register('service-worker.js').then(onSuccess).catch(onError);
}

/**
 * Main JS file for Casper behaviours
 */
$(document).ready(function () {
	$('.post-content').fitVids();
	$('.scroll-down').arcticScroll();
	$('.menu-button, .nav-cover, .nav-close').on('click', function (e) {
		e.preventDefault();
		$('body').toggleClass('nav-opened nav-closed');
	});
});

// Arctic Scroll by Paul Adam Davis
// https://github.com/PaulAdamDavis/Arctic-Scroll
$.fn.arcticScroll = function (options) {
	options = $.extend({
		elem: $(this),
		speed: 500
	}, options);

	options.elem.click(function (event) {
		event.preventDefault();
		var $this = $(this);
		var $htmlBody = $('html, body');
		var offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false;
		var position = ($this.attr('data-position')) ? $this.attr('data-position') : false;
		var toMove;

		if (offset) {
			toMove = parseInt(offset, 10);
			$htmlBody.stop(true, false).animate({
				scrollTop: ($(this.hash).offset().top + toMove)
			}, options.speed);
		} else if (position) {
			toMove = parseInt(position, 10);
			$htmlBody.stop(true, false).animate({
				scrollTop: toMove
			}, options.speed);
		} else {
			$htmlBody.stop(true, false).animate({
				scrollTop: ($(this.hash).offset().top)
			}, options.speed);
		}
	});
};
