define(
	[
		"app/classes/abstract/dispatcher",
		"app/classes/abstract/layout",
	],
	function (AbstractDispatcher, AbstractLayout) {
		var Module = function(id, options, regions) {

			// TODO assert (id);


			/**
			 * Ключ модуля.
			 *
			 * @type {string}
			 * @private
			 */
			var _id = id;

			/**
			 * Параметры модуля.
			 *
			 * @type {object}
			 * @private
			 */
			var _options = options || {};

			/**
			 * Вложенные модули.
			 *
			 * @type {object}
			 */
			this.regions = regions;

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

		Module.prototype = {
			constructor: Module,

			dispatcherClass: AbstractDispatcher,

			// TODO Возможно layout должен знать id модуля, к которому он принадлежит

			// TODO Регионы должны знать какие модули лежат внутри них

			render: function() {
				var self = this;

				if (!this.layout) {
					throw new Error("Module need to have the layout");
				}

				this.layout.render();

				_.each(this.regions, function(submodule, target) {
					var region = self.layout.createRegion(target);

					if (_.isArray(submodule)) {
						_.each(submodule, function(module) {
							var layout = module.getOption('render') ? module.render() : module.layout;

							region.insertView(layout);
						});
					} else {
						region.setView(submodule.layout);
					}
				});

				return this.layout;
			}
		};

		Module.extend = Backbone.Model.extend;

		return Module;
	}
);