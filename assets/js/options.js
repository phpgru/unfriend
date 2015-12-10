(function(window, $) {
	'use strict';

	var Options = function() {
		this.changed = false;
		this.frequency = JSON.parse(localStorage.getItem("frequency") || "\"1 day\"");
		this.customFrequencyValue = JSON.parse(localStorage.getItem("customFrequencyValue") || "1");
		this.customFrequencyUnit = JSON.parse(localStorage.getItem("customFrequencyUnit") || "\"day\"");

		this.frequencyControl = $("#option-frequency");
		this.customFrequencyContainer = $("div.input-group.custom-frequency-container");
		this.customFrequencyValueControl = $("input#option-custom-frequency");
		this.customFrequencyUnitControl = $("select#option-custom-frequency-unit");
		this.saveButton = $("button#save");
		this.updateButton = $("button#update");
		this.tabLinks = $(".nav-tabs a");
		this.curFriendCountControl = $("#cur-friend-count");
		this.lostFriendCountControl = $("#lost-friend-count");
	};

	Options.prototype = {
		init: function() {
			this.changed = false;
			this.frequencyControl.val(this.frequency);
			this.customFrequencyValueControl.val(this.customFrequencyValue);
			this.customFrequencyUnitControl.val(this.customFrequencyUnit);
			this.curFriendCountControl.text(friends.friends.length);
			this.lostFriendCountControl.text(friends.unfriends.length);
			
			if (this.frequency === "custom")
				this.customFrequencyContainer.css("opacity", 1);
			else
				this.customFrequencyContainer.css("opacity", 0);

			this.initEvents();
		},

		initEvents: function() {
			var self = this;

			this.frequencyControl.change(function() {
					if ($(this).val() === self.frequency) {
						self.saveButton.prop("disabled", true);
					} else {
						self.saveButton.prop("disabled", false);
					}

					if ($(this).val() === "custom") {
						self.customFrequencyContainer.css("opacity", 1);
					} else {
						self.customFrequencyContainer.css("opacity", 0);
					}
				});
			this.customFrequencyValueControl.change(function() {
					if ($(this).val() === self.customFrequencyValue) {
						self.saveButton.prop("disabled", true);
					} else {
						self.saveButton.prop("disabled", false);
					}
				});
			this.customFrequencyUnitControl.change(function() {
					if ($(this).val() === self.customFrequencyUnit) {
						self.saveButton.prop("disabled", true);
					} else {
						self.saveButton.prop("disabled", false);
					}
				});
			this.saveButton.click(function() {
					self.frequency = self.frequencyControl.val();
					self.customFrequencyValue = self.customFrequencyValueControl.val();
					self.customFrequencyUnit = self.customFrequencyUnitControl.val();
					self.saveState();
					self.saveButton.prop("disabled", true);
				});
			this.updateButton.click(function() {
					chrome.extension.sendMessage({msg: "start", from: "option"});
				});

			this.tabLinks.click(function(e) {
				e.preventDefault();
				$(this).tab('show');
			});
		},

		saveState: function() {
			localStorage.setItem("frequency", JSON.stringify(this.frequency));
			localStorage.setItem("customFrequencyValue", JSON.stringify(this.customFrequencyValue));
			localStorage.setItem("customFrequencyUnit", JSON.stringify(this.customFrequencyUnit));
		}
	};

	$(function() {
		var Opened = new Options();
		Opened.init();
	});

	window.Options = new Options();
})(window, jQuery);