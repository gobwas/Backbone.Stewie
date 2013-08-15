/**
 * Component.
 *
 * @package base
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
    ],
    function() {
        // List of view options to be merged as properties.
        var componentOptions = ['autoRender'];

        var Component = function Component(options) {

            // TODO assert (_options.id);
            // TODO assert (_options);

            _.extend(this, _.pick(options, componentOptions));

            /**
             * Parameters.
             *
             * @type {object}
             * @private
             */
            var _options = options || {};

            /**
             * Key.
             *
             * @type {string}
             * @private
             */
            var _id = _options.id || null;

            /**
             * Returns component key.
             *
             * @returns {string}
             */
            this.getId = function() {
                return _id;
            };

            /**
             * Returns component options.
             *
             * @returns {Mixed}
             */
            this.getOptions = function() {
                return _.cloneDeep(_options);
            };

            /**
             * Returns options value.
             *
             * @param key
             * @returns {Mixed}
             */
            this.getOption = function(key) {
                return _.cloneDeep(_options[key]);
            };

            // Initialization
            // --------------

            // if this is instance of new Component, or new Component.extend({...});
            if (this.constructor === Component || this.constructor.__super__.constructor === Component) {
                this.initialize();
            }
        };

        _.extend(Component.prototype, Backbone.Events, {

            constructor: Component,

            /**
             * Рисует компонент.
             *
             * @returns {*}
             */
            render: function() {
                if (!this.layout) {
                    throw new Error("Component must have the layout");
                }

                this.layout.render();

                return this;
            },

            setElement: function(element) {
                // TODO assert element instanceof DOMElement

                var self = this;

                if (!this.layout) {
                    throw new Error("Container must have the layout");
                }

                this.layout.setElement($(this.layout.getSelector(), element).get(0));

                return this.autoRender ? this.render() : this;
            },

            /**
             * @abstract
             */
            initialize: function(){}
        });

        Component.extend = Backbone.Model.extend;

        return Component;
    }
);
