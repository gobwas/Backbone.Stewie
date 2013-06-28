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
				"app/dm",
				"moment",
			],

			function(config, services, Application, DM, moment) {
				Application.setConfig(config.application);

				DM.setConfig(services);
				DM.setProperties(config.properties);

				var start = new Date();

				DM.get('module-manager').done(function(ModuleManager) {
					ModuleManager.get('index').done(function(module) {
						$('#main').append(module.render().getLayout().el);

						module.layout.getRegion(".third");

						var end = new Date();

						console.log('during', end.getTime() - start.getTime());
					});
				});



				require(["app/main"]);
			}
		)
	}
);