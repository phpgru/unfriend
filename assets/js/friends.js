var friends = {
	started: JSON.parse(localStorage.getItem("started") || "false") || false,
	activeUserId: JSON.parse(localStorage.getItem("activeUserId") || "null") || null,
	username: JSON.parse(localStorage.getItem("username") || "null") || null,
	password: JSON.parse(localStorage.getItem("password") || "null") || null,
	friends: JSON.parse(localStorage.getItem("friends") || "[]") || [],
	profileLink: "https://www.facebook.com/profile.php?sk=friends",

	getState: function() {
		var self = this;

		return {
			started: self.started,
			activeUserId: self.activeUserId,
			username: self.username,
			password: self.password
		};
	},

	saveState: function() {
		var self = this;

		localStorage.setItem("started", JSON.stringify(self.started));
		localStorage.setItem("activeUserId", JSON.stringify(self.activeUserId));
		localStorage.setItem("username", JSON.stringify(self.username));
		localStorage.setItem("password", JSON.stringify(self.password));
		localStorage.setItem("friends", JSON.stringify(self.friends));
	},

	getProfileLink: function() {
		return this.profileLink;
	},

	init: function() {
		return this;
	},

	setCredentials: function(username, password) {
		this.username = username;
		this.password = password;
		this.saveState();
	},

	setFriends: function(friends) {
		var self = this,
			tempFriends = [];

		for (var i = 0; i < friends.length; i ++) {
			tempFriend = {
				name: friends[i].name,
				id: getParameterByName("id", friends[i].link)
			};

			tempFriends.push(tempFriend);
		}

		self.friends = tempFriends;
		self.saveState();
	},

	login: function() {
		chrome.tabs.create({url: "https://www.facebook.com/login.php"});
	},

	start: function() {
		var self = this;
		self.started = true;
		self.saveState();
	},

	stop: function() {
		this.started = false;
		this.saveState();
	}
};