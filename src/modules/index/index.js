define(
	[
		"app/classes/abstract/module",
		"./js/views/layout",
		"./js/routers/router",
	],
	function (Module, Layout, Router) {
		return Module.extend({
			initialize: function() {
				var model = new Backbone.Model(),
                    router = new Router({prefix: this.options.route});

				this.layout = new Layout({
                    module: this,
                    model:  model,
                    router: router
                });
			}
		});
	}
);