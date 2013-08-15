define(
	[
		"app/classes/application/models/app-model",
		"app/classes/application/views/app-layout",
		"app/classes/application/routers/app-router",
	],
	function (AppModel, AppLayout, AppRouter) {
		var Application = function Application() {
			var _config = null;

			this.setConfig = function(config) {
				if (_config) {
					throw new Error("Application is already configured");
				}

				_config = config;
			};

			this.init = function(options) {
                var model  = new AppModel(),
					router = new AppRouter(),
					layout = new AppLayout({model: model, router: router, el: _config.view.el});

                if (_config.type == Application.CLASSIC) {
                    if (_.has(_config.routes, options.root)) {
                        layout.init(_.result(_config.routes, options.root));
                    }
                } else {
                    _.each(_config.routes, function(name, route) {
                        router.route(route, name);
                    });
                }

                Backbone.history.start({pushState: _config.history.pushState});

				return layout;
			};
		};

        _.extend(Application, {
            CLASSIC: "classic",
            RIA:     "ria"
        });

		return new Application();
	}
);