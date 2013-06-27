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
			 *
			 * @type {*}
			 */
			var self = this;

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

			var getModules = function(keys) {
				var modules = {},
					promises = [],
					deferred = $.Deferred();

				_.each(keys, function(key, index) {
					var promise;

					if (_.isArray(key)) {
						promise = getModules(key);
					} else {
						promise = self.get(key);
					}

					promises.push(promise.done(function(module) {
						modules[index] = module;
					}));
				});

				$.when(promises).done(function() {
					deferred.resolve(modules);
				});

				return deferred.promise();
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

				var deferred = $.Deferred(),
					path     = _config[key].path,
					id       = _config[key].id,
					options  = _config[key].options,
					regions  = _config[key].regions;

				require([path], function(moduleConstructor) {

					getModules(regions).done(function(regions) {
						var module = new moduleConstructor(id, options, regions);
						deferred.resolve(module);
					});

				});

				return deferred.promise();
			}
		};

		return ModuleManager;
	}
);