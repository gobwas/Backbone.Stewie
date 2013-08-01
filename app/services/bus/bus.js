/**
 * Bus.
 *
 * @package module
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
    ],
    function() {
        var Bus = function Bus() {
            this.ports = {};
        };

        Bus.prototype = {
            constructor: Bus,

            on: function(port, callback, filter, context) {
                if (!_.isFunction(filter) && !context) {
                    context = filter;
                    filter = undefined;
                }

                this.ports[port] || (this.ports[port] = []);
                this.ports[port].push({callback: callback, filter: filter, ctx: context});

                return this;
            },

            once: function(port, callback, filter, context) {
                var self = this;
                var once = _.once(function(message) {
                    self.off(port, once, context);
                    callback.call(context, message);
                });

                return this.on(port, once, filter, context);
            },

            off: function(port, callback, context) {
                if (!callback && !context) {
                    return;
                }

                var ports = port ? [port] : _.keys(this.ports),
                    self = this,
                    retain,
                    events;

                _.each(ports, function(port) {
                    if (self.ports[port]) {
                        events = self.ports[port];
                        self.ports[port] = retain = [];

                        _.each(events, function(listener) {
                            if (listener.ctx !== context || listener.callback !== callback) {
                                retain.push(listener);
                            }
                        });

                        if (!retain.length) {
                            delete self.ports[port];
                        }
                    }
                });
            },

            trigger: function(port, message) {
                if (!message.getId()) {
                    message.setId(_.uniqueId('bus'));
                }

                if (this.ports[port]) {
                    _.each(this.ports[port], function(listener) {
                        if (!_.isFunction(listener.filter) || listener.filter.call(listener.ctx, message)) {
                            listener.callback.call(listener.ctx, message);
                        }
                    });
                }
            }
        };

        return Bus;
    }
);
