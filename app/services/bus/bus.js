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
            on: function(port, name, callback, context) {
                this.ports[port] || (this.ports[port] = {});
                this.ports[port][name] || (this.ports[port][name] = []);

                this.ports[port][name].push({callback: callback, ctx: context});

                return this;
            },

            once: function(port, name, callback, context) {
                var self = this;
                var once = _.once(function() {
                    self.off(port, name, once);
                    callback.apply(context, arguments);
                });

                return this.on(port, name, once, context);
            },

            off: function(port, name, callback, context) {
                if (!callback && !context) {
                    return;
                }

                var ports = port ? [port] : _.keys(this.ports),
                    names,
                    self = this,
                    retain,
                    events;

                _.each(ports, function(port) {
                    if (self.ports[port]) {

                        names = name ? [name] : _.keys(self.ports[port]);

                        _.each(names, function(name) {
                            if (events = self.ports[port][name]) {
                                self.ports[port][name] = retain = [];

                                _.each(events, function(ev) {
                                    if (ev.ctx !== context || ev.callback !== callback) {
                                        retain.push(ev);
                                    }
                                });

                                if (!retain.length) {
                                    delete self.ports[port][name];
                                }
                            }

                        });
                    }
                });
            },

            trigger: function(port, name, message) {
                message.setId(_.uniqueId('bus_'));

                if (this.ports[port] && this.ports[port][name]) {
                    _.each(this.ports[port][name], function(ev) {
                        ev.callback.call(ev.ctx, message);
                    });
                }
            }
        };

        return Bus;
    }
);
