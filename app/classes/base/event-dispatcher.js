define(
	[],
	function () {
		var EventDispatcher = function(options)
        {
			var _registered = [],
                _options = options,
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

		EventDispatcher.prototype = {
			constructor: EventDispatcher,

            initialize: function(options) {
                // TODO
            }
		};

        _.extend(EventDispatcher.prototype, Backbone.Events);

        EventDispatcher.extend = Backbone.extend;

		return EventDispatcher;
	}
);
