define(
	[
		"app/classes/abstract/dispatcher",
	],
	function (AbstractDispatcher) {
		var Module = function(options) {

			// TODO assert (id);

			/**
			 * Параметры модуля.
			 *
			 * @type {object}
			 * @private
			 */
			var _options = options || {};

			/**
			 * Ключ модуля.
			 *
			 * @type {string}
			 * @private
			 */
			var _id = options.id;

			/**
			 * Вложенные модули.
			 *
			 * @type {object}
			 */
			this.regions = options.regions;

			/**
			 * Диспетчер модуля.
			 *
			 * @type {AbstractDispatcher}
			 */
			this.dispatcher = new this.dispatcherClass({module: this});

			/**
			 * Возвращает ключ модуля.
			 * @returns {string}
			 */
			this.getId = function() {
				return _id;
			};

			/**
			 *
			 * @returns {Mixed}
			 */
			this.getOptions = function() {
				return _.cloneDeep(_options);
			};

			/**
			 *
			 * @param key
			 * @returns {Mixed}
			 */
			this.getOption = function(key) {
				return _.cloneDeep(_options[key]);
			};

			this.initialize();
		};

		Module.prototype = (function() {

			var _addRegion = function() {

			};

			return {
				constructor: Module,

				dispatcherClass: AbstractDispatcher,

				// TODO Возможно layout должен знать id модуля, к которому он принадлежит

				// TODO Регионы должны знать какие модули лежат внутри них

				render: (function() {
					/**
					 *
					 * @param region
					 * @param module
					 * @param insert
					 */
					var addView = function(region, module, insert) {
						var layout = module.getOption('render') ? module.render().layout : module.layout;
						insert ? region.insertView(layout) : region.setView(layout);
					};

					return function() {
						var self = this;

						if (!this.layout) {
							throw new Error("Module need to have the layout");
						}

						this.layout.render();

						_.each(this.regions, function(submodule, target) {
							var region = self.layout.createRegion(target);

							if (_.isArray(submodule)) {
								_.each(submodule, function(module) {
									addView(region, module, true);
								});
							} else {
								addView(region, submodule, false);
							}
						});

						return this;
					}
				})(),

				getLayout: function() {
					return this.layout;
				}
			}
		})();

		Module.extend = Backbone.Model.extend;

		return Module;
	}
);