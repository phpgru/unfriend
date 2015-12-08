$(document).ready(function() {
	console.log("Popup screen ready...");

	$("#start").click(function() {
		chrome.extension.sendMessage({msg: "start"});
	});
});