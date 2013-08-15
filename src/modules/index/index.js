define(
	[
		"app/classes/base/module",
		"./js/views/layout",
		"./js/routers/router",
	],
	function (Module, Layout, Router) {
		return Module.extend({
			initialize: function() {
				var model = new Backbone.Model(),
                    router = new Router({
                        // routes defined inside router! =)
                        prefix: this.options.route
                    });

				this.layout = new Layout({
                    module: this,
                    model:  model,
                    router: router
                });
			}
		});
	}
);