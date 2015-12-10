/**
 *	Common functions to be used in unfriend chrome extension
 *	Written by Kevin
 *	php.gru123@gmail.com
 *	12/09/2015
 */

var isLoginPage = function() {
		if (window.location.pathname === "/login.php")
			return true;
		else 
			return false;
	},


	isLoggedIn = function() {
		var $blueBar = $("#blueBarNAXAnchor"),
			$loggoutMenuBar = $blueBar.find(".loggedout_menubar_container");

		return ($loggoutMenuBar.length < 1);
	},


	getParameterByName = function(name, link) {
	    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	    if (link)
	    	loc = new URL(link);
	    else
	    	loc = window.location;

	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(loc.search);

	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},


	getFacebookIdFromDom = function() {
		var $timelineEl = $("#pagelet_timeline_main_column"),
			dataAttr = $timelineEl.attr("data-gt");

		var obj = JSON.parse(dataAttr);

		return obj.profile_owner;
	},


	login = function() {
		$("#blueBarNAXAnchor form input[type='submit']").click();
	},

	goToFriendsPage = function() {
		var $friendsTabLink = $("#fbProfileCover div[data-referrer='timeline_light_nav_top'] a[data-tab-key='friends']");

		$friendsTabLink.click();
	},


	isProfilePage = function() {
		var self = this,
			search = window.location.search,
			path = window.location.pathname;

		if (path === "/profile.php") {
			sk = getParameterByName("sk");
			return (sk==="friends");
		} else 
			return ($("#pagelet_timeline_medley_friends").length > 0);
	};