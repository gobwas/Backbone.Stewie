require(
	[
		"jquery",
		"lodash",
		"underscore.string",
		"backbone"
	],

	function($, _, _s, Backbone) {

		_.mixin(_s.exports());

		require(
			[
				"app/config/config",
				"app/config/services",
				"application",
				"dm",
			],

			function(config, services, Application, DM) {
				Application.setConfig(config.application);

				DM.setConfig(services);
				DM.setProperties(config.properties);

				DM.get('module-manager').done(function(ModuleManager) {
					ModuleManager.get('index').done(function(module) {
						console.log('module loaded');
						$('#main').append(module.render().el);
						console.log('module rendered');
					});
				});

				require(["app/main"]);
			}
		)

	}
);