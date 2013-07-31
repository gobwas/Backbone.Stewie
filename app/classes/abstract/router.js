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
        // List of router options to be merged as properties.
        var routerOptions = ['module'];

        var AbstractRouter = Backbone.Router.extend({
            constructor: function(options) {
                // Pickup predefined options
                _.extend(this, _.pick(options, routerOptions));

                Backbone.Router.prototype.constructor.apply(this, arguments);
            }
        });

        return AbstractRouter;
    }
);
