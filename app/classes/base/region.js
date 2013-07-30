define(
	[],
	function () {
		var Region = function(target, module) {
			this.target = target;
            this.modules.push(module);
		};

		Region.prototype = (function() {
			var generateId = function(view) {
				return _.sprintf('%s:::%s', view.cid, _.uniqueId('regions_view'));
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
				},

				show: function() {

				}
			};

		})();

		Region.extend = Backbone.Model.extend;

		return Region;
	}
);