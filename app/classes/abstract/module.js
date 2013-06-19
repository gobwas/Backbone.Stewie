define(
	[
	],
	function (Layout) {
		var Module = function() {

		};

		Module.prototype = {
			constructor: Module,

			construct: function() {
				// if this constructed
				console.log("#STUB: abstract_module->construct");
			}
		};

		Module.extend = Backbone.Model.extend;

		return Module;
	}
);