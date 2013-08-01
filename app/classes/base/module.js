define(
    [
        "dm",
        'app/classes/base/container',
    ],
    function (DM, Container) {

        // TODO Возможно layout должен знать id модуля, к которому он принадлежит

        var Module = Container.extend({
            constructor: function Module(options) {

                // parent call
                Container.prototype.constructor.apply(this, arguments);

                var _options = options || {};

                this.options = _.cloneDeep(_options);

                // Initialization
                // --------------

                if (this.constructor === Module || this.constructor.__super__.constructor === Module) {
                    this.initialize();
                }
            },

            sendBus: function(port, message) {
                // TODO assert message, port

                DM.get('bus').done(function(Bus) {
                    Bus.trigger(port, message.getName(), message);
                });
            },

            listenBus: function(port, message, callback, context) {
                // TODO assert port, message, callback

                context || (context = this);

                DM.get('bus').done(function(Bus) {
                    Bus.on(port, message, callback, context);
                });
            }
        });

        return Module;
    }
);