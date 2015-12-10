/**
 *	Background script file for unfriend chrome extension
 *	Written by Kevin
 *	php.gru123@gmail.com
 *	12/09/2015
 */

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

	switch(request.msg) {
		case "state":
			sendResponse(friends.getState());
			break;


		case "start":
			if (request.from === "popup") {
				chrome.tabs.query({
					currentWindow:true, 
					active:true
				}, function(tabs){
					var url = tabs[0].url,
						loc = new URL(url);

					if (loc.hostname === "www.facebook.com")/* && 
						loc.pathname === "/profile.php" && 
						(getParameterByName("id", url) === friends.activeUserId || 
							getParameterByName("id", url) === ""))*/ {
						friends.start();
						chrome.tabs.sendMessage(tabs[0].id, {msg: "start", state: friends.getState()});
					} else {
						friends.start(true);
					}
				});
			} else if (request.from === "option") {
				friends.start(true);
			}
			break;


		case "stop":
			friends.stop();
			sendResponse();
			break;


		case "credentials":
			username = request.username;
			password = request.password;
			friends.setCredentials(username, password);
			break;


		case "go":
			switch(request.target) {
				case "friends":
					chrome.tabs.update(sender.tab.id, {url: friends.getProfileLink()});
					break;

				case "login":
					friends.login();
					break;

				default:
					break;
			}
			break;


		case "friends":
			friends.setFriends(request.id, request.friends);
			break;


		default:
			break;
	}
});


chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {

	switch(request.command) {
		case "friends.get":
			sendResponse({
				activeFriends: friends.friends,
				lostFriends: friends.unfriends
			});
			break;


		case "friends.update":
			friends.start(true);
			break;


		default:
			sendResponse({success: false});
			break;
	}

});

chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install"){
		console.log("This is a first install!");
		friends.init();
		friends.startBot();
	}else if(details.reason == "update"){
		var thisVersion = chrome.runtime.getManifest().version;
		console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
		friends.startBot();
	}
});