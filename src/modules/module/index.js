define(
	[
		"app/classes/abstract/module",
		"./js/views/layout",
	],
	function (Module, Layout) {
		return Module.extend({
			construct: function() {
				Module.prototype.construct.apply(this, arguments);
				console.log('#STUB: module->construct');
				this.layout = new Layout();
			}
		});
	}
);