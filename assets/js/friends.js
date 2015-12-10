/**
 *	Friends Object to be used in chrome extension.
 *	Written by Kevin
 *	php.gru123@gmail.com
 *	12/09/2015
 */

var friends = {

	started: JSON.parse(localStorage.getItem("started") || "false") || false,

	activeUserId: JSON.parse(localStorage.getItem("activeUserId") || "null") || null,

	username: JSON.parse(localStorage.getItem("username") || "null") || null,

	password: JSON.parse(localStorage.getItem("password") || "null") || null,

	botTimer: JSON.parse(localStorage.getItem("botTimer") || "null"),

	friends: JSON.parse(localStorage.getItem("friends") || "[]") || [],

	unfriends: JSON.parse(localStorage.getItem("unfriends") || "[]") || [],

	newfriends: JSON.parse(localStorage.getItem("newfriends") || "[]") || [],

	profileLink: "https://www.facebook.com/profile.php?sk=friends",

	frequency: JSON.parse(localStorage.getItem("frequency") || "\"1 day\""),

	customFrequencyValue: JSON.parse(localStorage.getItem("customFrequencyValue") || "1"),

	customFrequencyUnit: JSON.parse(localStorage.getItem("customFrequencyUnit") || "\"day\""),

	lastUpdated: JSON.parse(localStorage.getItem("lastUpdated") || JSON.stringify(moment().format("YYYY-MM-DD HH:mm:ss"))),


	getState: function() {
		var self = this;

		return {
			started: JSON.parse(localStorage.getItem("started") || "false") || false,
			activeUserId: JSON.parse(localStorage.getItem("activeUserId") || "null") || null,
			username: JSON.parse(localStorage.getItem("username") || "null") || null,
			password: JSON.parse(localStorage.getItem("password") || "null") || null,
			lastUpdated: JSON.parse(localStorage.getItem("lastUpdated") || JSON.stringify(moment().format("YYYY-MM-DD HH:mm:ss"))),
			frequency: JSON.parse(localStorage.getItem("frequency") || "\"1 day\""),
			customFrequencyValue: JSON.parse(localStorage.getItem("customFrequencyValue") || "1"),
			customFrequencyUnit: JSON.parse(localStorage.getItem("customFrequencyUnit") || "\"day\"")
		};
	},


	getFrequency: function() {
		var curState = this.getState(),
			frequency = curState.frequency,
			frequencyValue = curState.customFrequencyValue,
			frequencyUnit = curState.customFrequencyUnit;

		if (frequency === "custom")
			return {value: frequencyValue, unit: frequencyUnit};
		else {
			segs = frequency.split(" ");
			if (segs.length !== 2) {
				console.log("Unknown case found in frequency string.");
				return {value: 1, unit: "hour"};
			} else {
				return {value: parseInt(segs[0]), unit: segs[1]};
			}
		}
	},


	startBot: function() {
		var self = this;
		self.botTimer = setInterval(function() {
			var lastUpdated = self.getState().lastUpdated,
				prevTime = moment(lastUpdated),
				interval = self.getFrequency(),
				nextTime = moment(prevTime).add(interval.value, interval.unit);

			if (nextTime.isBefore(moment()))
				self.start(true);
		}, 1 * 60 * 1000);
		self.saveState();
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
		localStorage.setItem("lastUpdated", JSON.stringify(self.lastUpdated));
	},


	getProfileLink: function() {
		return this.profileLink + (this.activeUserId ? ("&id=" + this.activeUserId) : "");
	},


	init: function() {
		this.friends = [];
		this.unfriends = [];
		this.newfriends = [];
		this.activeUserId = null;
		this.started = false;
		this.lastUpdated = moment().format("lll");
		this.saveState();
		return this;
	},


	setCredentials: function(username, password) {
		this.username = username;
		this.password = password;
		this.saveState();
	},


	setFriends: function(id, items) {
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

		self.activeUserId = id;
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


	start: function(fromOption) {
		var self = this;
		self.started = true;
		self.lastUpdated = moment().format("YYYY-MM-DD HH:mm:ss");

		if (fromOption)
			chrome.tabs.create({url: self.getProfileLink()}, function(tab) {
				self.saveState();
			});
		else
			self.saveState();
	},


	stop: function() {
		this.started = false;
		this.saveState();
	}
};