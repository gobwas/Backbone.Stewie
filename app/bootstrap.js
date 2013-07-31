require(
	[
		"jquery",
		"lodash",
		"underscore.string",
		"backbone"
	],

	function($, _, _s, Backbone) {

		_.mixin(_s.exports());
        _.str = _s;

		require(
			[
				"app/config/application",
				"app/config/services",
				"application",
				"dm",
				"moment",
			],

			function(applicationConfig, dmConfig, Application, DM, moment) {
				Application.setConfig(applicationConfig);

				DM.setConfig(dmConfig.services);
				DM.setProperties(dmConfig.properties);

				require(["app/main"]);
			}
		)
	}
);