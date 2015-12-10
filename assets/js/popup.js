/**
 *	Popup screen to be used in chrome extension
 *	Written by Kevin
 *	php.gru123@gmail.com
 *	12/09/2015
 */
$(document).ready(function() {
	console.log("Popup screen ready...");

	$("#start").click(function() {
		chrome.extension.sendMessage({msg: "start", from: "popup"});
	});
});