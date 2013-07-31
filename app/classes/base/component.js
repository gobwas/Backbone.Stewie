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
        var Component = function Component(options) {

            // TODO assert (id);
            // TODO assert (options);

            options || (options = {});

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
            var _id = options.id || null;

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

            if (this.constructor === Component) {
                this.initialize();
            }
        };

        Component.prototype = {

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

            /**
             * @abstract
             */
            initialize: function(){}
        };

        Component.extend = Backbone.Model.extend;

        return Component;
    }
);
