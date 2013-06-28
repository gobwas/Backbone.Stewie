define(
	[
		"app/classes/abstract/dm",
	],
	function (AbstractDependencyManager) {
		var ModuleManager = AbstractDependencyManager.extend({
			/**
			 * Имя экземпляра.
			 */
			name: "Module Manager",

			/**
			 * Возвращает сервис.
			 *
			 * @param key {String}
			 *
			 * @returns {$.Deferred.promise}
			 */
			get: function(key) {
				if (!this.getConfig(key)) {
					throw new Error(_.sprintf("Module with key '%s' is not present in configuration", key));
				}

				return this.build(key);
			}
		});

		return ModuleManager;
	}
);