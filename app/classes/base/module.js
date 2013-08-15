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

                // if this is instance of new Module, or new Module.extend({...});
                if (this.constructor === Module || this.constructor.__super__.constructor === Module) {
                    this.initialize();
                }
            },

            sendBus: function(port, message) {
                // TODO assert message, port

                DM.get('bus').done(function(Bus) {
                    Bus.trigger(port, message);
                });
            },

            listenBus: function(port, callback, filter, context) {
                // TODO assert port, callback, filter

                DM.get('bus').done(function(Bus) {
                    Bus.on(port, callback, filter, context);
                });
            }
        });

        return Module;
    }
);