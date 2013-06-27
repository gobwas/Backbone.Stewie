define(
	[
		"app/classes/abstract/module",
		"./js/views/layout",
	],
	function (Module, Layout) {
		return Module.extend({
			initialize: function() {
				Module.prototype.initialize.apply(this, arguments);
				console.log('#STUB: module->initialize');
				// here we creating model, model view, etc...



				var model = new Backbone.Model();
				this.layout = new Layout({module: this, model: model});

			}
		});
	}
);