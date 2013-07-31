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

                options || (options = {});

                // TODO assert (dispatcher);
                // TODO assert (regions);

                this.events = options.dispatcher;

                this.regions = {};

                _.each(options.regions, function(module, target) {
                    this.addRegion(target, module);
                }, this);

                // Initialization
                // --------------

                if (this.constructor === Container) {
                    this.initialize();
                }
            },

            addRegion: function(target, module) {
                var region = this.regions[target] || (this.regions[target] = new Region());
                if (_.isArray(module)) {
                    _.each(module, region.push, region);
                } else {
                    region.push(module);
                }
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
