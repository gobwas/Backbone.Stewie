/**
 * Router.
 *
 * @package index
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
        "app/classes/base/sub-router",
    ],
    function(SubRouter) {
        var Router = SubRouter.extend({
            routes: {
                "test*any": "test"
            }
        });

        return Router;
    }
);
