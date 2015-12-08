chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.msg) {
		case "state":
			sendResponse(friends.getState());
			break;

		case "start":
			friends.start();
			chrome.tabs.query({
				currentWindow:true, 
				active:true
			}, function(tabs){
				console.log(tabs);
				chrome.tabs.sendMessage(tabs[0].id, {msg: "start", state: friends.getState()});
			});
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
			friends.setFriends(request.friends);
			break;

		default:
			break;
	}
});