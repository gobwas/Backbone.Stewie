define(
	[
        "app/classes/base/message"
    ],
	function (Message) {
		var EventDispatcher = function EventDispatcher(options)
        {
			var _modules = [],
                _options = options,
                _self = this;

			this.push = function(module) {
                this.listenTo(module.events, 'all', this.bubble);
                _modules.push(module);
			};

            this.bubble = function(message) {
                // TODO assert message instanceof Message
                // TODO assert message.getData instanceof Array

                var data = message.getData();

                var event = data[0];

                if (!_.str.include(event, EventDispatcher.CAPTURE)) {
                    Backbone.Events.trigger.apply(this, data);
                }
            };

            this.capture = function(message) {
                // TODO assert message instanceof Message
                // TODO assert message.getData instanceof Array

                var data = message.getData();

                var event = data[0],
                    args = data.slice(1);

                args.unshift(_.sprintf('%s:%s', EventDispatcher.CAPTURE, event));

                if (!_.isEmpty(_modules)) {
                    _.each(_modules, function(module) {
                        Backbone.Events.trigger.apply(module.events, args);
                        module.events.capture.call(module.events, message);
                    });
                } else {
                    this.bubble.call(this, message);
                }
            };
		};

        _.extend(EventDispatcher.prototype, Backbone.Events, {
            constructor: EventDispatcher,

            trigger: function() {
                var message = new Message(_.toArray(arguments));
                this.capture.call(this, message);
            }
        });

        _.extend(EventDispatcher, {
            extend: Backbone.Event,

            CAPTURE: 'capture'
        });


		return EventDispatcher;
	}
);
