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
        // List of collection options to be merged as properties.
        var collectionOptions = ['module'];

        var AbstractCollection = Backbone.Collection.extend({
            constructor: function(options) {
                // Pickup predefined options
                _.extend(this, _.pick(options, collectionOptions));

                Backbone.Collection.prototype.constructor.apply(this, arguments);
            }
        });

        return AbstractCollection;
    }
);
