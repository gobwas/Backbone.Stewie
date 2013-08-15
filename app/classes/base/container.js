/**
 * Container.
 *
 * @package base
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 *
 * TODO Разобраться, стоит ли использовать Region - сейчас не используется
 */
define(
    [
        './component',
        './region',
        "app/classes/messenger/messenger",
    ],
    function(Component, Region, Messenger) {
        var Container = Component.extend({

            constructor: function Container(options) {
                // parent call
                Component.prototype.constructor.apply(this, arguments);

                var _options = options || {};

                // TODO assert (dispatcher);
                // TODO assert (regions);

                this.messenger = new Messenger(this);

                this.regions = {};

                _.each(_options.regions, function(module, target) {
                    this.addModule(module, target);
                }, this);

                // Initialization
                // --------------

                // if this is instance of new Container, or new Container.extend({...});
                if (this.constructor === Container || this.constructor.__super__.constructor === Container) {
                    this.initialize();
                }
            },

            /**
             * Proxy for Messenger#send method.
             */
            send: function(message) {
                this.messenger.send(message);
            },

            update: function(message) {
                this.trigger(message.getName(), message);
            },

            addModule: function(module, target) {
                var messenger = this.messenger;
                var region = this.regions[target] || (this.regions[target] = new Region());

                var modules = _.isArray(module) ? module : [module];

                _.each(modules, function(module) {
                    messenger.register(module);
                    region.push(module);
                });
            },

            render: function() {
                var self = this;

                if (!this.layout) {
                    throw new Error("Container must have the layout");
                }

                this.layout.render();

                _.each(this.regions, function(region, target) {
                    region.render(self.layout.$(target));
                });

                return this;
            },

            setElement: function(element) {
                // TODO assert element instanceof DOMElement

                var self = this;

                if (!this.layout) {
                    throw new Error("Container must have the layout");
                }

                this.layout.setElement(element);

                if (this.autoRender) {
                    return this.render();
                }

                _.each(this.regions, function(region, target) {
                    var el = self.layout.$(target);

                    _.each(region.modules, function(module) {
                        module.setElement($(module.layout.getSelector(), el).get(0));
                    });
                });

                return this;
            }
        });

        return Container;
    }
);
