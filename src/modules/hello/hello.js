define(
    [
        "app/classes/abstract/module",
        "./js/views/layout",
        "app/classes/base/sub-router",
    ],
    function (Module, Layout, SubRouter) {
        return Module.extend({
            initialize: function() {
                var model = new Backbone.Model();
                var router = new SubRouter({
                    routes: {
                        "test*any":      "test",
                        "params/:query": "params"
                    },
                    prefix: this.options.route
                });

                this.layout = new Layout({
                    module: this,
                    model:  model,
                    router: router
                });
            }
        });
    }
);