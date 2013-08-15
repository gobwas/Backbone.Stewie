define(
	[
		"app/classes/abstract/layout",
        "dm",
	],
	function (Layout, DM) {
		var AppView = Layout.extend({
            initialize: function() {
                this.listenTo(this.router, 'route', this.onRoute);
            },

            init: function(page) {
                var self = this;

                DM.get('module-manager').done(function(ModuleManager) {
                    try {
                        ModuleManager.get(page).done(function(module) {
                            module.setElement(($(module.layout.getSelector(), self.el).get(0)));
                        });
                    } catch (error) {
                        console.warn(error.message);
                    }
                });
            },

            onRoute: function(route) {
                var self = this;

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