define(
	[
		"app/classes/abstract/layout",
        "dm",
	],
	function (Layout, DM) {
		var AppView = Layout.extend({
            initialize: function() {
                this.router = this.options.router;

                this.listenTo(this.router, 'route', this.onRoute);
            },

            onRoute: function(route) {
                var self = this;

                console.log('route', route);

                DM.get('module-manager').done(function(ModuleManager) {
                    try {
                        ModuleManager.get(route).done(function(module) {
                            self.$el
                                .empty()
                                .append(module.render().layout.el);
                        });
                    } catch (error) {
                        console.warn(error.message);
                    }
                });
            }
		});

		return AppView;
	}
);