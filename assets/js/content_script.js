window.ContentScript = {
	getFriends: function() {
		var $allFriendsContainer = $("#pagelet_timeline_medley_friends ul[data-pnref='friends'] li>div"),
			friends = [];

		for (var i = 0; i < $allFriendsContainer.length; i++) {
			$friendBlock = $($allFriendsContainer[i]);
			tempFriend = {
				name: $friendBlock.find(".uiProfileBlockContent>div>div>div>a").text(),
				link: ($friendBlock.find(".uiProfileBlockContent>div>div>div>a")[0] || {}).href
			};
			friends.push(tempFriend);
		}

		return friends;
	},

	start: function(state) {
		var friendsAllShowTimer = null,
			self = this;
		if (isLoggedIn()) {
			if (isProfilePage()) {
				friendsAllShowTimer = setInterval(function() {
					$loadingIcon = $("#pagelet_timeline_medley_friends>div:nth-child(2)>div>img.img");
					if ($loadingIcon.length === 0) {
						clearInterval(friendsAllShowTimer);

						friends = self.getFriends();
						chrome.extension.sendMessage({msg: "friends", friends: friends});
					} else {
						$(document).scrollTop($loadingIcon.offset().top);
					}
				}, 300);
			} else {
				chrome.extension.sendMessage({msg: "go",  target: "friends"});
			}
		} else {
			if (state.email && state.password) {
				$("#blueBarNAXAnchor form #email").val(state.email);
				$("#blueBarNAXAnchor form #pass").val(state.password);
			} else {
				if ($("#blueBarNAXAnchor form #email").val() &&
					$("#blueBarNAXAnchor form #pass").val()) {
					$("#blueBarNAXAnchor form input[type='submit']").click();
				} else {
					$("#blueBarNAXAnchor form").submit(function(event) {
						var username = $("#blueBarNAXAnchor form #email").val(),
							password = $("#blueBarNAXAnchor form #pass").val();

						chrome.extension.sendMessage({msg: "credentials", username: username, password: password});
					});
					chrome.extension.sendMessage({msg: "stop"}, function() {
						alert("Plese login");
					})
				}
			}
		}
	},

	stop: function() {
		console.log("Content script should be stopped.");
	}
};

chrome.extension.sendMessage({msg: "state"}, function(state) {
	if (state.started) {
		$(document).ready(function() {
			window.ContentScript.start(state);
		});
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.msg) {
		case "start":
			window.ContentScript.start(request.state);
			break;

		default:
			console.log("Unknown request fetched...");
			break;
	}
});