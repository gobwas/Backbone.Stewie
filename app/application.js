define(
	[
		"app/classes/application/models/app-model",
		"app/classes/application/views/app-layout",
		"app/classes/application/routers/app-router",
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
                var model  = new AppModel(),
					router = new AppRouter({routes: _config.router.routes}),
					layout = new AppLayout({model: model, router: router, el: _config.view.el});

				return layout;
			};
		};

		return new Application();
	}
);