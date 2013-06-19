/**
 * Менеджер зависимостей.
 * @author Sergey Kamardin <s.kamardin@tcsbank.ru>
 */

define(
	[],
	function () {
		/**
		 * Менеджер зависимостей.
		 *
		 * @constructor
		 */
		var DependencyManager = function() {
			var _config,
				_properties,
				// Шаблон ссылки на свойство
				PROPERTY_REGEX = /^%(.*)$/i,
				// Шаблон ссылки на сервис
				SERVICE_REGEX = /^@(.*)$/i;

			/**
			 * Инстанцирует объект.
			 * Передает массив параметров в конструктор.
			 *
			 * @param constructor
			 * @param args
			 *
			 * @returns {Service}
			 */
			var newInstanceArgs = function(constructor, args) {
				var Service = function(){};
				Service.prototype = constructor.prototype;

				var service = new Service();
				constructor.apply(service, args);

				return service;
			};

			/**
			 * Находит в конфигурации ссылки на сервисы и свойства.
			 *
			 * @param config {Object|Array}
			 */
			var parse = _.bind(function(config) {
				var self = this;

				return _.reduce(config, function(parsed, value, key) {
					var parsedValue = value;

					if (_.isString(value)) {
						if (value.match(PROPERTY_REGEX)) {
							parsedValue = self.getProperty(value.replace(PROPERTY_REGEX, '$1'));
						}

						if (value.match(SERVICE_REGEX)) {
							parsedValue = self.get(value.replace(SERVICE_REGEX, '$1'));
						}
					} else if (_.isObject(value) || _.isArray(value)) {
						parsedValue = parse(value);
					}

					parsed[key] = parsedValue;

					return parsed;
				}, _.isArray(config) ? [] : {});
			}, this);

			/**
			 * Устанавливает конфигурацию сервисов.
			 *
			 * @param config {Object}
			 *
			 * @throws Error
			 */
			this.setConfig = function(config) {
				if (_config) {
					throw new Error("Dependency Manager is already have configuration");
				}

				_config = config;
			};

			/**
			 * Устанавливает свойства.
			 *
			 * @param properties {Object}
			 */
			this.setProperties = function(properties) {
				if (_properties) {
					throw new Error("Dependency Manager is already have properties");
				}

				_properties = properties;
			};

			/**
			 * Возвращает свойство.
			 *
			 * @param key {String}
			 *
			 * @returns {*}
			 */
			this.getProperty = function(key) {
				if (!_properties[key]) {
					throw new Error(_.sprintf("Undefined property '%s'", key));
				}

				return _properties[key];
			};

			/**
			 * Возвращает сервис.
			 *
			 * @param key {String}
			 *
			 * @returns {$.Deferred.promise}
			 */
			this.get = function(key) {
				if (!_config[key]) {
					throw new Error(_.sprintf("Service with key '%s' is not present in configuration", key));
				}

				var deferred = $.Deferred(),
					path    = _config[key].path,
					options = _config[key].options,
					deps    = _config[key].deps || {arguments: [], calls: {}, properties: {}};

				require([path], function(constructor) {
					var args = parse(deps.arguments),
						calls = parse(deps.calls),
						properties = parse(deps.properties);

					if (calls.init) {
						throw new Error("Word 'init' is reserved for internal usage in services");
					}
					if (options) {
						calls.init = [options];
					}

					var service = newInstanceArgs(constructor, args);

					_.each(calls, function(args, key) {
						if (typeof service[key] == 'function') {
							service[key].apply(service, args);
						}
					});

					_.each(properties, function(value, key) {
						service[key] = value;
					});

					deferred.resolve(service);
				});

				return deferred.promise();
			}
		};


		return new DependencyManager();
	}
);