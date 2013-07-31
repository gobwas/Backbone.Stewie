define(
	[
		"application"
	],
	function (application) {
		application.init();

        Backbone.history.start({pushState: false});
	}
);