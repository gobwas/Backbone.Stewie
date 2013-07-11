define(
	[],
	function () {
		var AbstractDispatcher = function(options)
        {
			var _registered = [],
                _options = options,
                _module = options.module,
                _self = this;

			this.register = function(dispatcher) {
                _registered.push(dispatcher);
			};

            this.bubble = function(event, subject, value) {
                // here for all
            };

            this.capture = function(event, subject, value) {
                // here for dispatchers
            };
		};

		AbstractDispatcher.prototype = {
			constructor: AbstractDispatcher
		};

        _.extend(AbstractDispatcher.prototype, Backbone.Events);

        AbstractDispatcher.extend = Backbone.extend;

		return AbstractDispatcher;
	}
);
