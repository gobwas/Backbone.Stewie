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

				setView: function(view, render) {
					_.each(this.views, function(view, key, views) {
						view.remove();
						delete views[key];
					});

					this.$('*').remove();

					this.insertView(view, render);
				},

				insertView: function(view, render) {
					this.views[generateId(view)] = view;
					this.$el.append(view.el);

					if (render) {
						view.render();
					}

					return view;
				}
			};

		})();

		Region.extend = Backbone.Model.extend;

		return Region;
	}
);