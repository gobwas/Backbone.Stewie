/**
 * Sub router.
 *
 * TODO Реагировать на изменение урла, чтобы модуль мог менять свое состояние в дефолтное
 *
 * @package base
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */
define(
    [
        "app/classes/abstract/router"
    ],
    function(Router) {
        var SubRouter = Router.extend({
            constructor: function(options) {
                this.prefix = options.prefix || "";

                this.separator =
                    (this.prefix.slice(-1) === "/")
                        ? ""
                        : "/";

                Router.prototype.constructor.apply(this, arguments);
            },

            /**
             * Apply URL.
             * Acts like Backbone.loadURL, but without loading URL =)
             *
             * It is used to match case, when user loads sub url necessary, or refreshes the page.
             *
             * @param route
             * @param name
             * @param callback
             */
            applyUrl: function(route, name, callback) {
                // grab the full URL
                var fragment = Backbone.history.getFragment(null);

                // Trigger the subroute immediately.  this supports the case where
                // a user directly navigates to a URL with a subroute on the first page load.
                var routeRegExp = this._routeToRegExp(route);

                if (routeRegExp.test(fragment)) {
                    var args = this._extractParameters(routeRegExp, fragment);
                    callback && callback.apply(this, args);
                    this.trigger('route:' + name, args);
                    this.trigger('route', name, args);
                    Backbone.history.trigger('route', this, name, args);
                }
            },

            route : function (route, name, callback) {
                var self = this;

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

                // Run applying URL when the main thread is over.
                // It is because some view can bind listens to this router later in thread.
                setTimeout(function() {
                    self.applyUrl(route, name, callback);
                }, 0);

                return this;
            },

            initialize: function() {
            }
        });

        return SubRouter;
    }
);
