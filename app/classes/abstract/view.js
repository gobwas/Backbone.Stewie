/**
 * My Module.
 *
 * @package
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
    ],
    function() {
        // List of view options to be merged as properties.
        var viewOptions = ['module', 'router'];

        var AbstractView = Backbone.View.extend({
            constructor: function(options) {
                // Pickup predefined options
                _.extend(this, _.pick(options, viewOptions));

                Backbone.View.prototype.constructor.apply(this, arguments);
            }
        });

        return AbstractView;
    }
);
