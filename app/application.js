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
                /*var routesMap = _.reduce(_config.router.routes, function(map, route){
                    map[route] = null;
                    return map;
                }, {});*/

                var model  = new AppModel(),
					router = new AppRouter({routes: _config.router.routes}),
					layout = new AppLayout({model: model, router: router, el: _config.view.el});

				return layout;
			};
		};

		return new Application();
	}
);