define(
	[],
	function () {
		var AbstractService = function(options) {
			this.options = options;
		};

		AbstractService.prototype = {
			constructor: AbstractService
		};

		AbstractService.extend = Backbone.Model.extend;

		return AbstractService;
	}
);