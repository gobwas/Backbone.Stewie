define(
	[
		"app/classes/abstract/module",
		"./js/views/layout",
	],
	function (Module, Layout) {
		return Module.extend({
			initialize: function() {
				var model = new Backbone.Model();
				this.layout = new Layout({module: this, model: model});
			}
		});
	}
);