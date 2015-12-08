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
	login = function() {
		$("#blueBarNAXAnchor form input[type='submit']").click();
	},
	isProfilePage = function() {
		var self = this,
			search = window.location.search,
			path = window.location.pathname;

		if (path === "/profile.php") {
			sk = getParameterByName("sk");
			return (sk==="friends");
		}
		else
			return false;
	};