define(
	[],
	function () {
		var Region = function(el) {
			this.el = el;
			this.$el = $(el);
			this.$ = this.$el.find;
			this.views = {};
		};

		Region.prototype = (function() {
			var generateId = function(view) {
				return _.sprintf('%s%%%%s', view.cid, _.uniqueId('regions_view'));
			};

			return {
				constructor: Region,

				setView: function(view) {
					_.each(this.views, function(view, key, views) {
						view.remove();
						delete views[key];
					});

					this.$('*').remove();

					this.insertView(view);
				},

				insertView: function(view) {
					this.views[generateId(view)] = view;
					this.$el.append(view.el);

					return view;
				}
			};

		})();

		Region.extend = Backbone.Model.extend;

		return Region;
	}
);