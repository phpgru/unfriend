var friends = {
	started: JSON.parse(localStorage.getItem("started") || "false") || false,
	activeUserId: JSON.parse(localStorage.getItem("activeUserId") || "null") || null,

	getState: function() {
		var self = this;

		return {
			started: self.started
		};
	},

	saveState: function() {
		var self = this;

		localStorage.setItem("started", JSON.stringify(self.started));
	},

	openProfilePage: function() {
		console.log("Profile page should be opened.");
	},

	init: function() {
		return this;
	},

	login: function() {
		chrome.tabs.create({url: "https://www.facebook.com/login.php"});
	},

	start: function() {
		var self = this;
		self.started = true;
		self.saveState();
	}
};