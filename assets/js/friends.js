var friends = {
	started: JSON.parse(localStorage.getItem("started") || "false") || false,
	activeUserId: JSON.parse(localStorage.getItem("activeUserId") || "null") || null,
	username: JSON.parse(localStorage.getItem("username") || "null") || null,
	password: JSON.parse(localStorage.getItem("password") || "null") || null,
	friends: JSON.parse(localStorage.getItem("friends") || "[]") || [],
	unfriends: JSON.parse(localStorage.getItem("unfriends") || "[]") || [],
	newfriends: JSON.parse(localStorage.getItem("newfriends") || "[]") || [],
	profileLink: "https://www.facebook.com/profile.php?sk=friends",

	getState: function() {
		var self = this;

		return {
			started: JSON.parse(localStorage.getItem("started") || "false") || false,
			activeUserId: JSON.parse(localStorage.getItem("activeUserId") || "null") || null,
			username: JSON.parse(localStorage.getItem("username") || "null") || null,
			password: JSON.parse(localStorage.getItem("password") || "null") || null
		};
	},

	saveState: function() {
		var self = this;

		localStorage.setItem("started", JSON.stringify(self.started));
		localStorage.setItem("activeUserId", JSON.stringify(self.activeUserId));
		localStorage.setItem("username", JSON.stringify(self.username));
		localStorage.setItem("password", JSON.stringify(self.password));
		localStorage.setItem("friends", JSON.stringify(self.friends));
		localStorage.setItem("unfriends", JSON.stringify(self.unfriends));
		localStorage.setItem("newfriends", JSON.stringify(self.newfriends));
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

	setFriends: function(items) {
		var self = this,
			originFriends = self.friends,
			originUnfriends = self.unfriends,
			tempFriends = [],
			tempNewFriends = [],
			tempUnfriends = [],
			originFriendsObj = {},
			originUnfriendsObj = {};

		for (var i = 0; i < originFriends.length; i++) {
			originFriendsObj[originFriends[i].id] = originFriends[i];
		}

		for (var i = 0; i < originUnfriends.length; i++) {
			originUnfriendsObj[originUnfriends[i].id] = originUnfriends[i];
		}

		for (var i = 0; i < items.length; i++) {
			tempFriend = {
				name: items[i].name,
				id: getParameterByName("id", items[i].link)
			};

			if (originFriendsObj[tempFriend.id]) {
				delete originFriendsObj[tempFriend.id];
			} else if (originUnfriendsObj[tempFriend.id]){
				delete originUnfriendsObj[tempFriend.id];
			} else {
				tempNewFriends.push(tempFriend);
			}

			tempFriends.push(tempFriend);
		}

		self.friends = tempFriends;
		self.newfriends = tempNewFriends;

		$.each(originFriendsObj, function(key, value) {
			originUnfriendsObj[key] = value;
		});

		$.each(originUnfriendsObj, function(key, value) {
			tempUnfriends.push(value);
		});
		self.unfriends = tempUnfriends;

		self.saveState();
		self.stop();
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