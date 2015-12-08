var isProfilePage = function() {
		var self = this,
			search = window.location.search,
			path = window.location.pathname;

		if (path === "/profile.php") 
			return true;
		else
			return false;
	},
	isLoginPage = function() {
		if (window.location.pathname === "/login.php")
			return true;
		else 
			return false;
	},
	isLoggedIn = function() {
		var $blueBar = $("#blueBarNAXAnchor"),
			$loggoutMenuBar = $blueBar.find(".loggedout_menubar_container");

		return ($loggoutMenuBar.length < 1);
	};