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
            var _id = options.id;

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
                if (!this.view) {
                    throw new Error("Component need to have the view");
                }

                this.view.render();

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
