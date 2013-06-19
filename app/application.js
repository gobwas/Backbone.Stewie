define(
	[
		"app/classes/models/app-model",
		"app/classes/views/app-layout",
		"app/classes/routers/app-router",
	],
	function (AppModel, AppLayout, AppRouter) {
		var Application = function() {
			var _config = null;

			this.setConfig = function(config) {
				if (_config) {
					throw new Error("Application is already configured");
				}

				_config = config;
			};

			this.init = function() {
				var model = new AppModel(),
					router = new AppRouter,
					layout = new AppLayout({model: model, router: router});

				return layout;
			};
		};

		return new Application();
	}
);