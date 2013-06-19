define(
	[],
	function () {
		var ModuleManager = function() {
			var _config = null;

			this.setConfig = function(config) {
				if (_config) {
					throw new Error("Module Manager is already configured");
				}

				_config = config;
			};

			this.get = function(key) {
				if (!_config[key]) {
					throw new Error(_.sprintf("Undefined module '%s'", key));
				}

				var self = this,
					deferred = $.Deferred(),
					path    = _config[key].path,
					regions = _config[key].regions;

				require([path], function(module) {

					var inst = new module();

					inst.construct();

					var layout = inst.layout;
						regionPromises = [];

					_.each(regions, function(key, target) {
						var promise = self.get(key).done(function(view) {
							layout.setRegion(target, view);
						});

						regionPromises.push(promise);
					});

					$.when(regionPromises).done(function() {
						deferred.resolve(layout);
					});

				});

				return deferred.promise();
			}
		};

		return ModuleManager;
	}
);