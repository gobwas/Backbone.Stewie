define(
	[
		"app/classes/abstract/dispatcher",
		"app/classes/abstract/layout",
	],
	function (AbstractDispatcher, AbstractLayout) {
		var Module = function(key, options) {
			/**
			 * Параметры модуля.
			 *
			 * @type {object}
			 */
			this.options = options || {};

			/**
			 * Ключ модуля.
			 *
			 * @type {string}
			 * @private
			 */
			var _key = key;

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
			this.getKey = function() {
				return _key;
			};

			this.initialize();
		};

		Module.prototype = {
			constructor: Module,

			dispatcherClass: AbstractDispatcher,

			initialize: function() {
				// if this constructed
				console.log("#STUB: abstract_module->initialize with key %s", this.getKey());
			},

			setRegions: function(regions) {
				this.regions = regions;
			},

			render: function() {
				if (!this.layout) {
					throw new Error("Module need to have layout");
				}

				_.each(this.regions, function(view, target) {
					this.layout.setView(target, view);
				});
			}
		};

		Module.extend = Backbone.Model.extend;

		return Module;
	}
);