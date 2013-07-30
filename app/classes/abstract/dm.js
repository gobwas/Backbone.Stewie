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
		var DependencyManager = function(options) {
			options || (options = {});

			/**
			 * Карта сервисов.
			 * @type {object}
			 */
			var _config;

			/**
			 * Параметры.
			 * @type {object}
			 */
			var _properties;

			/**
			 * Устанавливает конфигурацию сервисов.
			 *
			 * @param config {Object}
			 *
			 * @throws Error
			 */
			this.setConfig = function(config) {
				if (_config) {
					throw new Error(_.sprintf("%s is already have configuration", this.name));
				}

				_config = config;
			};

			/**
			 * Возвращает копию сервисов.
			 *
			 * @returns {*}
			 */
			this.getConfig = function(key) {
				if (!_.isEqual(this.config, _config)) {
					this.config = _.cloneDeep(_config);
				}

				return _.isString(key) ? this.config[key] : this.config;
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

			this.initialize(options);
		};

		DependencyManager.prototype = (function() {
			/**
			 * Шаблон ссылки на сервис.
			 *
			 * @type {RegExp}
			 * @private
			 * @static
			 */
			var PROPERTY_REGEX = /^%(.*)$/i;

			/**
			 * Шаблон ссылки на свойство.
			 *
			 * @type {RegExp}
			 * @private
			 * @static
			 */
			var	SERVICE_REGEX = /^@(.*)$/i;

			return {
				/**
				 * Ссылка на конструктор.
				 */
				constructor: DependencyManager,

				/**
				 * Имя экземпляра.
				 */
				name: "Dependency Manager Abstract",

				/**
				 * Инициализация.
				 *
				 * @param options
				 */
				initialize: function(options) {
					this.services = {};
				},

				/**
				 * Находит в конфигурации ссылки на сервисы и свойства.
				 *
				 * @param config {Object|Array}
				 */
				parse: function(config) {
					var self = this,
						promises = [],
						parsed = _.isArray(config) ? [] : {},
						deferred = $.Deferred();

					_.each(config, function(value, key) {
						var parsedValue = value;

						if (_.isString(value)) {
							if (value.match(PROPERTY_REGEX)) {
								parsedValue = self.getProperty(value.replace(PROPERTY_REGEX, '$1'));
							}

							if (value.match(SERVICE_REGEX)) {
								promises.push(parsedValue = self.get(value.replace(SERVICE_REGEX, '$1')));
							}
						} else if (_.isObject(value) || _.isArray(value)) {
							if (value.___escape___) {
								parsedValue = value.value;
							} else {
								promises.push(parsedValue = self.parse(value));
							}
						}

						$.when(parsedValue).done(function(value) {
							parsed[key] = value;
						});
					});

					$.when.apply($, promises).done(function() {
						deferred.resolve(parsed);
					});

					return deferred;
				},

				/**
				 * Собирает сервис.
				 *
				 * @param key {String}
				 *
				 * @returns {$.Deferred.promise}
				 */
				build: (function() {
					/**
					 * Инстанцирует объект.
					 * Передает массив переменной длины параметров в конструктор.
					 *
					 * @param constructor
					 * @param args
					 *
					 * @returns {object}
					 * @private
					 */
					var newInstanceArgs = function(constructor, args) {
						function Service(){}
						Service.prototype = constructor.prototype;

						var service = new Service();
						constructor.apply(service, args);

						return service;
					};

                    var makeCall = function(service, key, args) {
                        if (_.isFunction(service[key])) {
                            service[key].apply(service, args);
                        }
                    };


					return function(key) {
						var deferred = $.Deferred(),
							config   = this.getConfig(key),
							path     = config.path,
							deps     = config.deps || {arguments: [], calls: {}, properties: {}},

							args       = this.parse(deps.arguments),
							calls      = this.parse(deps.calls),
							properties = this.parse(deps.properties);

						require([path], function(constructor) {
							$.when(args, calls, properties).done(function(args, calls, properties) {
                                // Arguments
                                // ---------
								var service = newInstanceArgs(constructor, args);

                                // Calls
                                // -----
								_.each(calls, function(args, key) {
                                    if (_.isObject(args)) {
                                        _.each(args.suits, function(args) {
                                            makeCall(service, key, args);
                                        });
                                    } else {
                                        makeCall(service, key, args);
                                    }
								});

                                // Properties
                                // ----------
								_.each(properties, function(value, key) {
									service[key] = value;
								});

								deferred.resolve(service);
							});
						});

						return deferred.promise();
					}
				})(),

				/**
				 * Возвращает сервис.
				 *
				 * @param key {String}
				 *
				 * @returns {$.Deferred.promise}
				 */
				get: function(key) {
					if (!_.isString(key)) {
						throw new Error(_.sprintf("Necessary string parameter expected, '%s' given", typeof key));
					}

					if (!this.getConfig(key)) {
						throw new Error(_.sprintf("Service with key '%s' is not present in configuration", key));
					}

					if (this.services[key]) {
						return this.services[key];
					}

					return this.services[key] = this.build(key);
				}
			};
		})();

		DependencyManager.extend = Backbone.Model.extend;

		DependencyManager.escape = function(val) {
			return {
				___escape___: true,
				value: val
			};
		};

		return DependencyManager;
	}
);