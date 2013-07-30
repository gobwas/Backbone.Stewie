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

                // TODO assert (dispatcher);
                // TODO assert (regions);

                // parent call
                Component.prototype.constructor.apply(this, arguments);

                this.events = options.dispatcher;

                _.each(options.regions, function(module, target) {
                    this.addRegion(target, module);
                }, this);

                // Initialization
                // --------------

                if (this.constructor === Container) {
                    this.initialize();
                }
            },

            getLayout: function() {
                return this.layout;
            },

            addRegion: function(target, module) {
                (this.regions[target] && this.regions[target].push(module)) || (this.regions[target] = [module]);
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
                        throw new Error("Module need to have the layout");
                    }

                    this.layout.render();

                    _.each(this.regions, function(modules, target) {
                        /*

                        region.render()

                         */


                        var element = self.layout.$(target);

                        if (element) {
                            _.each(modules, function(module) {
                                element.append(module.render.el);
                            });
                        }
                    });

                    return this;
                }
            })()
        });

        return Container;
    }
);
