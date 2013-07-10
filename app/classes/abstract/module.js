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


            // Инициализация
            // -------------

            /**
             * Диспетчер модуля.
             *
             * @type {AbstractDispatcher}
             */
            this.dispatcher = new this.dispatcherClass({module: this});

			this.initialize();
		};

		Module.prototype = (function() {
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
						var layout = module.getOption('render') ?
                            module.render().layout :
                            module.layout;

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
								_.each(submodule, function(submodule) {
									addView(region, submodule, true);
                                    self.dispatcher.register(submodule.dispatcher);
								});
							} else {
								addView(region, submodule, false);
                                self.dispatcher.register(submodule.dispatcher);
							}
						});

						return this;
					}
				})(),

				getLayout: function() {
					return this.layout;
                },

                /**
                 * @abstract
                 */
                initialize: function() {
                    // this.layout.on('all', this.dispatcher.bubble);
                    // this.model.on('all', this.dispatcher.bubble);
                    // this.collection.on('all', this.dispatcher.bubble);

                    // this.dispatcher.on.bubble('submodule:change');
                    // this.dispatcher.on.capture('range:change');
                }
			}
		})();

        _.extend(Module.prototype, Backbone.Events);

		Module.extend = Backbone.Model.extend;

		return Module;
	}
);