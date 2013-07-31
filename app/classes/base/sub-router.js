/**
 * Sub router.
 *
 * @package base
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
    ],
    function() {
        var SubRouter = Backbone.Router.extend({
            constructor: function(options) {
                this.prefix = options.prefix || "";

                this.separator =
                    (this.prefix.slice(-1) === "/")
                        ? ""
                        : "/";

                Backbone.Router.prototype.constructor.call( this, options );
            },

            applyUrl: function(route, name, callback) {
                // grab the full URL
                var fragment = Backbone.history.getFragment(null);

                // Trigger the subroute immediately.  this supports the case where
                // a user directly navigates to a URL with a subroute on the first page load.
                var routeRegExp = this._routeToRegExp(route);

                if (routeRegExp.test(fragment)) {
                    var args = this._extractParameters(routeRegExp, fragment);
                    callback && callback.apply(this, args);
                    this.trigger(['route:' + name].concat(args));
                    this.trigger('route', name, args);
                    Backbone.history.trigger('route', this, name, args);
                }
            },

            route : function (route, name, callback) {
                if (_.isFunction(name)) {
                    callback = name;
                    name = '';
                }
                if (!callback) callback = this[name];

                // remove old non-prefixed route
                if (this.routes && this.routes[route]) {
                    delete this.routes[route];
                }

                if (route.substr(0) === "/") {
                    route = route.substr(1, route.length);
                }

                route = this.prefix + (route.substr(0,1) != '*' ? (!_.isEmpty(route) ? (this.separator + route) : "") : route);

                // save the prefixed route
                this.routes || (this.routes = {});
                this.routes[route] = name;

                Backbone.Router.prototype.route.call(this, route, name, callback);

                this.applyUrl(route, name, callback);

                return this;
            },

            initialize: function() {
            }
        });

        return SubRouter;
    }
);
