$(document).ready(function() {
	console.log("Content script ready...");
});

window.ContentScript = {
	start: function(state) {
		if (isLoggedIn()) {
			chrome.extension.sendMessage({msg: "go",  target: "friends"});
		} else {
			if (isLoginPage()) {
				if (state.email && state.password) {
					$("#blueBarNAXAnchor form #email").val(state.email);
					$("#blueBarNAXAnchor form #pass").val(state.password);
				} else {
					chrome.extension.sendMessage({msg: "stop"}, function() {
						alert("Please login.");
					});
				}
			} else {
				chrome.extension.sendMessage({msg: "go", target: "login"});
			}
		}
	}
}

chrome.extension.sendMessage({msg: "state"}, function(state) {
	if (state.started) {
		window.ContentScript.start(state);
	}
} )