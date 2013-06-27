define(
	[],
	function () {
		var ModuleManager = function() {
			/**
			 * Конфигурация модулей.
			 *
			 * @type {object}
			 * @private
			 */
			var _config;

			/**
			 * Устанавливает конфигурацию.
			 *
			 * @param {object} config
			 */
			this.setConfig = function(config) {
				if (_config) {
					throw new Error("Module Manager is already configured");
				}

				_config = config;
			};

			/**
			 * Возвращает собранный модуль.
			 *
			 * @param {string} key
			 * @returns {object} $.Deferred.promise
			 */
			this.get = function(key) {
				if (!_config[key]) {
					throw new Error(_.sprintf("Undefined module '%s'", key));
				}

				var self = this,
					deferred = $.Deferred(),
					path     = _config[key].path,
					key      = _config[key].key,
					options  = _config[key].options,
					regions  = _config[key].regions;

				require([path], function(moduleConstructor) {

					var module = new moduleConstructor(key, options);

					var promises = [];

					_.reduce(regions, function(regions, key, target) {
						var promise = self.get(key).done(function(module) {
							regions[target] = module;
						});

						promises.push(promise);
					});

					$.when(promises).done(function() {
						module.setRegions(regions);
						deferred.resolve(module);
					});

				});

				return deferred.promise();
			}
		};

		return ModuleManager;
	}
);