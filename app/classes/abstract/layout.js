define(
	[
		"app/classes/region",
	],
	function (Region) {
		var AbstractLayout = Backbone.View.extend({
			constructor: function(options) {
				options || (options = {});

				this.regions = {};

				Backbone.View.call(this, options);
			},

			createRegion: function(target) {
				// удалить регион, если таковой имеется
				if (this.regions[target]) {
					this.regions[target].remove();
				}

				var el = this.$(target).get(0);

				return this.regions[target] = new Region({el: el});
			}
		});

		return AbstractLayout;
	}
);