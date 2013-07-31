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
    ],
    function(Component, Region) {
        var Container = Component.extend({

            constructor: function Container(options) {
                // parent call
                Component.prototype.constructor.apply(this, arguments);

                var _options = options || {};

                // TODO assert (dispatcher);
                // TODO assert (regions);

                this.events = _options.dispatcher;

                this.regions = {};

                _.each(_options.regions, function(module, target) {
                    this.addModule(module, target);
                }, this);

                // Initialization
                // --------------

                if (this.constructor === Container) {
                    this.initialize();
                }
            },

            /**
             * Proxy for EventsDispatcher#trigger method.
             */
            trigger: function() {
                this.events.trigger.apply(this.events, arguments);
            },

            addModule: function(module, target) {
                var events = this.events;
                var region = this.regions[target] || (this.regions[target] = new Region());

                var modules = _.isArray(module) ? module : [module];

                _.each(modules, function(module) {
                    events.push(module);
                    region.push(module);
                });
            },

            render: (function() {
                /**
                 *
                 * @param region
                 * @param module
                 * @param insert
                 */
                var addView = function(region, module, insert) {
                    var layout = module.getOption('render') ?
                        module.render().layout :
                        module.layout;

                    insert ? region.insertView(layout) : region.setView(layout);
                };

                return function() {
                    var self = this;

                    if (!this.layout) {
                        throw new Error("Container must have the layout");
                    }

                    this.layout.render();

                    _.each(this.regions, function(region, target) {
                        region.render(self.layout.$(target));
                    });

                    return this;
                }
            })()
        });

        return Container;
    }
);
