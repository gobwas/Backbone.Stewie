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
        // List of model options to be merged as properties.
        var modelOptions = ['module'];

        var AbstractModel = Backbone.Model.extend({
            constructor: function(options) {
                // Pickup predefined options
                _.extend(this, _.pick(options, modelOptions));

                Backbone.Model.prototype.constructor.apply(this, arguments);
            }
        });

        return AbstractModel;
    }
);
