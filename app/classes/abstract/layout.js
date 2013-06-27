define(
	[],
	function () {
		var AbstractLayout = Backbone.View.extend({
			constructor: function(options) {
				options || (options = {});

				this.regions = {};

				Backbone.View.call(this, options);
			},

			setRegion: function(region, view) {
				// удалить регион, если таковой имеется
				if (this.regions[region]) {
					this.regions[region].remove();
				}

				this.regions[region] = view;
			},

			renderRegions: function() {
				// here render regions
			}
		});

		return AbstractLayout;
	}
);