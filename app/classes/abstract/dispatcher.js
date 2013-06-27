define(
	[],
	function () {
		var AbstractDispatcher = function() {
			var _layouts = [];

			this.register = function(layout) {
				_layouts.push(layout);
			};
		};

		AbstractDispatcher.prototype = {
			constructor: AbstractDispatcher,

			/**
			 * Регистрирует новый модуль для наблюдения.
			 *
			 * @param layout
			 */
			register: function(layout) {

			}
		};

		return AbstractDispatcher;
	}
);
