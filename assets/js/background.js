chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.msg) {
		case "state":
			sendResponse(friends.getState());
			break;

		case "start":
			friends.start();
			break;

		case "go":
			switch(request.target) {
				case "friends":
					friends.openProfilePage();
					break;

				case "login":
					friends.login();
					break;

				default:
					break;
			}
			break;

		default:
			break;
	}
});