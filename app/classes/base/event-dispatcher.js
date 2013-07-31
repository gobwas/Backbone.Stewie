define(
	[],
	function () {
		var EventDispatcher = function(options)
        {
			var _modules = [],
                _options = options,
                _self = this;

			this.push = function(module) {
                this.listenTo(module.events, 'all', this.bubble);
                _modules.push(module);
			};

            this.bubble = function() {
                Backbone.Events.trigger.apply(this, arguments);
            };

            this.capture = function() {
                var _arguments = arguments,
                    event = arguments[0],
                    args = Array.prototype.slice.call(arguments, 1);

                args.unshift('capture:' + event);

                if (!_.isEmpty(_modules)) {
                    _.each(_modules, function(module) {
                        module.events.capture.apply(module.events, _arguments);
                    });
                } else {
                    this.bubble.apply(this, arguments);
                }
            };
		};

        _.extend(EventDispatcher.prototype, Backbone.Events, {
            constructor: EventDispatcher,

            trigger: function() {
                this.capture.apply(this, arguments);
            }
        });

        EventDispatcher.extend = Backbone.extend;

		return EventDispatcher;
	}
);
